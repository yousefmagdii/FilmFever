import { useParams } from 'react-router-dom';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import PlayButtons from '../home/PlayButtons';
import { Icon } from '@iconify/react';
import FilmReelSpinner from '../../ui/Spinner';
import useMovieById from '../services/useMovieById';
import LazyLoad from 'react-lazyload';
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
        <span className="my-auto h-fit w-fit  gap-28 rounded-md bg-[#141414] bg-opacity-30 px-8 py-3 max-[1025px]:my-0 max-lg:h-dvh xl:flex">
          <h1 className="hidden pb-5 text-center text-4xl font-extrabold  uppercase text-nfRed max-xl:block max-md:text-3xl">
            {title}
          </h1>
          <span className="relative my-auto ">
            {poster_path && (
              <LazyLoad height={400} offset={100}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="my-auto h-auto w-80 rounded-md shadow-2xl shadow-[rgba(255,255,255,.1)] max-xl:mx-auto
            max-[1025px]:w-40 max-md:w-36 max-sm:h-auto max-sm:w-36 md:h-fit"
                />
              </LazyLoad>
            )}
            <span
              className="absolute bottom-0  left-0 right-0 bg-white text-center font-madimi text-xl font-extrabold
             text-nfRed xl:bg-gray-600 xl:bg-opacity-40 xl:text-white"
            >
              {release_date.split('-')[0]}
            </span>
          </span>
          <div className="my-auto  block h-fit align-middle">
            <h1 className=" pb-5  text-6xl font-extrabold uppercase text-nfRed max-xl:hidden">
              {title}
            </h1>
            <p className="max-xl:mx-auto max-xl:text-center max-[1025px]:text-sm max-md:w-[18rem] max-sm:text-xs  md:w-[24rem] lg:w-[45rem] xl:text-xl ">
              {overview}
            </p>
            {movie.genres.length > 0 && (
              <div className="mt-4 max-xl:text-center">
                <p className="font-bold">Genres:</p>
                <ul className="flex max-xl:justify-center">
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
              <span className="flex w-full max-xl:justify-center">
                <span className=" font-bold  xl:float-start">
                  IMdb Rating: &#160;
                </span>
                <span className=" flex text-white  xl:float-start">
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
              <span className="flex w-full max-xl:justify-center">
                <span className="font-bold">Duration:&#160; </span>
                {runtime} minutes
              </span>
            )}
            <div className="mt-3 xl:float-left">
              <PlayButtons
                iconClass={
                  selectedMovies.find((movie) => movie.id == id)
                    ? 'tabler:circle-check-filled'
                    : 'heroicons-solid:plus'
                }
              />
            </div>
          </div>
          {/* <span className="relative my-auto ">
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
          </span> */}
        </span>
      </div>
    </>
  );
}

export default MovieInfo;
