import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';

function Movie() {
  const { movies, isLoading, error } = useMovies();

  if (isLoading) return <Spinner />;
  return (
    <div className=" mx-auto  flex flex-wrap   text-white ">
      {movies.map((movie, index) => (
        <>
          <div className="group relative float-start  m-3 my-8 flex cursor-pointer justify-between  text-center">
            {/* hover:z-10 hover:scale-150 hover:duration-700 */}
            <img
              src={movie.Poster}
              alt={movie.Title}
              key={movie.imdbID}
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
        </>
      ))}
    </div>
  );
}

export default Movie;
