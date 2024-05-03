import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedImage } from '../features/home/homeSlice';
import useMovies from '../features/movies/useMovies';
import { useCurrentPage } from '../contexts/CurrentPageContext';
import FilmReelSpinner from './Spinner';
import { useEffect } from 'react';

function AppLayout() {
  const { movies, isLoading } = useMovies();
  const location = useLocation();

  // useEffect(() => {
  // Check if the current location is the home route
  //   if (location.pathname === '/') {
  //     // Perform any actions you want to do when navigating to the home route
  //     // For example, you can reload the page
  //     window.location.reload();
  //   }
  // }, [location.pathname]);

  console.log('Movies kolalala', movies);
  const selectedImageIndex = useSelector(
    (store) => store.home.selectedImageIndex,
  );
  // const { currentPage, setCurrentPage } = useCurrentPage();
  // const dispatch = useDispatch();

  // const location = useLocation();

  // const selectImage = (index) => {
  //   dispatch(updateSelectedImage(index)); // Dispatch action to update selected image
  // };

  // Check if selectedMovie is available
  const selectedMovie = movies && movies[selectedImageIndex];

  // Check if selectedMovie and its images property are defined before accessing
  const backgroundImageUrl =
    location.pathname === '/' && selectedMovie && selectedMovie.backdrop_path
      ? `url('https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}')`
      : 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'; // Default background image URL

  if (isLoading) return <FilmReelSpinner />;
  return (
    <>
      <div
        className={`bg-image ${
          location.pathname === '/movies'
            ? '!h-full w-full bg-opacity-0'
            : 'overflow-hidden'
        }`}
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: location.pathname === '/' ? 'cover' : '100% 100%',
          backgroundPosition: 'center',
          // backgroundColor: location.pathname !== '/' && '#141414',
          backgroundColor: '#141414',
          height: '100vh',
          // filter: backgroundImageUrl.includes('unsplash')
          //   ? 'blur(5px)'
          //   : 'none',
        }}
      >
        {' '}
        {/* <style>{`
      .bg-image {
        width: 100%;
        height: 100%;
        filter: ${backgroundImageUrl.includes('unsplash') ? 'blur(5px)' : 'none'}; // Apply blur filter if the background image is from Unsplash
      }
    `}</style> */}
        <Header />
        {/* <img
          src={`https://image.tmdb.org/t/p/original${movies[0].poster_path}`}
          alt=""
        /> */}
        <div className=" relative">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
