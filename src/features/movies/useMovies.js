import { useEffect, useState } from 'react';
import { useCurrentPage } from '../../contexts/CurrentPageContext'; // Import useCurrentPage hook

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';
const MOVIES_PER_PAGE = 30;

function useMovies(searchQuery = '') {
  const { currentPage } = useCurrentPage(); // Use currentPage from context
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        // Calculate the offset based on the current page and number of movies per page
        const offset = (currentPage - 1) * MOVIES_PER_PAGE;

        let url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;

        if (searchQuery) {
          url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        const moviesData = data.results;

        // Fetch trailers and reviews for each movie
        const moviesWithTrailersAndReviews = await Promise.all(
          moviesData.map(async (movie) => {
            const trailersResponse = await fetch(
              `${API_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`,
            );
            const reviewsResponse = await fetch(
              `${API_URL}/movie/${movie.id}/reviews?api_key=${API_KEY}`,
            );

            if (!trailersResponse.ok || !reviewsResponse.ok) {
              throw new Error('Failed to fetch trailers or reviews');
            }

            const trailersData = await trailersResponse.json();
            const reviewsData = await reviewsResponse.json();

            return {
              ...movie,
              trailers: trailersData.results,
              reviews: reviewsData.results,
            };
          }),
        );

        setMovies(moviesWithTrailersAndReviews);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  return { movies, isLoading, error, currentPage, totalPages };
}

export function useMoviesWithSearch(searchQuery) {
  return useMovies(searchQuery);
}

export function useMoviesWithoutSearch() {
  return useMovies();
}
export default useMovies;
