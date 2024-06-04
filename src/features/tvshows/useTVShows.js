import { useEffect, useState } from 'react';
import { useCurrentPage } from '../../contexts/CurrentPageContext'; // Import useCurrentPage hook
import { useSortPreferences } from '../../contexts/SortPreferencesContext';

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';
const SHOWS_PER_PAGE = 30;

function useTVShows(searchQuery = '') {
  let sortBy = 'popularity.desc';
  //first_air_date.desc
  //first_air_date.asc
  //vote_average.desc

  const {
    isSortedByRating,
    isSortedByDateAscending,
    isSortedByDateDescending,

    selectedTVGenres,
    setSelectedTVGenres,
  } = useSortPreferences();

  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const { currentPage, setCurrentPage } = useCurrentPage();

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
    sortBy = 'first_air_date.asc';
  } else if (isSortedByDateDescending) {
    sortBy = 'first_air_date.desc';
  }

  console.log('sortBy', sortBy);
  console.log('selectedTVGenres', selectedTVGenres);

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);

      try {
        // Calculate the offset based on the current page and number of shows per page
        const offset = (currentPage - 1) * SHOWS_PER_PAGE;

        let url = `${API_URL}/discover/tv?api_key=${API_KEY}&page=${currentPage}&sort_by=${sortBy}&include_adult=false&vote_count.gte=200`;

        if (searchQuery) {
          url = `${API_URL}/search/tv?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}`;
        }
        // Check if selectedGenres array has genres
        if (selectedTVGenres.length > 0) {
          const genresQuery = selectedTVGenres.join(',');
          url += `&with_genres=${genresQuery}`;
        }
        console.log('Selected genres in API request', selectedTVGenres);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }

        const data = await response.json();
        const showsData = data.results;

        // Fetch trailers and reviews for each show
        const showsWithTrailersAndReviews = await Promise.all(
          showsData.map(async (show) => {
            const trailersResponse = await fetch(
              `${API_URL}/tv/${show.id}/videos?api_key=${API_KEY}`,
            );
            const reviewsResponse = await fetch(
              `${API_URL}/tv/${show.id}/reviews?api_key=${API_KEY}`,
            );

            if (!trailersResponse.ok || !reviewsResponse.ok) {
              throw new Error('Failed to fetch trailers or reviews');
            }

            const trailersData = await trailersResponse.json();
            const reviewsData = await reviewsResponse.json();

            return {
              ...show,
              trailers: trailersData.results,
              reviews: reviewsData.results,
            };
          }),
        );

        setShows(showsWithTrailersAndReviews);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [currentPage, searchQuery, sortBy, selectedTVGenres, setCurrentPage]); // Include sortBy in the dependencies array

  return {
    shows,
    isLoading,
    error,
    currentPage,
    totalPages,
    isSortedByRating,
    isSortedByDateAscending,
    isSortedByDateDescending,
    selectedTVGenres,
    setSelectedTVGenres,
  };
}

export function useTVShowsWithSearch(searchQuery) {
  return useTVShows(searchQuery);
}

export function useTVShowsWithoutSearch() {
  return useTVShows();
}

export default useTVShows;
