// SelectedShowsContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedShowsContext = createContext();

export const useSelectedShows = () => useContext(SelectedShowsContext);

export const SelectedShowsProvider = ({ children }) => {
  const [selectedShows, setSelectedShows] = useState(
    JSON.parse(localStorage.getItem('selectedShows')) || [],
  );

  const [heartStates, setHeartStates] = useState(() => {
    const storedStates = localStorage.getItem('heartStates');
    return storedStates ? JSON.parse(storedStates) : {};
  });

  const toggleHeartState = (show) => {
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [show.id]: !prevHeartStates[show.id],
    }));

    setSelectedShows((prevSelectedShows) => {
      const isShowSelected = prevSelectedShows.some(
        (selectedShow) => selectedShow.id === show.id,
      );

      if (!isShowSelected) {
        return [...prevSelectedShows, { ...show, favorite: true }];
      } else {
        return prevSelectedShows.filter(
          (selectedShow) => selectedShow.id !== show.id,
        );
      }
    });
  };

  const removeShow = (show) => {
    setHeartStates((prevHeartStates) => {
      const updatedHeartStates = { ...prevHeartStates };
      delete updatedHeartStates[show.id];
      return updatedHeartStates;
    });

    setSelectedShows((prevSelectedShows) =>
      prevSelectedShows.filter((s) => s.id !== show.id),
    );
  };

  useEffect(() => {
    localStorage.setItem('selectedShows', JSON.stringify(selectedShows));
  }, [selectedShows]);

  useEffect(() => {
    localStorage.setItem('heartStates', JSON.stringify(heartStates));
  }, [heartStates]);

  return (
    <SelectedShowsContext.Provider
      value={{
        selectedShows,
        toggleHeartState,
        removeShow,
      }}
    >
      {children}
    </SelectedShowsContext.Provider>
  );
};
