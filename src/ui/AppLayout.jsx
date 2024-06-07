import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedImage } from '../features/home/homeSlice';
import useMovies from '../features/movies/useMovies';
import useTVShows from '../features/tvshows/useTVShows'; // Add this import
import { useEffect, useState } from 'react';
import FilmReelSpinner from './Spinner';

function AppLayout() {
  const { movies, isLoading: isLoadingMovies } = useMovies();
  const { shows, isLoading: isLoadingTVShows } = useTVShows(); // Add this hook

  const location = useLocation();
  const selectedImageIndex = useSelector(
    (store) => store.home.selectedImageIndex,
  );
  const dispatch = useDispatch();

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (isLoadingMovies || isLoadingTVShows) return; // If data is still loading, return early

    // Combine movies and TV shows alternately
    const combinedItems = [];
    const maxLength = Math.max(movies.length, shows.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < shows.length)
        combinedItems.push({ type: 'show', data: shows[i] });
      if (i < movies.length)
        combinedItems.push({ type: 'movie', data: movies[i] });
    }

    setAllItems(combinedItems);
  }, [isLoadingMovies, isLoadingTVShows, movies, shows]);

  useEffect(() => {
    if (isLoadingMovies || isLoadingTVShows || !allItems.length) return; // If data is still loading or combinedItems is not ready, return early
    if (!allItems[selectedImageIndex]) {
      dispatch(updateSelectedImage(0)); // Dispatch action to update selectedImageIndex to 0 or any valid index
    }
  }, [
    isLoadingMovies,
    isLoadingTVShows,
    allItems,
    selectedImageIndex,
    dispatch,
  ]); // Add dispatch to the dependency array

  if (isLoadingMovies || isLoadingTVShows || !allItems.length)
    return <FilmReelSpinner />;

  const selectedItem = allItems[selectedImageIndex];
  const backgroundImageUrl =
    location.pathname === '/' &&
    selectedItem &&
    selectedItem.data.backdrop_path &&
    `url('https://image.tmdb.org/t/p/original${selectedItem.data.backdrop_path}')`;

  return (
    <>
      <div
        className={`bg-image ${
          location.pathname === '/movies' ||
          location.pathname === '/tvshows' ||
          location.pathname === '/list'
            ? '!h-full w-full bg-opacity-0'
            : 'overflow-hidden'
        }`}
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: location.pathname === '/' ? 'cover' : '100% 100%',
          backgroundPosition: 'center',
          backgroundColor: '#141414',
          height: '100vh',
        }}
      >
        <Header />
        <div className="relative">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
