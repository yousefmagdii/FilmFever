import { Icon } from '@iconify/react';
import OrderBy from './OrderBy';
import GenresFilter from './GenresFilter';
import { useCurrentPage } from '../contexts/CurrentPageContext';

function FilterAndSort({
  setIsFilterClicked,
  isFilterClicked,
  isSortedByRating,
  // setIsSortedByRating,
  isSortedByDateAscending,
  // setIsSortedByDateAscending,
  isSortedByDateDescending,
  // setIsSortedByDateDescending,
  // handleResetPageNumber,
}) {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const handleResetPageNumber = () => {
    setCurrentPage(1);
  };
  return (
    <>
      {/* <div
        className={`absolute bottom-0 left-0 top-0 z-10  w-72 bg-[#0d0c0c8d] text-nfRed transition-all duration-700 ${isFilterClicked ? 'left-0' : '-left-72'}`}
      ></div> */}
      {/* <span className=" text-center text-white">Filter</span> */}
      <h2 className=" font-truculenta text-2xl font-bold text-white">
        Order By
      </h2>
      <OrderBy
        isSortedByRating={isSortedByRating}
        // setIsSortedByRating={setIsSortedByRating}
        isSortedByDateAscending={isSortedByDateAscending}
        // setIsSortedByDateAscending={setIsSortedByDateAscending}
        isSortedByDateDescending={isSortedByDateDescending}
        // setIsSortedByDateDescending={setIsSortedByDateDescending}
        handleResetPageNumber={handleResetPageNumber}
      />

      <h2 className="mt-8  font-truculenta text-2xl font-bold text-white">
        Genres
      </h2>
      <GenresFilter handleResetPageNumber={handleResetPageNumber} />
    </>
  );
}

export default FilterAndSort;
