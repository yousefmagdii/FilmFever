import { Link } from 'react-router-dom';

function SearchBox({
  filteredMovies,
  setShowSearchBox,
  setInputValue,
  setSearchQuery,
}) {
  // Slice the filteredMovies array to only display the first 10 movies
  const displayedMovies = filteredMovies.slice(0, 7);
  console.log('displayedMovies', displayedMovies);

  // Function to handle click inside the search box

  return (
    <div
      className="fixed right-20 top-10 z-50 mt-8 w-96 rounded-lg bg-[#141414] bg-opacity-70 p-4 font-truculenta"
      onFocus={() => setShowSearchBox(true)}
      onBlur={() => {
        setShowSearchBox(false);
        // setInputValue('');
        // setSearchQuery('');
      }}
    >
      {displayedMovies.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          key={movie.id}
          className="group flex cursor-pointer justify-between rounded-lg px-1 py-2 transition duration-300 ease-in-out hover:scale-110 hover:bg-[#707070] hover:bg-opacity-50"
        >
          <p className="my-auto mr-2 text-white group-hover:font-bold group-hover:text-nfRed">
            {movie.title}
          </p>
          {/* <p>{movie.original_title}</p> */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            className="h-14 w-14 rounded-lg bg-cover object-cover"
          />
        </Link>
      ))}
    </div>
  );
}

export default SearchBox;
