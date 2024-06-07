import { useParams } from 'react-router-dom';
import { useSelectedShows } from '../../contexts/SelectedShowsContext';
import { Icon } from '@iconify/react';
import useTVShowById from '../services/useTVShowById';
import { useEffect } from 'react';
import FilmReelSpinner from '../../ui/Spinner';
import PlayButtons from '../home/PlayButtons';

function TVShowInfo() {
  const { id } = useParams();
  const { selectedShows } = useSelectedShows();

  const { tvShow, loading, error } = useTVShowById(id);
  useEffect(() => {}, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !tvShow) {
    return <FilmReelSpinner />;
  }

  const {
    poster_path,
    overview,
    first_air_date,
    genres,
    vote_average,
    backdrop_path,
    name,
    last_air_date,
    status,
    episode_run_time,
    seasons,
  } = tvShow;
  // console.log(tvShow);
  return (
    <>
      <div
        className="relative z-0 h-dvh overflow-hidden"
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
              {name}
            </h1>
            <p className="w-[43rem] text-xl">{overview}</p>
            {genres.length > 0 && (
              <div className="mt-4">
                <p className="font-bold">Genres:</p>
                <ul className="flex">
                  {genres.map((genre, index) => (
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
            )}
            {episode_run_time > 0 && (
              <span className="flex w-full">
                <span className="font-bold">Episode duration:&#160; </span>
                {episode_run_time} minutes
              </span>
            )}
            {seasons.length > 0 && (
              <span className="flex w-full">
                <span className="font-bold uppercase">
                  {seasons.length} {seasons.length === 1 ? 'season' : 'seasons'}{' '}
                </span>
              </span>
            )}
            <div className="float-left mt-3">
              <PlayButtons
                iconClass={
                  selectedShows.find((tvshow) => tvshow.id == id)
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
                alt={name}
                className=" my-auto  h-fit w-80 rounded-md shadow-2xl shadow-[rgba(255,255,255,.1)] "
              />
            )}
            <span className="absolute bottom-0 left-0 right-0 bg-gray-600 bg-opacity-40 text-center font-madimi text-xl font-extrabold text-white">
              {first_air_date.split('-')[0]}
              {status !== 'Ended' && ' - '}
              {status === 'Ended' &&
                first_air_date.split('-')[0] !== last_air_date.split('-')[0] &&
                -last_air_date.split('-')[0]}
            </span>
          </span>
        </span>
      </div>
    </>
  );
}

export default TVShowInfo;
