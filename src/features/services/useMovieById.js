import { useEffect, useState } from 'react';

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';

const useMovieById = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/movie/${movieId}?api_key=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }

        const data = await response.json();
        setMovie(data);

        // Fetch trailer
        const trailerResponse = await fetch(
          `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
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

    if (movieId) {
      fetchMovie();
    }

    // Clean-up function
    return () => {
      // Cleanup code, if needed
    };
  }, [movieId]);

  return { movie, loading, error, trailerKey };
};

export default useMovieById;
