import { useEffect, useState } from 'react';

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';

const useTVShowById = (tvShowId) => {
  const [tvShow, setTVShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShow = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/tv/${tvShowId}?api_key=${API_KEY}&without_genres=99,10755&vote_count.gte=200`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show');
        }

        const data = await response.json();
        setTVShow(data);

        // Fetch trailer
        const trailerResponse = await fetch(
          `${API_URL}/tv/${tvShowId}/videos?api_key=${API_KEY}`,
        );
        if (!trailerResponse.ok) {
          throw new Error('Failed to fetch trailer');
        }

        const trailerData = await trailerResponse.json();
        if (trailerData.results.length > 0) {
          const trailerKey = trailerData.results[0].key;
          setTrailerKey(trailerKey);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (tvShowId) {
      fetchTVShow();
    }

    // Clean-up function
    return () => {
      // Cleanup code, if needed
    };
  }, [tvShowId]);

  return { tvShow, loading, error, trailerKey };
};

export default useTVShowById;
