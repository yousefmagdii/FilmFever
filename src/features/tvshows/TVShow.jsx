import React, { useEffect, useState, useRef } from 'react';
import useTVShows from './useTVShows';
import Spinner from '../../ui/Spinner';
import { Icon } from '@iconify/react';
import { useSelectedTVShows } from '../../contexts/SelectedTVShowsContext';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCurrentPage } from '../../contexts/CurrentPageContext';
import { useSearchQuery } from '../../contexts/SearchQueryContext';
import FilterAndSort from '../../ui/FilterAndSort';
import FilmReelSpinner from '../../ui/Spinner';

function TVShow() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const {
    shows,
    isLoading,
    error,
    totalPages,
    setIsSortedByRating,
    setIsSortedByDateAscending,
    setIsSortedByDateDescending,
  } = useTVShows();

  console.log('Shows:', shows);

  const { currentPage, setCurrentPage } = useCurrentPage();
  const filterRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

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

  const handleResetPageNumber = () => {
    setCurrentPage(1);
  };

  const { heartStates, toggleHeartState } = useSelectedTVShows();

  const handleToggleHeartState = (show) => {
    toggleHeartState(show);
    const isShowInFavorites = heartStates[show.id];
    const toastMessage = isShowInFavorites
      ? `${show.name} removed from your list`
      : `${show.name} added to your list`;

    if (isShowInFavorites) {
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
        ref={filterRef}
      >
        {isFilterClicked && (
          <>
            <div className="mt-8">
              <FilterAndSort
                setIsSortedByRating={setIsSortedByRating}
                setIsSortedByDateAscending={setIsSortedByDateAscending}
                setIsSortedByDateDescending={setIsSortedByDateDescending}
                handleResetPageNumber={handleResetPageNumber}
              />
            </div>
          </>
        )}
      </div>

      <div
        className={`relative mx-auto grid grid-cols-5 gap-8 pt-14 font-truculenta ${
          isFilterClicked ? 'pointer-events-none mt-9 opacity-40' : ''
        }`}
      >
        {shows.map((show) => (
          <div
            className={`group relative mx-auto flex w-fit cursor-pointer flex-col items-center `}
            key={show.id}
          >
            <Link
              to={{
                pathname: `/tvshows/${show.id}`,
                state: { shows, currentPage },
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className={`h-90 w-64 rounded-lg bg-cover object-cover ${
                  isFilterClicked ? 'cursor-no-drop' : ''
                }`}
              />
            </Link>
            <span className="absolute bottom-0 left-0 right-0 z-10 hidden bg-gradient-to-t from-[#121212ac] to-[#00000000] py-5 text-center font-bold text-orange-50 group-hover:block group-hover:rounded-b-lg group-hover:duration-700">
              <span className="p-1">{show.name}</span>
            </span>
            <button
              className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-40 p-[0.10rem]"
              onClick={() => handleToggleHeartState(show)}
            >
              {!heartStates[show.id] ? (
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
                    color: '#e50914',
                    transition: 'color 0.3s ease',
                  }}
                />
              )}
            </button>
          </div>
        ))}
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

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default TVShow;
