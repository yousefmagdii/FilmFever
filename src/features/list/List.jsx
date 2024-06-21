import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useSelectedTVShows } from '../../contexts/SelectedTVShowsContext';
import { Link } from 'react-router-dom';
import useMovies from '../movies/useMovies';
import FilmReelSpinner from '../../ui/Spinner';
import useMovieById from '../services/useMovieById';
import LazyLoad from 'react-lazyload';

function List() {
  const { movies, isLoading } = useMovies();
  const { selectedMovies, removeMovie } = useSelectedMovies();
  const { selectedTVShows, removeShow } = useSelectedTVShows();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [numOfContentPerRaw, setNumOfContentPerRaw] = useState(3);

  useEffect(() => {
    const updateNumImages = () => {
      if (window.innerWidth < 640) {
        setNumOfContentPerRaw(1 * 2);
      } else if (window.innerWidth < 768) {
        setNumOfContentPerRaw(2 * 2);
      } else if (window.innerWidth < 1024) {
        setNumOfContentPerRaw(4 * 2);
      } else if (window.innerWidth < 1280) {
        setNumOfContentPerRaw(5 * 2);
      } else {
        setNumOfContentPerRaw(6 * 2); // Default to 3 for larger screens
      }
    };

    window.addEventListener('resize', updateNumImages);
    updateNumImages(); // Initial check

    return () => window.removeEventListener('resize', updateNumImages);
  }, []);
  const iframeRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(() => {
    // Initially set to 'movies' if not set in localStorage or the value is invalid, otherwise get the value from localStorage
    const storedPage = localStorage.getItem('currentPage');
    return storedPage === 'movies' || storedPage === 'tvShows'
      ? storedPage
      : 'movies';
  });

  useEffect(() => {
    const handleClickOutsideAndEscape = (event) => {
      if (
        selectedTrailer &&
        (event.key === 'Escape' ||
          (iframeRef.current && !iframeRef.current.contains(event.target)))
      ) {
        setSelectedTrailer(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideAndEscape);
    document.addEventListener('keydown', handleClickOutsideAndEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideAndEscape);
      document.removeEventListener('keydown', handleClickOutsideAndEscape);
    };
  }, [selectedTrailer]);

  const handleRemoveMovie = (movie) => {
    removeMovie(movie);
  };

  const handleRemoveShow = (show) => {
    removeShow(show);
  };

  const handleWatchTrailer = (trailer) => {
    setSelectedTrailer(trailer);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  if (isLoading) return <FilmReelSpinner />;
  return (
    <div className="">
      <div className="mx-auto mb-12 mt-8 flex w-fit justify-center  bg-[#141414]  bg-opacity-35">
        <button
          onClick={() => handlePageChange('movies')}
          className={`  px-4 py-2 text-xs font-bold ${
            currentPage === 'movies'
              ? ' scale-110 bg-nfRed text-white shadow-custom-shadow-right duration-700'
              : '   bg-gray-200 text-nfRed duration-200'
          }
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => handlePageChange('tvShows')}
          className={`  px-4 py-2 text-xs  font-bold ${
            currentPage === 'tvShows'
              ? ' scale-110 bg-nfRed text-white shadow-custom-shadow-left  duration-700'
              : '   bg-gray-200 text-nfRed duration-200'
          }`}
        >
          TV Shows
        </button>
      </div>

      {currentPage === 'movies' ? (
        // Content for Movies page
        selectedMovies.length === 0 ? (
          <div className="mt-2 h-dvh overflow-hidden p-56 text-center font-truculenta text-3xl text-white">
            There is no selected Movies in your list {''} go to{' '}
            <Link
              to={'/movies'}
              className="my-auto text-sm uppercase text-nfRed duration-300 hover:text-3xl hover:underline"
            >
              Movies
            </Link>{' '}
          </div>
        ) : (
          // grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          <ul
            className={`mt-2 grid grid-cols-1 justify-center gap-4 bg-[#141414] font-truculenta text-lg font-bold sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${selectedMovies.length > numOfContentPerRaw ? '!h-full' : '!h-dvh'}`}
          >
            {selectedMovies.map((movie, index) => (
              <span
                key={`${movie.id}_${index}`}
                className="group/listitem mx-auto mb-4 h-fit duration-700 hover:relative xl:hover:scale-110"
              >
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { movieId: movie.id },
                  }}
                >
                  <LazyLoad height={400} offset={100}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      }
                      alt={movie.title}
                      className="h-72 w-52 rounded-xl object-cover  duration-700 group-hover/listitem:shadow-custom-shadow group-hover/listitem:grayscale-0"
                    />
                  </LazyLoad>
                </Link>
                <div className="group-hover/listitem:bg-white">
                  <p className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20 from-[#030303e7] from-10% via-[#000000af] via-40% to-[#1b1a1a34] to-100% pb-3 text-center text-nfRed group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:bg-gradient-to-t group-hover/listitem:pt-8 group-hover/listitem:text-sm group-hover/listitem:text-white">
                    {movie.title}
                  </p>
                  <p className="mt-2 hidden whitespace-nowrap text-center text-sm text-white group-hover/listitem:absolute group-hover/listitem:bottom-9 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:block">
                    {movie.release_date.split('-')[0]}
                  </p>
                </div>
                <button
                  className="font-sm group/trailer hidden cursor-pointer justify-center bg-gray-800 bg-opacity-60 py-2 text-white group-hover/listitem:absolute group-hover/listitem:bottom-[50%] group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:flex"
                  onClick={() =>
                    handleWatchTrailer(movie.trailers[1] || movie.trailers[0])
                  }
                >
                  <Icon
                    icon="mdi:play"
                    height="30"
                    width="30"
                    className="inline rounded-full border-2 border-white bg-black bg-opacity-50"
                  />
                  <span className="ml-2 align-middle transition-opacity duration-700 group-hover/trailer:inline">
                    Watch Trailer
                  </span>
                </button>
                <button
                  className="mt-2 hidden text-center text-white group-hover/listitem:absolute group-hover/listitem:right-4 group-hover/listitem:top-2 group-hover/listitem:block"
                  onClick={() => handleRemoveMovie(movie)}
                >
                  <Icon
                    icon="mdi:close"
                    height="18"
                    width="18"
                    className="z-40 inline rounded-full bg-black bg-opacity-50 hover:text-nfRed"
                  />
                </button>
              </span>
            ))}
          </ul>
        )
      ) : // Content for TV Shows page
      selectedTVShows.length === 0 ? (
        <div className="mt-2 h-dvh overflow-hidden p-56 text-center font-truculenta text-3xl text-white">
          There is no selected TV Shows in your list go to{' '}
          <Link
            to={'/tvshows'}
            className="my-auto text-sm uppercase text-nfRed duration-300 hover:text-3xl hover:underline"
          >
            TV Shows
          </Link>
        </div>
      ) : (
        <ul
          className={`mt-2 grid grid-cols-1 justify-center gap-4 bg-[#141414] font-truculenta text-lg font-bold sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  ${selectedTVShows.length > numOfContentPerRaw ? '!h-full' : '!h-dvh'}`}
        >
          {selectedTVShows.map((show, index) => (
            <span
              key={`${show.id}_${index}`}
              className="group/listitem mx-auto mb-4 h-fit duration-700 hover:relative hover:scale-110"
            >
              <Link
                to={{
                  pathname: `/tvshows/${show.id}`,
                  state: { showId: show.id },
                }}
              >
                <LazyLoad height={400} offset={100}>
                  <img
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                        : 'https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                    alt={show.name}
                    className="h-72 w-52 rounded-xl object-cover  duration-700 group-hover/listitem:shadow-custom-shadow group-hover/listitem:grayscale-0"
                  />
                </LazyLoad>
              </Link>
              <div className="group-hover/listitem:bg-white">
                <p
                  className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20 from-[#030303e7] from-10% via-[#000000af] via-40% to-[#1b1a1a34] 
                to-100% pb-3 text-center text-nfRed group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0
                 group-hover/listitem:right-0 group-hover/listitem:bg-gradient-to-t group-hover/listitem:pt-8 group-hover/listitem:text-sm
                  group-hover/listitem:text-white"
                >
                  {show.name}
                </p>
                <p className="mt-2 hidden whitespace-nowrap text-center text-sm text-white group-hover/listitem:absolute group-hover/listitem:bottom-9 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:block">
                  {show.first_air_date.split('-')[0]}
                </p>
              </div>
              <button
                className="font-sm group/trailer hidden cursor-pointer justify-center bg-gray-800 bg-opacity-60 py-2 text-white group-hover/listitem:absolute group-hover/listitem:bottom-[50%] group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:flex"
                onClick={() =>
                  handleWatchTrailer(show.trailers[1] || show.trailers[0])
                }
              >
                <Icon
                  icon="mdi:play"
                  height="30"
                  width="30"
                  className="inline rounded-full border-2 border-white bg-black bg-opacity-50"
                />
                <span className="ml-2 align-middle transition-opacity duration-700 group-hover/trailer:inline">
                  Watch Trailer
                </span>
              </button>
              <button
                className="mt-2 hidden text-center text-white group-hover/listitem:absolute group-hover/listitem:right-4 group-hover/listitem:top-2 group-hover/listitem:block"
                onClick={() => handleRemoveShow(show)}
              >
                <Icon
                  icon="mdi:close"
                  height="18"
                  width="18"
                  className="z-40 inline rounded-full bg-black bg-opacity-50 hover:text-nfRed"
                />
              </button>
            </span>
          ))}
        </ul>
      )}

      {selectedTrailer && (
        <div className="fixed bottom-0 left-0 right-0 top-0 mx-auto my-auto flex h-full w-full items-center justify-center bg-black bg-opacity-80">
          <div ref={iframeRef}>
            <iframe
              title="trailer"
              width="900"
              height="507"
              src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
              frameBorder="0"
              allowFullScreen
              className="relative"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
