import { useEffect, useState, useRef } from 'react';
import useMovies from './useMovies';
import LazyLoad from 'react-lazyload';

import Spinner from '../../ui/Spinner';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCurrentPage } from '../../contexts/CurrentPageContext';
import { useSearchQuery } from '../../contexts/SearchQueryContext';
import FilterAndSort from '../../ui/FilterAndSort';
import FilmReelSpinner from '../../ui/Spinner';

function Movie() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const {
    movies,
    isLoading,
    error,
    totalPages,
    setIsSortedByRating,
    setIsSortedByDateAscending,
    setIsSortedByDateDescending,
  } = useMovies();

  const { currentPage, setCurrentPage } = useCurrentPage();
  const filterRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Reset selectedGenres to an empty array when the component mounts
    setSearchQuery('');
  }, []);

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

  // Handlers for filter changes
  const handleResetPageNumber = () => {
    setCurrentPage(1);
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

  if (isLoading) return <FilmReelSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <button
        className={` left-2 top-16 z-50 mr-auto transition-all duration-700 `}
      >
        {!isFilterClicked ? (
          <div
            className="relative z-50 ml-4 mt-4 flex h-10 w-28 cursor-pointer rounded-lg border-2 border-white text-white transition-all duration-100 hover:border-nfRed hover:text-nfRed"
            onClick={() => setIsFilterClicked(!isFilterClicked)}
          >
            <Icon
              icon="line-md:filter-twotone"
              height="30"
              width="30"
              className={`absolute  m-1   `}
            />

            <span className=" absolute ml-9 mt-1 font-truculenta text-xl font-semibold uppercase ">
              Filter
            </span>
          </div>
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
        className={`fixed bottom-0 top-16 z-10 !h-dvh w-[23rem] bg-[#0d0c0c8d] bg-opacity-70 text-center transition-all duration-1000 ${
          isFilterClicked ? 'left-0' : '-left-[23rem]'
        }`}
        ref={filterRef} // Assign the ref to the filter and sort section
      >
        {isFilterClicked && (
          <>
            <div className="mt-8   ">
              <FilterAndSort
                // isSortedByRating={isSortedByRating}
                setIsSortedByRating={setIsSortedByRating}
                // isSortedByDateAscending={isSortedByDateAscending}
                setIsSortedByDateAscending={setIsSortedByDateAscending}
                // isSortedByDateDescending={isSortedByDateDescending}
                setIsSortedByDateDescending={setIsSortedByDateDescending}
                handleResetPageNumber={handleResetPageNumber}
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`relative mx-auto pt-14 font-truculenta ${
          isFilterClicked ? 'pointer-events-none mt-9 opacity-40' : ''
        }  ${movies.length < 6 ? '!h-dvh overflow-hidden' : '!h-full'}`}
      >
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie, index) => (
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
                  <LazyLoad height={400} offset={100}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      }
                      alt={movie.title}
                      className={`h-90 w-64 rounded-lg bg-cover object-cover ${
                        isFilterClicked ? 'cursor-no-drop' : ''
                      }`}
                    />
                  </LazyLoad>
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
            ))}
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-center text-4xl text-gray-200">
            There are no Movies available please change the genres.
          </div>
        )}
        {/* Overlay to prevent clicking on the grid when the filter section is open */}
        {isFilterClicked && (
          <div
            ref={overlayRef}
            className="absolute left-0 top-0 z-20 h-full w-full"
            style={{ backgroundColor: 'transparent' }}
          />
        )}
      </div>
      {/* Pagination */}
      {movies.length > 0 && (
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
            <Icon
              icon="mdi:arrow-forward"
              height="15"
              width="30"
              className=""
            />
          </button>
        </div>
      )}
    </>
  );
}

export default Movie;
