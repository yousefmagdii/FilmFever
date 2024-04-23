import { useEffect, useState } from 'react';

const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const API_URL = 'https://api.themoviedb.org/3';

async function useMovie(id) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);

      try {
        let url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
        console.log('Fetching movie from:', url); // Log API URL
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }

        const data = await response.json();
        console.log('Fetched movie data:', data); // Log fetched data
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, isLoading, error };
}

export default useMovie;
