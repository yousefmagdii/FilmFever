import { useEffect, useState } from 'react';

const KEY = '2058f3b8';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        let allMovies = [];
        const totalPages = 4; // You can adjust the number of pages to fetch here

        for (let page = 1; page <= totalPages; page++) {
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

          allMovies = [...allMovies, ...data.Search];
        }

        setMovies(allMovies);
        setError('');
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, []);

  return { movies, isLoading, error };
}

export default useMovies;
