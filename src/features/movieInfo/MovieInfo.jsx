import { useParams } from 'react-router-dom';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import PlayButtons from '../home/PlayButtons';
import { Icon } from '@iconify/react';
import FilmReelSpinner from '../../ui/Spinner';
import useMovieById from '../services/useMovieById';
const API_KEY = '5bd0066ae9f9e2c1b2f8e7442247c890';

function MovieInfo() {
  const { id } = useParams();

  const { selectedMovies } = useSelectedMovies();

  const { movie, loading, error } = useMovieById(id);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (movie === undefined) {
    return <span className="text-white">wa1</span>; // Render nothing if movie is not available yet
  }
  if (loading) return <FilmReelSpinner />;
  // Extract name and image from the  movie
  const {
    poster_path,
    overview,
    release_date,

    vote_average,
    backdrop_path,
    title,
    runtime,
  } = movie;

  return (
    <>
      <div
        className="relative z-0 h-dvh 	 overflow-hidden"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${backdrop_path}')`,
          backgroundSize: 'cover',
          filter: 'blur(10px)',
          backdropFilter: '',
        }}
      ></div>
      <div className="absolute left-0 right-0 top-0 mx-auto flex h-dvh  w-[96%] justify-center   align-middle font-truculenta text-white ">
        <span className="my-auto flex h-fit w-fit gap-28  rounded-md bg-[#141414] bg-opacity-30 px-8 py-3 ">
          <div className="my-auto  block h-fit align-middle">
            <h1 className=" pb-5  text-6xl font-extrabold uppercase text-nfRed">
              {title}
            </h1>
            <p className="w-[43rem] text-xl">{overview}</p>
            {movie.genres.length > 0 && (
              <div className="mt-4">
                <p className="font-bold">Genres:</p>
                <ul className="flex">
                  {movie.genres.map((genre, index) => (
                    <li
                      key={`${genre.Id}-${index}`}
                      className="mr-2 rounded-md bg-black bg-opacity-30 px-1"
                    >
                      {genre?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {vote_average > 0 && (
              <span className="flex w-full">
                <span className="float-start font-bold">
                  IMdb Rating: &#160;
                </span>
                <span className=" float-start flex  text-white">
                  {vote_average.toFixed(1)}
                  <Icon
                    icon="noto:star"
                    height="23"
                    width="19"
                    className="ml-1"
                  />
                </span>
              </span>
            )}{' '}
            {runtime > 0 && (
              <span className="flex w-full">
                <span className="font-bold">Duration:&#160; </span>
                {runtime} minutes
              </span>
            )}
            <div className="float-left mt-3">
              <PlayButtons
                iconClass={
                  selectedMovies.find((movie) => movie.id == id)
                    ? 'tabler:circle-check-filled'
                    : 'heroicons-solid:plus'
                }
              />
            </div>
          </div>
          <span className="relative my-auto ">
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className=" my-auto  h-fit w-80 rounded-md shadow-2xl shadow-[rgba(255,255,255,.1)] "
              />
            )}
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
