import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useLocation, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useRef, useState, useEffect } from 'react';

import useMovieById from '../services/useMovieById';
import { useSelectedTVShows } from '../../contexts/SelectedTVShowsContext';
import useTVShowById from '../services/useTVShowById';

function PlayButtons({ iconClass, movieId, tvShowId, mediaType }) {
  const [trailerUrl, setTrailerUrl] = useState(null);

  const {
    toggleHeartState: toggleMovieHeartState,
    heartStates: movieHeartStates,
  } = useSelectedMovies();

  const {
    toggleHeartState: toggleTVShowHeartState,
    heartStates: tvShowHeartStates,
  } = useSelectedTVShows();

  const { id } = useParams();
  const location = useLocation();
  const iframeRef = useRef(null);

  const isTVShow = location.pathname.includes('tv') || mediaType === 'show';
  const contentId = id || (isTVShow ? tvShowId : movieId);

  const { movie, trailerKey: movieTrailerKey } = useMovieById(
    !isTVShow ? contentId : null,
  );
  const { tvShow, trailerKey: tvShowTrailerKey } = useTVShowById(
    isTVShow ? contentId : null,
  );

  const content = isTVShow ? tvShow : movie;
  const trailerKey = isTVShow ? tvShowTrailerKey : movieTrailerKey;
  const toggleHeartState = isTVShow
    ? toggleTVShowHeartState
    : toggleMovieHeartState;
  const heartStates = isTVShow ? tvShowHeartStates : movieHeartStates;

  // useEffect(() => {
  //   console.log('TV Show:', tvShow);
  //   console.log('Movie:', movie);
  //   console.log('Content:', content);
  // }, [tvShow, movie, content]);

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

  const handleToggleHeartState = () => {
    if (content) {
      const isContentInFavorites = heartStates[content.id];
      toggleHeartState(content);

      const toastMessage = isContentInFavorites
        ? `${content.name || content.title} removed from your list`
        : `${content.name || content.title} added to your list`;

      if (isContentInFavorites) {
        toast.error(toastMessage);
      } else {
        toast.success(toastMessage);
      }
    }
  };

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailerKey}`);
    } else {
      toast.error('No Trailer for this content.');
    }
  };

  return (
    <div className="mt-2 flex justify-center font-truculenta text-white xl:float-end">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="block">
        <button
          className="watch-trailer-button flex rounded-full border-2 bg-white text-black hover:bg-gray-200"
          onClick={handleWatchTrailer}
        >
          <p className="my-auto w-fit justify-between py-1 pl-5 font-semibold max-md:text-xs">
            Watch Trailer
          </p>
          <Icon icon="mi:play" height="40" width="70" className="p-2 pl-0" />
        </button>

        {trailerUrl && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto my-auto flex h-full w-full items-center justify-center bg-black bg-opacity-80">
            <div ref={iframeRef}>
              <iframe
                title="Trailer"
                width="900"
                height="507"
                src={trailerUrl}
                frameBorder="0"
                allowFullScreen
                className="max-[768px]:h-72 max-[768px]:w-[22rem]"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="block duration-700">
        {heartStates[content?.id] ? (
          <button
            className="mx-3 flex rounded-full border-2 border-gray-800  border-opacity-60 bg-gray-800 bg-opacity-60 text-nfRed max-md:text-xs"
            onClick={handleToggleHeartState}
          >
            <p className="my-auto w-fit justify-between py-1 pl-4 font-semibold">
              On List
            </p>
            <Icon
              icon="tabler:circle-check-filled"
              height="40"
              width="70"
              className="p-2 pl-0 text-nfRed"
            />
          </button>
        ) : (
          <button
            className="mx-3 flex rounded-full border-2 bg-white  text-black hover:bg-gray-200 max-md:text-xs"
            onClick={handleToggleHeartState}
          >
            <p className="my-auto w-fit justify-between py-1 pl-4 font-semibold">
              Add to List
            </p>
            <Icon
              icon="heroicons-solid:plus"
              height="40"
              width="70"
              className="p-2 pl-0"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default PlayButtons;
