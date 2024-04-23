// SelectedMoviesContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedMoviesContext = createContext();

export const useSelectedMovies = () => useContext(SelectedMoviesContext);

export const SelectedMoviesProvider = ({ children }) => {
  const [selectedMovies, setSelectedMovies] = useState(
    JSON.parse(localStorage.getItem('selectedMovies')) || [],
  );

  const [heartStates, setHeartStates] = useState(() => {
    const storedStates = localStorage.getItem('heartStates');
    return storedStates ? JSON.parse(storedStates) : {};
  });

  const toggleHeartState = (movie) => {
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [movie.id]: !prevHeartStates[movie.id],
    }));

    setSelectedMovies((prevSelectedMovies) => {
      console.log(movie.id);
      const isMovieSelected = prevSelectedMovies.some(
        (selectedMovie) => selectedMovie.id === movie.id,
      );

      if (!isMovieSelected) {
        // If the movie is not selected, add it to the list
        //const movieToAdd = selectedMovies.find((m) => m.id === movie.id);
        return [...prevSelectedMovies, { ...movie, favorite: true }];
      } else {
        // If the movie is already selected, remove it from the list
        return prevSelectedMovies.filter(
          (selectedMovie) => selectedMovie.id !== movie.id,
        );
      }
    });
  };

  const removeMovie = (movie) => {
    setHeartStates((prevHeartStates) => {
      const updatedHeartStates = { ...prevHeartStates };
      delete updatedHeartStates[movie.id];
      return updatedHeartStates;
    });

    setSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.filter((m) => m.id !== movie.id),
    );
  };

  useEffect(() => {
    localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
  }, [selectedMovies]);

  useEffect(() => {
    localStorage.setItem('heartStates', JSON.stringify(heartStates));
  }, [heartStates]);

  return (
    <SelectedMoviesContext.Provider
      value={{
        selectedMovies,
        setSelectedMovies,
        heartStates,
        toggleHeartState,
        removeMovie,
      }}
    >
      {children}
    </SelectedMoviesContext.Provider>
  );
};
