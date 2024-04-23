import { Icon } from '@iconify/react';

function FilterAndSort({ setIsFilterClicked, isFilterClicked }) {
  return (
    <div
      className={`absolute bottom-0 left-0 top-0 z-10  w-72 bg-[#0d0c0c8d] text-nfRed transition-all duration-700 ${isFilterClicked ? 'left-0' : '-left-72'}`}
    >
      {/* <span className="">{isFilterClicked && <FilterAndSort />}</span> */}
    </div>
  );
}

export default FilterAndSort;
