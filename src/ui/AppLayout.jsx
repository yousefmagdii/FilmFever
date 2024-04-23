import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedImage } from '../features/home/homeSlice';
import useMovies from '../features/movies/useMovies';
import { useCurrentPage } from '../contexts/CurrentPageContext';

function AppLayout() {
  const { movies } = useMovies();
  const selectedImageIndex = useSelector(
    (store) => store.home.selectedImageIndex,
  );
  const { currentPage, setCurrentPage } = useCurrentPage();
  const dispatch = useDispatch();

  const location = useLocation();

  // const selectImage = (index) => {
  //   dispatch(updateSelectedImage(index)); // Dispatch action to update selected image
  // };

  // Check if selectedMovie is available
  const selectedMovie = movies && movies[selectedImageIndex];

  // Check if selectedMovie and its images property are defined before accessing
  const backgroundImageUrl =
    location.pathname === '/' && selectedMovie && selectedMovie.backdrop_path
      ? `url('https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}')`
      : 'url(default-image-url)'; // Default background image URL

  return (
    <>
      <div
        className={
          location.pathname === '/movies'
            ? `!h-full w-full bg-opacity-0`
            : 'overflow-hidden '
        }
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: location.pathname === '/' ? 'cover' : '100% 100%',
          backgroundPosition: 'center',
          backgroundColor: location.pathname !== '/' && '#141414',
          height: '100vh',
        }}
      >
        <Header />
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
