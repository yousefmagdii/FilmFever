import { useParams } from 'react-router-dom';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import PlayButtons from '../home/PlayButtons';
import { Icon } from '@iconify/react';
import useMovies from '../movies/useMovies';
import { useEffect, useState } from 'react';
const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
function MovieInfo() {
  const { movies } = useMovies();
  // const { selectedMovies } = useSelectedMovies();

  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        setSelectedMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!selectedMovie) {
    return <div className="h-dvh text-white">Movie not found</div>;
  }

  // Extract name and image from the selected movie
  const {
    original_title,
    poster_path,
    overview,
    release_date,
    genre_ids,
    vote_average,
    backdrop_path,
  } = selectedMovie;
  // console.log(genre_ids);
  return (
    <>
      <div
        className="relative z-0 h-dvh 	"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
          backgroundSize: 'cover',
          filter: 'blur(10px)',
          backdropFilter: '',
        }}
      ></div>
      <div className="absolute left-0 right-0 top-0 mx-auto flex  h-dvh justify-center   align-middle font-truculenta text-white ">
        <span className="my-auto flex h-fit w-fit gap-28  rounded-md bg-gray-300 bg-opacity-25 px-8 py-3 ">
          <div className="my-auto  block h-fit align-middle">
            <h1 className=" pb-5  text-6xl font-extrabold uppercase text-nfRed">
              {original_title}
            </h1>
            <p className="w-96 text-xl">{overview}</p>
            <div className="mt-4">
              <p className="font-bold">Genres:</p>
              <ul className="flex">
                {genre_ids.map((genreId) => (
                  <li key={genreId} className="mr-2">
                    {genres.find((genre) => genre.id === genreId)?.name}
                  </li>
                ))}
              </ul>
            </div>
            <span className="float-start font-bold">IMdb Rating: </span>
            <span className=" float-start flex text-white">
              {' '}
              {vote_average.toFixed(1)}
              <Icon icon="noto:star" height="23" width="19" className="ml-1" />
            </span>
            <div className="float-left mt-8">
              <PlayButtons />
            </div>
          </div>
          <span className="relative my-auto ">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={original_title}
              className=" my-auto  h-fit w-80 rounded-md shadow-2xl shadow-[rgba(255,255,255,.1)] "
            />
            <span className="absolute bottom-0 left-0 right-0 bg-gray-600 bg-opacity-40 text-center font-madimi text-xl font-extrabold text-white">
              {release_date.split('-')[0]}
            </span>
          </span>
        </span>
      </div>
    </>
  );
}

export default MovieInfo;
