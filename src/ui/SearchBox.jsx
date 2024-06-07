import { Link } from 'react-router-dom';

function SearchBox({ filteredMovies, setShowSearchBox, filteredTvShows }) {
  // Slice the filteredMovies array to only display the first 10 movies
  const displayedMovies = filteredMovies.slice(0, 4);
  const displayedTvShows = filteredTvShows.slice(0, 4);
  const mergedArray = displayedMovies.flatMap((movie, index) => {
    const tvShow = displayedTvShows[index];
    return tvShow ? [tvShow, movie] : [movie];
  });

  // console.log(mergedArray);
  // console.log(displayedMovies, 'displayedMovies');

  // Function to handle click inside the search box

  return (
    <div
      className="fixed right-20 top-10 z-50 mt-8 w-96 rounded-lg bg-[#141414] bg-opacity-70 p-4 font-truculenta"
      onFocus={() => setShowSearchBox(true)}
      onBlur={() => {
        setShowSearchBox(false);
      }}
    >
      {mergedArray.map((content) => (
        <Link
          to={`/${content.media_type === 'movie' ? 'movies' : 'tvshows'}/${content.id}`}
          key={content.id}
          className="group relative flex cursor-pointer justify-between rounded-lg px-1 py-2 transition duration-300 ease-in-out  hover:bg-white hover:bg-opacity-50"
        >
          <p className="my-auto mr-2 text-white group-hover:hidden group-hover:font-bold group-hover:text-nfRed">
            {content.media_type === 'movie' ? content.title : content.name}
          </p>
          {/* <span
            className=" absolute bottom-0 left-0 right-0 top-0
            hidden pt-9 text-center font-bold uppercase 
            text-nfRed duration-1000 group-hover:block"
          >
            {content.media_type}
          </span> */}
          <span
            className=" absolute bottom-0  top-0
            hidden pt-9 text-center text-xl font-bold 
            uppercase text-nfRed duration-1000 group-hover:block"
          >
            {content.media_type}
          </span>
          {content.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
              alt={
                content.media_type === 'movie' ? content.title : content.name
              }
              className="h-14 w-14 rounded-lg bg-cover object-cover duration-1000 group-hover:ml-auto group-hover:h-24 group-hover:w-24"
            />
          )}
        </Link>
      ))}
    </div>
  );
}

export default SearchBox;
