import { useContext } from 'react';
import { useSortPreferences } from '../contexts/SortPreferencesContext';
import { useCurrentPage } from '../contexts/CurrentPageContext';

function OrderBy({ handleResetPageNumber }) {
  const {
    isSortedByRating,
    isSortedByDateAscending,
    isSortedByDateDescending,
    setSortingPreferences,
  } = useSortPreferences();

  const handleRatingClick = () => {
    if (isSortedByRating) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(true, false, false);
    }
    handleResetPageNumber();
  };

  const handleDateAscendingClick = () => {
    if (isSortedByDateAscending) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(false, true, false);
    }
    handleResetPageNumber();
  };

  const handleDateDescendingClick = () => {
    if (isSortedByDateDescending) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(false, false, true);
    }
    handleResetPageNumber();
  };

  return (
    <div className="p-1">
      <button
        onClick={handleRatingClick}
        className={`m-1   border-2 bg-opacity-0  p-2 text-xs font-bold text-white  
         hover:bg-nfRed hover:bg-opacity-30 hover:text-white ${isSortedByRating ? 'bg-nfRed bg-opacity-60 !text-white' : ''}`}
      >
        Top Rated
      </button>
      <button
        onClick={handleDateDescendingClick}
        className={`m-1   border-2 bg-opacity-0  p-2 text-xs font-bold text-white  
        hover:bg-nfRed hover:bg-opacity-30 hover:text-white ${isSortedByDateDescending ? 'bg-nfRed bg-opacity-60 !text-white' : ''} `}
      >
        Date: New to old
      </button>
      <button
        onClick={handleDateAscendingClick}
        className={`m-1   border-2 bg-opacity-0  p-2 text-xs font-bold text-white  
         hover:bg-nfRed hover:bg-opacity-30 hover:text-white ${isSortedByDateAscending ? 'bg-nfRed bg-opacity-60 !text-white' : ''}`}
      >
        Date: Old to new
      </button>
    </div>
  );
}

export default OrderBy;
