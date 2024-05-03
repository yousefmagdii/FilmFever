import { useContext } from 'react';
import { useSortPreferences } from '../contexts/SortPreferencesContext';

function OrderBy(
  {
    // isSortedByRating,
    // setIsSortedByRating,
    // isSortedByDateAscending,
    // setIsSortedByDateAscending,
    // isSortedByDateDescending,
    // setIsSortedByDateDescending,
  },
) {
  const {
    isSortedByRating,
    isSortedByDateAscending,
    isSortedByDateDescending,
    setSortingPreferences,
  } = useSortPreferences();
  // console.log('isSortedByRating', isSortedByRating);
  const handleRatingClick = () => {
    if (isSortedByRating) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(true, false, false);
    }
  };

  const handleDateAscendingClick = () => {
    if (isSortedByDateAscending) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(false, true, false);
    }
  };

  const handleDateDescendingClick = () => {
    if (isSortedByDateDescending) {
      setSortingPreferences(false, false, false);
    } else {
      setSortingPreferences(false, false, true);
    }
  };

  return (
    <div className="p-1">
      <button
        onClick={handleRatingClick}
        className={`m-1   border-2 bg-opacity-0  p-2 text-xs font-bold text-white  
         hover:bg-nfRed hover:bg-opacity-30 hover:text-white ${isSortedByRating ? 'bg-nfRed bg-opacity-60 !text-white' : ''}`}
      >
        Rating
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
