import { useEffect, useState } from 'react';
import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';
import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';

function Movie() {
  const { movies, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useMovies();
  const [heartStates, setHeartStates] = useState(() => {
    // Retrieve heart states from localStorage or initialize to empty object
    const storedStates = localStorage.getItem('heartStates');
    return storedStates ? JSON.parse(storedStates) : {};
  });
  const { selectedMovies, setSelectedMovies } = useSelectedMovies();
  console.log(selectedMovies);
  useEffect(() => {
    const initialHeartStates = {};
    movies.forEach((movie) => {
      initialHeartStates[movie.id] = heartStates[movie.id] || false; // Preserve previous state if available
    });
    // Remove heart states for movies not present in the current page
    Object.keys(heartStates).forEach((id) => {
      if (!movies.some((movie) => movie.id === parseInt(id))) {
        delete initialHeartStates[id];
      }
    });

    // Check if the heartStates have changed before updating
    if (JSON.stringify(heartStates) !== JSON.stringify(initialHeartStates)) {
      setHeartStates(initialHeartStates);
    }
  }, [movies, heartStates]);

  useEffect(() => {
    // Save heart states to localStorage whenever they change
    localStorage.setItem('heartStates', JSON.stringify(heartStates));
  }, [heartStates]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleHeartClick = (movie) => {
    const isFavorite = !heartStates[movie.id];

    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [movie.id]: isFavorite,
    }));

    setSelectedMovies((prevSelectedMovies) => {
      const isMovieSelected = prevSelectedMovies.some(
        (selectedMovie) => selectedMovie.id === movie.id,
      );

      if (!isMovieSelected) {
        // If the movie is not selected, add it to the list
        return [...prevSelectedMovies, { ...movie, favorite: true }];
      } else {
        // If the movie is already selected, remove it from the list
        return prevSelectedMovies.filter(
          (selectedMovie) => selectedMovie.id !== movie.id,
        );
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className=" mx-auto  flex h-full flex-wrap   font-truculenta text-white">
      {movies.map((movie, index) => (
        <div
          className="group relative float-start  m-3 my-8 flex cursor-pointer justify-between  text-center"
          key={movie.id}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            className=" h-72 w-48 flex-wrap rounded-b-lg bg-cover object-cover"
          />
          <span
            className="via-[#7c7c7c6e ] absolute bottom-0   left-0 right-0   z-10 mx-auto hidden
             bg-opacity-20 bg-gradient-to-t from-[#121212ac]
            from-10%  
            via-40%
            to-[#00000000] to-90% py-5  font-bold text-orange-50 group-hover:block group-hover:rounded-b-lg
              group-hover:duration-700"
          >
            <span className="p-1">{movie.original_title}</span>
          </span>
          <button
            className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-40 p-[0.10rem] text-xl"
            onClick={() => handleHeartClick(movie)}
          >
            {heartStates[movie.id] ||
            selectedMovies.some(
              (selectedMovie) => selectedMovie.id === movie.id,
            )
              ? '❤️'
              : '🤍'}
          </button>
        </div>
      ))}
      <div className="my-4 flex w-full justify-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="ml-2   rounded-full bg-gray-300  bg-opacity-40 py-2 font-bold text-nfRed disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon="mdi:arrow-back" height="15" width="30" className="" />
        </button>
        <span className="mx-4 my-auto font-bold">
          page{' '}
          <span className="text-xl font-extrabold text-nfRed">
            {currentPage}
          </span>{' '}
          out of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="ml-2   rounded-full bg-gray-300  bg-opacity-40 py-2 font-bold text-nfRed"
        >
          <Icon icon="mdi:arrow-forward" height="15" width="30" className="" />
        </button>
      </div>
    </div>
  );
}

export default Movie;
