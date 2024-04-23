import { useEffect, useState } from 'react';
import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { Toaster, toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { Link } from 'react-router-dom';
import { useCurrentPage } from '../../contexts/CurrentPageContext';
import { useSearchQuery } from '../../contexts/SearchQueryContext';
import FilterAndSort from '../../ui/FilterAndSort';

function Movie() {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  const { movies, isLoading, error, totalPages } = useMovies(); // Use searchQuery from context
  const { currentPage, setCurrentPage } = useCurrentPage(); // Use currentPage from context
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  console.log(isFilterClicked);

  const { heartStates, toggleHeartState } = useSelectedMovies();

  useEffect(() => {
    // Save currentPage to localStorage whenever it changes
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle adding or removing a movie
  const handleToggleHeartState = (movie) => {
    const isMovieInFavorites = heartStates[movie.id];
    toggleHeartState(movie);

    // Show a toast notification with the movie name
    const toastMessage = isMovieInFavorites
      ? `${movie.title} removed from your list`
      : `${movie.title} added to your list`;

    // Show a success or error toast based on whether the movie is being added or removed
    if (isMovieInFavorites) {
      toast.error(toastMessage);
    } else {
      toast.success(toastMessage);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <>
      <button
        className={`absolute left-2 top-1 z-50 mr-auto transition-all duration-700 `}
      >
        {!isFilterClicked ? (
          <Icon
            icon="line-md:filter-twotone"
            height="30"
            width="30"
            className={`z-50 m-1 text-nfRed transition-all duration-700 `}
            onClick={() => setIsFilterClicked(!isFilterClicked)}
          />
        ) : (
          <Icon
            icon="mdi:close"
            height="30"
            width="30"
            className=" z-50  inline cursor-pointer
         rounded-full bg-black bg-opacity-50 text-nfRed"
            onClick={() => setIsFilterClicked(false)}
          />
        )}
      </button>
      <FilterAndSort isFilterClicked={isFilterClicked} />
      <div
        className={` mx-auto grid  grid-cols-5 gap-8 pt-14 font-truculenta ${isFilterClicked ? 'blur-sm' : ''}`}
      >
        {movies.map((movie, index) => (
          <div
            className={`group relative mx-auto flex w-fit cursor-pointer flex-col items-center `}
            key={movie.id}
          >
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { movies, currentPage }, // Pass movie ID as part of the URL
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-90 w-64 rounded-lg bg-cover object-cover"
              />
            </Link>
            <span className="absolute bottom-0 left-0 right-0 z-10 hidden bg-gradient-to-t from-[#121212ac] to-[#00000000] py-5 text-center font-bold text-orange-50 group-hover:block group-hover:rounded-b-lg group-hover:duration-700">
              <span className="p-1">{movie.title}</span>
            </span>
            <button
              className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-40 p-[0.10rem] "
              onClick={() => handleToggleHeartState(movie)} // Use handleToggleHeartState instead
            >
              <Icon
                icon="mdi:heart"
                height="20"
                width="20"
                className="m-1"
                style={{
                  color: heartStates[movie.id] ? '#E50914' : 'white',
                  transition: 'color 0.3s ease',
                }}
              />
              <Toaster position="top-center" reverseOrder={false} width />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6  flex w-full justify-center pb-7 font-truculenta text-white ">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="ml-2   rounded-full bg-gray-300  bg-opacity-40 py-2 font-bold text-nfRed disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon="mdi:arrow-back" height="15" width="30" className="" />
        </button>
        <span className="mx-4 my-auto font-bold">
          page{' '}
          <span className="text-xl font-extrabold text-nfRed">
            {currentPage}
          </span>{' '}
          out of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="  ml-2 rounded-full bg-gray-300  bg-opacity-40 py-2 font-bold text-nfRed"
        >
          <Icon icon="mdi:arrow-forward" height="15" width="30" className="" />
        </button>
      </div>
    </>
  );
}

export default Movie;
