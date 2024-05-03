import { useEffect, useState, useRef } from 'react';
import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCurrentPage } from '../../contexts/CurrentPageContext';
import { useSearchQuery } from '../../contexts/SearchQueryContext';
import FilterAndSort from '../../ui/FilterAndSort';

function Movie() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const {
    movies,
    isLoading,
    error,
    totalPages,
    // isSortedByRating,
    setIsSortedByRating,
    // isSortedByDateAscending,
    setIsSortedByDateAscending,
    // isSortedByDateDescending,
    setIsSortedByDateDescending,
  } = useMovies();

  console.log('mmm', movies);
  //const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
  //console.log('sorted', sortedMovies);
  const { currentPage, setCurrentPage } = useCurrentPage();
  const filterRef = useRef(null);
  const overlayRef = useRef(null);
  /*  const sortedMoviesByRating = [...movies];
  const sortedMoviesByDateAsc = [...movies];
  const sortedMoviesByDateDesc = [...movies];
  sortedMoviesByRating.sort((a, b) => b.vote_average - a.vote_average);
  sortedMoviesByDateAsc.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date),
  );
  console.log('sortedMoviesByDateAsc', sortedMoviesByDateAsc);
  sortedMoviesByDateDesc.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date),
  );
  console.log('sortedMoviesByDateDesc', sortedMoviesByDateDesc); */

  /*  const sortMoviesByRating = () => {
    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    return sortedMovies;
  }; */

  useEffect(() => {
    // Save currentPage to localStorage whenever it changes
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click occurred outside the filter and sort section
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterClicked(false); // Close the section
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { heartStates, toggleHeartState } = useSelectedMovies();

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

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <button
        className={` left-2 top-16 z-50 mr-auto transition-all duration-700 `}
      >
        {!isFilterClicked ? (
          <Icon
            icon="line-md:filter-twotone"
            height="30"
            width="30"
            className={`absolute z-50 m-1 text-nfRed transition-all duration-100 `}
            onClick={() => setIsFilterClicked(!isFilterClicked)}
          />
        ) : (
          <Icon
            icon="mdi:close"
            height="28"
            width="28"
            className="fixed left-2 z-50 inline
         cursor-pointer rounded-full bg-black bg-opacity-50 text-white"
            onClick={() => setIsFilterClicked(!isFilterClicked)}
          />
        )}
      </button>
      <div
        className={`fixed bottom-0 top-16 z-10 h-dvh w-80 bg-[#0d0c0c8d] bg-opacity-70 text-center transition-all duration-1000 ${
          isFilterClicked ? 'left-0' : '-left-80'
        }`}
        ref={filterRef} // Assign the ref to the filter and sort section
      >
        {isFilterClicked && (
          <div className="mt-8">
            <FilterAndSort
              // isSortedByRating={isSortedByRating}
              setIsSortedByRating={setIsSortedByRating}
              // isSortedByDateAscending={isSortedByDateAscending}
              setIsSortedByDateAscending={setIsSortedByDateAscending}
              // isSortedByDateDescending={isSortedByDateDescending}
              setIsSortedByDateDescending={setIsSortedByDateDescending}
            />
          </div>
        )}
      </div>

      <div
        className={`relative mx-auto grid grid-cols-5 gap-8 pt-14 font-truculenta ${
          isFilterClicked ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        {
          /*  (isSortedByRating
          ? sortedMoviesByRating
          : isSortedByDateAscending
            ? sortedMoviesByDateAsc
            : isSortedByDateDescending
              ? sortedMoviesByDateDesc
              : movies
        ) */
          movies.map((movie, index) => (
            <div
              className={`group relative mx-auto flex w-fit cursor-pointer flex-col items-center `}
              key={movie.id}
            >
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { movies, currentPage },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={`h-90 w-64 rounded-lg bg-cover object-cover ${
                    isFilterClicked ? 'cursor-no-drop' : ''
                  }`}
                />
              </Link>
              <span className="absolute bottom-0 left-0 right-0 z-10 hidden bg-gradient-to-t from-[#121212ac] to-[#00000000] py-5 text-center font-bold text-orange-50 group-hover:block group-hover:rounded-b-lg group-hover:duration-700">
                <span className="p-1">{movie.title}</span>
              </span>
              <button
                className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-40 p-[0.10rem] "
                onClick={() => handleToggleHeartState(movie)}
              >
                {!heartStates[movie.id] ? (
                  <Icon
                    icon="mdi:heart-outline"
                    height="20"
                    width="20"
                    className="m-1"
                    style={{
                      color: '#fff',
                      transition: 'color 0.3s ease',
                    }}
                  />
                ) : (
                  <Icon
                    icon="mdi:heart"
                    height="20"
                    width="20"
                    className="m-1"
                    style={{
                      color: '#E50914',
                      transition: 'color 0.3s ease',
                    }}
                  />
                )}
                <Toaster position="top-center" reverseOrder={false} width />
              </button>
            </div>
          ))
        }
        {/* Overlay to prevent clicking on the grid when the filter section is open */}
        {isFilterClicked && (
          <div
            ref={overlayRef}
            className="absolute left-0 top-0 z-20 h-full w-full"
            style={{ backgroundColor: 'transparent' }}
          />
        )}
      </div>
      <div className="mt-6 flex w-full justify-center pb-7 font-truculenta text-white ">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="ml-2 rounded-full bg-gray-300 bg-opacity-40 py-2 font-bold text-nfRed disabled:cursor-not-allowed disabled:opacity-50"
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
          className="ml-2 rounded-full bg-gray-300 bg-opacity-40 py-2 font-bold text-nfRed"
        >
          <Icon icon="mdi:arrow-forward" height="15" width="30" className="" />
        </button>
      </div>
    </>
  );
}

export default Movie;
