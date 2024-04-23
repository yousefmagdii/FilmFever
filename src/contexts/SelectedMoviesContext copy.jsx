import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedMoviesContext = createContext();

export const useSelectedMovies = () => useContext(SelectedMoviesContext);

export const SelectedMoviesProvider = ({ children }) => {
  const [selectedMovies, setSelectedMovies] = useState(
    JSON.parse(localStorage.getItem('selectedMovies')) || [],
  );

  useEffect(() => {
    localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
  }, [selectedMovies]);

  return (
    <SelectedMoviesContext.Provider
      value={{ selectedMovies, setSelectedMovies }}
    >
      {children}
    </SelectedMoviesContext.Provider>
  );
};
