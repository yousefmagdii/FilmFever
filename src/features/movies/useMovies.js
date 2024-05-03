import { useEffect, useState } from 'react';
import { useCurrentPage } from '../../contexts/CurrentPageContext'; // Import useCurrentPage hook
import { useSortPreferences } from '../../contexts/SortPreferencesContext';

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';
const MOVIES_PER_PAGE = 30;
function useMovies(searchQuery = '') {
  let sortBy = 'popularity.desc';
  //release_date.desc
  //release_date.asc
  //vote_average.desc
  /*  const [isSortedByRating, setIsSortedByRating] = useState(false);
  const [isSortedByDateAscending, setIsSortedByDateAscending] = useState(false);
  const [isSortedByDateDescending, setIsSortedByDateDescending] =
    useState(false); */
  // const [isSortedByRating, setIsSortedByRating] = useState(
  //   localStorage.getItem('isSortedByRating') === 'true' || false,
  // );
  // const [isSortedByDateAscending, setIsSortedByDateAscending] = useState(
  //   localStorage.getItem('isSortedByDateAscending') === 'true' || false,
  // );
  // const [isSortedByDateDescending, setIsSortedByDateDescending] = useState(
  //   localStorage.getItem('isSortedByDateDescending') === 'true' || false,
  // );
  const {
    isSortedByRating,
    isSortedByDateAscending,
    isSortedByDateDescending,
    // setIsSortedByRating,
    // setIsSortedByDateAscending,
    // setIsSortedByDateDescending,
  } = useSortPreferences();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const { currentPage } = useCurrentPage();

  const saveSortingPreferences = () => {
    localStorage.setItem('isSortedByRating', isSortedByRating);
    localStorage.setItem('isSortedByDateAscending', isSortedByDateAscending);
    localStorage.setItem('isSortedByDateDescending', isSortedByDateDescending);
  };

  useEffect(() => {
    // Save sorting preferences when they change
    saveSortingPreferences();
  }, [isSortedByRating, isSortedByDateAscending, isSortedByDateDescending]);

  if (isSortedByRating) {
    sortBy = 'vote_average.desc';
  } else if (isSortedByDateAscending) {
    sortBy = 'release_date.asc';
  } else if (isSortedByDateDescending) {
    sortBy = 'release_date.desc';
  }

  console.log('sortBy', sortBy);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        // Calculate the offset based on the current page and number of movies per page
        const offset = (currentPage - 1) * MOVIES_PER_PAGE;

        let url = `${API_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=${sortBy}&include_adult=false&without_genres=99,10755&vote_count.gte=200`;

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
  }, [currentPage, searchQuery, sortBy]); // Include sortBy in the dependencies array

  return {
    movies,
    isLoading,
    error,
    currentPage,
    totalPages,
    isSortedByRating,
    // setIsSortedByRating,
    isSortedByDateAscending,
    // setIsSortedByDateAscending,
    isSortedByDateDescending,
    // setIsSortedByDateDescending,
  };
}

export function useMoviesWithSearch(searchQuery) {
  return useMovies(searchQuery);
}

export function useMoviesWithoutSearch() {
  return useMovies();
}
export default useMovies;
