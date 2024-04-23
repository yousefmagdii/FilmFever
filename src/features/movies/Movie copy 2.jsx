// Movie.jsx

import { useEffect } from 'react';
import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';

function Movie() {
  const { movies, isLoading, error, currentPage, setCurrentPage } = useMovies();

  const totalPages = 4; // Total number of pages

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

  if (isLoading) return <Spinner />;
  return (
    <div className=" mx-auto  flex flex-wrap   text-white ">
      {movies.map((movie, index) => (
        <div
          className="group relative float-start  m-3 my-8 flex cursor-pointer justify-between  text-center"
          key={movie.imdbID}
        >
          <img
            src={movie.Poster}
            alt={movie.Title}
            className=" h-72 w-48 flex-wrap rounded-b-lg bg-cover"
          />
          <span
            className="via-[#7c7c7c6e ] absolute bottom-0   left-0 right-0   z-10 mx-auto hidden
             bg-opacity-20 bg-gradient-to-t from-[#121212ac]
            from-10%  
            via-40%
            to-[#00000000] to-90% py-5  font-bold text-orange-50 group-hover:block group-hover:rounded-b-lg
              group-hover:duration-700"
          >
            <span className="p-1">{movie.Title}</span>
          </span>
        </div>
      ))}
      <div className="flex w-full justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="ml-2 mt-4 rounded-lg bg-gray-800 px-4 py-2 text-white"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mr-2 mt-4 rounded-lg bg-gray-800 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movie;
