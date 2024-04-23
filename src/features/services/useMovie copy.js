// import { useEffect, useState } from 'react';

// const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
// const API_URL = 'https://api.themoviedb.org/3';

// async function useMovie(id) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState('');
//   const [error, setError] = useState('');
//   console.log('id0000', id);
//   useEffect(() => {
//     console.log('000000');
//     const fetchMovie = async () => {
//       setIsLoading(true);

//       try {
//         let url = `${API_URL}/movie/${id}?${API_KEY}`;

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error('Failed to fetch movie');
//         }

//         const data = await response.json();
//         const movieData = data.results;
//         //console.log('datasss', data);
//         console.log('mmmm');
//         setMovie(movieData);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//         console.log('101010');
//       }
//     };
//     console.log('541515');
//     fetchMovie();
//   }, [id]);

//   return { movie, isLoading, error };
// }

// export default useMovie;
