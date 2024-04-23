import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useRef, useState, useEffect } from 'react';

import useMovieById from '../services/useMovieById';

function PlayButtons({ iconClass, movieId }) {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const { toggleHeartState, heartStates } = useSelectedMovies();
  const { id } = useParams();
  const { movie, trailerKey } = useMovieById(id || movieId);
  const location = useLocation();
  const iframeRef = useRef(null);

  useEffect(() => {
    const closeIframeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setTrailerUrl(null);
      }
    };

    const closeIframeOnClickOutside = (event) => {
      if (
        iframeRef.current &&
        !iframeRef.current.contains(event.target) &&
        !event.target.closest('.watch-trailer-button')
      ) {
        setTrailerUrl(null);
      }
    };

    document.addEventListener('keydown', closeIframeOnEscape);
    document.addEventListener('click', closeIframeOnClickOutside);

    return () => {
      document.removeEventListener('keydown', closeIframeOnEscape);
      document.removeEventListener('click', closeIframeOnClickOutside);
    };
  }, []);

  const handleToggleHeartState = (movie) => {
    const isMovieInFavorites = heartStates[movie.id];
    toggleHeartState(movie);

    const toastMessage = isMovieInFavorites
      ? `${movie.title} removed from your list`
      : `${movie.title} added to your list`;

    if (isMovieInFavorites) {
      toast.error(toastMessage);
    } else {
      toast.success(toastMessage);
    }
  };

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailerKey}`);
    } else {
      toast.error('No Trailer for this movie.');
    }
  };

  return (
    <div className="float-end mt-2 flex justify-center font-truculenta text-white">
      <Toaster position="top-center" reverseOrder={false} width />
      <div className="block">
        <button
          className="watch-trailer-button flex rounded-full border-2 bg-white text-black hover:bg-gray-200"
          onClick={handleWatchTrailer}
        >
          <p className="my-auto w-fit justify-between py-1 pl-5 font-semibold">
            Watch Trailer
          </p>
          <Icon icon="mi:play" height="40" width="70" className="p-2 pl-0" />
        </button>

        {trailerUrl && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto my-auto flex h-full w-full items-center justify-center bg-black bg-opacity-80">
            <div ref={iframeRef}>
              <iframe
                title="Trailer"
                width="900 "
                height="507"
                src={trailerUrl}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      {/* {location.pathname !== '/' && ( */}
      <div className="block duration-700">
        {iconClass === 'tabler:circle-check-filled' ? (
          <button
            className="mx-3 flex  rounded-full border-2 border-gray-800 border-opacity-60 bg-gray-800 bg-opacity-60 text-nfRed"
            onClick={() => handleToggleHeartState(movie)}
          >
            <p className=" my-auto w-fit justify-between py-1 pl-4 font-semibold">
              On List
            </p>
            <Icon
              icon={iconClass}
              height="40"
              width="70"
              className="p-2 pl-0 text-nfRed"
            />
          </button>
        ) : (
          <button
            className="mx-3 flex rounded-full border-2 bg-white text-black hover:bg-gray-200"
            onClick={() => handleToggleHeartState(movie)}
          >
            <p className=" my-auto w-fit justify-between py-1 pl-4 font-semibold">
              Add to List
            </p>
            <Icon
              icon={iconClass}
              height="40"
              width="70"
              className="p-2 pl-0"
            />
          </button>
        )}
      </div>
      {/* )} */}
    </div>
  );
}

export default PlayButtons;
