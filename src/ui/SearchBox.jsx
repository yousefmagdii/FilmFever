import { useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

function SearchBox({
  filteredMovies,
  setShowSearchBox,
  filteredTvShows,
  setIsHamburgerOpened,
}) {
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
  // Create a ref to the search box div
  const searchBoxRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the search box
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearchBox(false);
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSearchBox]);
  return (
    <div
      ref={searchBoxRef}
      className="fixed right-7 top-10 z-50 mt-8 rounded-lg bg-[#141414] bg-opacity-70 p-4 font-truculenta max-xl:left-20 md:right-20  xl:w-96 "
      onFocus={() => setShowSearchBox(true)}
      onBlur={() => setShowSearchBox(false)}
      onClick={() => setIsHamburgerOpened(false)}
    >
      {mergedArray.map((content) => (
        <Link
          to={`/${content.media_type === 'movie' ? 'movies' : 'tvshows'}/${content.id}`}
          key={content.id}
          className="group relative flex cursor-pointer justify-between rounded-lg px-1 py-2 transition duration-300 ease-in-out 
           xl:hover:bg-white xl:hover:bg-opacity-50"
          onClick={() => setShowSearchBox(false)}
        >
          <p className="my-auto mr-2 text-white group-hover:font-bold group-hover:text-nfRed xl:group-hover:hidden">
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
            hidden pt-9 text-center text-xl font-bold uppercase 
            text-nfRed duration-1000 xl:hidden xl:group-hover:block"
          >
            {content.media_type}
          </span>
          {content.poster_path && (
            <LazyLoad height={400} offset={100}>
              <img
                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                alt={
                  content.media_type === 'movie' ? content.title : content.name
                }
                className="h-14 w-14 rounded-lg bg-cover object-cover duration-1000 xl:group-hover:ml-auto xl:group-hover:h-24 xl:group-hover:w-24"
              />
            </LazyLoad>
          )}
        </Link>
      ))}
    </div>
  );
}

export default SearchBox;
