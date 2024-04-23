import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { Link } from 'react-router-dom';
import useMovies from '../movies/useMovies';
import FilmReelSpinner from '../../ui/Spinner';

function List() {
  const { movies, isLoading } = useMovies();
  const { selectedMovies, removeMovie } = useSelectedMovies();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const iframeRef = useRef(null);

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

  const handleWatchTrailer = (trailer) => {
    setSelectedTrailer(trailer);
  };

  if (selectedMovies.length === 0) {
    return (
      <div className="flex h-dvh justify-center">
        <div className="my-auto    align-middle font-truculenta ">
          <p className="my-auto text-center text-5xl font-bold text-nfRed">
            <br />
            No movies selected yet 😞
          </p>
          <p className=" text-center text-white">
            Go back to{' '}
            <Link to="/movies" className="text-nfRed">
              Movies
            </Link>{' '}
            Page
          </p>
        </div>
      </div>
    );
  }
  if (isLoading) return <FilmReelSpinner />;
  return (
    <div>
      <ul className="mt-2 grid h-dvh grid-cols-6 justify-center gap-4  font-truculenta text-lg font-bold">
        {selectedMovies.map((movie, index) => (
          <span
            key={`${movie.id}_${index}`}
            className="group/listitem mx-auto mb-4  h-fit hover:relative"
          >
            <Link
              to={{
                pathname: `/movieinfo/${movie.id}`, // Pass movie ID as part of the URL
                state: { movieId: movie.id }, // Pass movie ID in state as well (optional)
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-60 w-52 rounded-xl object-cover  grayscale   duration-700 group-hover/listitem:h-[23rem] group-hover/listitem:grayscale-0 "
              />
            </Link>
            <div className="  group-hover/listitem::bg-white">
              <p
                className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20
                      from-[#121212ac] from-10%
                  via-[#7c7c7c6e]  via-40%
                  to-[#00000000] 
                  to-100% pb-3
                      text-center text-nfRed  group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:bg-gradient-to-t  group-hover/listitem:pt-8 group-hover/listitem:text-sm group-hover/listitem:text-white "
              >
                {movie.title}
              </p>
              <p className=" mt-2 hidden whitespace-nowrap text-center text-sm text-white  group-hover/listitem:absolute group-hover/listitem:bottom-9 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:block ">
                {movie.release_date.split('-')[0]}
              </p>
            </div>
            <button
              className="font-sm group/trailer hidden cursor-pointer  justify-center bg-gray-800  bg-opacity-60 py-2 text-white  group-hover/listitem:absolute group-hover/listitem:bottom-[50%]  group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:flex"
              onClick={() =>
                handleWatchTrailer(movie.trailers[1] || movie.trailers[0])
              }
              // Assuming the first trailer is the one to be played
            >
              <Icon
                icon="mdi:play"
                height="30"
                width="30"
                className=" inline rounded-full border-2 border-white bg-black bg-opacity-50"
              />
              <span className="ml-2   align-middle transition-opacity duration-700  group-hover/trailer:inline">
                Watch Trailer
              </span>
            </button>
            <button
              className=" mt-2 hidden text-center text-white group-hover/listitem:absolute 
              group-hover/listitem:right-4  group-hover/listitem:top-2 group-hover/listitem:block "
              onClick={() => handleRemoveMovie(movie)}
            >
              <Icon
                icon="mdi:close"
                height="18"
                width="18"
                className="  z-40 inline  rounded-full bg-black bg-opacity-50 hover:text-nfRed"
              />
            </button>
          </span>
        ))}
      </ul>
      {selectedTrailer && (
        <div className=" fixed bottom-0 left-0 right-0 top-0 mx-auto my-auto flex h-full w-full items-center justify-center bg-black bg-opacity-80">
          <div ref={iframeRef}>
            <iframe
              title="trailer"
              width="900 "
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
