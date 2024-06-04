// SortPreferencesContext.js

import React, { createContext, useContext, useState } from 'react';

const SortPreferencesContext = createContext();

export const useSortPreferences = () => useContext(SortPreferencesContext);

export const SortPreferencesProvider = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTVGenres, setSelectedTVGenres] = useState([]);

  const [isSortedByRating, setIsSortedByRating] = useState(
    localStorage.getItem('isSortedByRating') === 'true' || false,
  );
  const [isSortedByDateAscending, setIsSortedByDateAscending] = useState(
    localStorage.getItem('isSortedByDateAscending') === 'true' || false,
  );
  const [isSortedByDateDescending, setIsSortedByDateDescending] = useState(
    localStorage.getItem('isSortedByDateDescending') === 'true' || false,
  );

  const setSortingPreferences = (rating, ascending, descending) => {
    setIsSortedByRating(rating);
    setIsSortedByDateAscending(ascending);
    setIsSortedByDateDescending(descending);
  };

  return (
    <SortPreferencesContext.Provider
      value={{
        isSortedByRating,
        isSortedByDateAscending,
        isSortedByDateDescending,
        setSortingPreferences,
        selectedGenres,
        setSelectedGenres,
        selectedTVGenres,
        setSelectedTVGenres,
      }}
    >
      {children}
    </SortPreferencesContext.Provider>
  );
};
