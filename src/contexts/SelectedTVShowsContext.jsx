import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectedTVShowsContext = createContext();

export const useSelectedTVShows = () => useContext(SelectedTVShowsContext);

export const SelectedTVShowsProvider = ({ children }) => {
  const [selectedTVShows, setSelectedTVShows] = useState(
    JSON.parse(localStorage.getItem('selectedTVShows')) || [],
  );

  const [heartStates, setHeartStates] = useState(() => {
    const storedStates = localStorage.getItem('tvHeartStates');
    return storedStates ? JSON.parse(storedStates) : {};
  });

  const toggleHeartState = (show) => {
    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [show.id]: !prevHeartStates[show.id],
    }));

    setSelectedTVShows((prevSelectedTVShows) => {
      const isShowSelected = prevSelectedTVShows.some(
        (selectedShow) => selectedShow.id === show.id,
      );

      if (!isShowSelected) {
        return [...prevSelectedTVShows, { ...show, favorite: true }];
      } else {
        return prevSelectedTVShows.filter(
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

    setSelectedTVShows((prevSelectedTVShows) =>
      prevSelectedTVShows.filter((s) => s.id !== show.id),
    );
  };

  useEffect(() => {
    localStorage.setItem('selectedTVShows', JSON.stringify(selectedTVShows));
  }, [selectedTVShows]);

  useEffect(() => {
    localStorage.setItem('tvHeartStates', JSON.stringify(heartStates));
  }, [heartStates]);

  return (
    <SelectedTVShowsContext.Provider
      value={{
        selectedTVShows,
        setSelectedTVShows,
        heartStates,
        toggleHeartState,
        removeShow,
      }}
    >
      {children}
    </SelectedTVShowsContext.Provider>
  );
};
