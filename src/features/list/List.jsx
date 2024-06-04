import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useSelectedTVShows } from '../../contexts/SelectedTVShowsContext';
import { Link } from 'react-router-dom';
import useMovies from '../movies/useMovies';
import FilmReelSpinner from '../../ui/Spinner';
import useMovieById from '../services/useMovieById';

function List() {
  const { movies, isLoading } = useMovies();
  const { selectedMovies, removeMovie } = useSelectedMovies();
  const { selectedTVShows, removeShow } = useSelectedTVShows();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
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
      <div className="mx-auto my-4 flex w-fit justify-center bg-white bg-opacity-35  ">
        <button
          onClick={() => handlePageChange('movies')}
          className={` px-4 py-2 text-xs font-bold ${
            currentPage === 'movies'
              ? ' scale-110 bg-nfRed text-white  duration-300'
              : '  bg-gray-200 text-nfRed'
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => handlePageChange('tvShows')}
          className={` px-4 py-2 text-xs font-bold   ${
            currentPage === 'tvShows'
              ? '  scale-110 bg-nfRed text-white shadow-2xl duration-300'
              : '  bg-gray-200 text-nfRed'
          }`}
        >
          TV Shows
        </button>
      </div>
      {/* Content for the selected page */}
      {currentPage === 'movies' ? (
        // Content for Movies page
        <ul className="mt-2 grid !h-dvh grid-cols-6 justify-center gap-4 font-truculenta text-lg font-bold">
          {selectedMovies.map((movie, index) => (
            <span
              key={`${movie.id}_${index}`}
              className="group/listitem mx-auto mb-4 h-fit hover:relative"
            >
              <Link
                to={{
                  pathname: `/movies/${movie.id}`, // Pass movie ID as part of the URL
                  state: { movieId: movie.id }, // Pass movie ID in state as well (optional)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-40 w-52 rounded-xl object-cover  duration-700
                   group-hover/listitem:h-[17.5rem] group-hover/listitem:grayscale-0"
                />
              </Link>
              <div className="group-hover/listitem::bg-white">
                <p
                  className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20
                      from-[#030303e7] from-10%
                  via-[#000000af] via-40%
                  to-[#1b1a1a34] 
                  to-100% pb-3
                      text-center text-nfRed group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:bg-gradient-to-t group-hover/listitem:pt-8 group-hover/listitem:text-sm group-hover/listitem:text-white"
                >
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
                className="mt-2 hidden text-center text-white group-hover/listitem:absolute 
              group-hover/listitem:right-4 group-hover/listitem:top-2 group-hover/listitem:block"
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
      ) : (
        // Content for TV Shows page
        <ul className="mt-2 grid h-dvh grid-cols-6 justify-center gap-4 font-truculenta text-lg font-bold">
          {selectedTVShows.map((show, index) => (
            <span
              key={`${show.id}_${index}`}
              className="group/listitem mx-auto mb-4 h-fit hover:relative"
            >
              <Link
                to={{
                  pathname: `/tvshows/${show.id}`, // Pass show ID as part of the URL
                  state: { showId: show.id }, // Pass show ID in state as well (optional)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="h-40 w-52 rounded-xl object-cover  duration-700 group-hover/listitem:h-[17.5rem] group-hover/listitem:grayscale-0"
                />
              </Link>
              <div className="group-hover/listitem::bg-white">
                <p
                  className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20
                      from-[#030303e7] from-10%
                  via-[#000000af] via-40%
                  to-[#1b1a1a34] 
                  to-100% pb-3
                      text-center text-nfRed group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:bg-gradient-to-t group-hover/listitem:pt-8 group-hover/listitem:text-sm group-hover/listitem:text-white"
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
                className="mt-2 hidden text-center text-white group-hover/listitem:absolute 
              group-hover/listitem:right-4 group-hover/listitem:top-2 group-hover/listitem:block"
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
