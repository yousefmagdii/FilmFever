// useMovies.js

import { useEffect, useState } from 'react';

const KEY = '2058f3b8';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies(page) {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=movie&page=${page}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Movies not found');
        }

        setMovies(data.Search);
        setError('');
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchMovies(currentPage); // Fetch movies for the current page

    return () => {
      controller.abort();
    };
  }, [currentPage]); // Fetch movies whenever currentPage changes

  return { movies, isLoading, error, currentPage, setCurrentPage };
}

export default useMovies;
