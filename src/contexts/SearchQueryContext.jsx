import { createContext, useContext, useState } from 'react';

const SearchQueryContext = createContext('');

export const useSearchQuery = () => useContext(SearchQueryContext);

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryContext;
