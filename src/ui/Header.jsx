import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import useMovies from '../features/movies/useMovies';
import { useEffect, useRef, useState } from 'react';
import SearchBox from './SearchBox';
import { useSearchQuery } from '../contexts/SearchQueryContext';
import useTVShows from '../features/tvshows/useTVShows';

function Header() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const inputRef = useRef(null);
  const closeRef = useRef(null);
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  console.log(isHamburgerOpened, 'isHamburgerOpened');
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState('');

  const { movies } = useMovies(searchQuery);
  const { shows } = useTVShows(searchQuery);
  // console.log(shows, 'shows');
  // console.log(movies, 'movies');
  const filteredTvShows = shows.filter(
    (show) =>
      show?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      show?.poster_path,
  );
  // console.log(filteredTvShows, 'filteredTvShows');

  const filteredMovies = movies.filter(
    (movie) =>
      movie?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      movie?.poster_path,
  );
  // console.log(filteredMovies, 'filteredMovies');
  // console.log('tbbs', shows);
  // console.log('movies', movies);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setIsHamburgerOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeRef]);

  return (
    <div className="">
      <header
        ref={closeRef}
        className="sticky top-0 z-50 flex w-full items-center bg-[#0d0c0c8d] bg-opacity-70 px-4
       py-3 font-madimi text-white duration-500 sm:p-3"
      >
        <div className="m-auto w-[80%]  justify-between md:flex ">
          <div className="flex justify-between">
            <div>
              <Link
                to="/"
                className="group m-auto px-5 text-2xl font-semibold uppercase tracking-widest text-white"
              >
                <span className="text-3xl font-bold text-nfRed drop-shadow duration-700 group-hover:text-white">
                  F
                </span>
                <span className="duration-700 group-hover:text-nfRed">ILM</span>{' '}
                <span className="text-3xl font-bold text-nfRed duration-700 group-hover:text-white">
                  F
                </span>
                <span className="duration-700 group-hover:text-nfRed">
                  EVER
                </span>
              </Link>
            </div>
            {!isHamburgerOpened ? (
              <Icon
                icon="mdi:hamburger-menu"
                height="40"
                width="40"
                className="flex md:hidden"
                onClick={() => setIsHamburgerOpened(!isHamburgerOpened)}
              />
            ) : (
              <Icon
                icon="mdi:close"
                height="40"
                width="40"
                className="flex md:hidden"
                onClick={() => setIsHamburgerOpened(!isHamburgerOpened)}
              />
            )}
          </div>
          {/* <span className=" ">dlafsdkf</span> */}
          <ul
            className={` font-bold uppercase text-orange-50 md:flex ${isHamburgerOpened ? 'block' : 'hidden'}`}
          >
            <Link
              to="/"
              className="m-auto rounded-3xl hover:text-nfRed"
              onClick={() => setIsHamburgerOpened(false)}
            >
              <li
                className={`p-2 ${location.pathname === '/' ? '!text-nfRed' : ''}`}
              >
                Home
              </li>
            </Link>
            <Link
              to="/movies"
              className="m-auto rounded-3xl hover:text-nfRed"
              onClick={() => setIsHamburgerOpened(false)}
            >
              <li
                className={`p-2 ${location.pathname === '/movies' ? '!text-nfRed' : ''}`}
              >
                Movies
              </li>
            </Link>
            <Link
              to="/tvshows"
              className="m-auto rounded-3xl hover:text-nfRed"
              onClick={() => setIsHamburgerOpened(false)}
            >
              <li
                className={`p-2 ${location.pathname === '/tvshows' ? '!text-nfRed' : ''}`}
              >
                Tv Shows
              </li>
            </Link>
            {/* <Link to="/" className="m-auto rounded-3xl hover:text-nfRed">
              <li className="p-2">Documentaries</li>
            </Link> */}
            <Link
              to="/list"
              className="m-auto rounded-3xl hover:text-nfRed"
              onClick={() => setIsHamburgerOpened(false)}
            >
              <li
                className={`p-2 ${location.pathname === '/list' ? '!text-nfRed' : ''}`}
              >
                My List
              </li>
            </Link>
            <span
              className="icon focus-bg-opacity-10 group relative mx-4 flex rounded-full bg-nfRed
             font-extralight text-white duration-700 focus-within:bg-white focus-within:bg-opacity-10 hover:bg-white 
             hover:bg-opacity-10 max-md:bg-white md:focus-within:pr-8 md:hover:pr-8 xl:focus-within:pr-32 xl:hover:pr-32"
            >
              <Icon
                icon="mi:search"
                height="40"
                width="70"
                className="p-2 group-hover:-z-10 max-md:text-nfRed"
              />
              <input
                ref={inputRef}
                type="text"
                className="absolute left-0 right-0 hidden h-full rounded-full border-2 border-nfRed bg-nfRed
                 bg-opacity-20 px-14 pr-2 outline-nfRed focus:inline focus:invalid:ring-0 group-hover:inline max-md:bg-white max-md:text-nfRed"
                style={{ outline: 'none' }}
                onChange={handleInputChange}
                onFocus={() => setShowSearchBox(true)}
                value={inputValue}
              />
            </span>
          </ul>
        </div>
      </header>
      {showSearchBox && inputValue !== '' && (
        <div className="">
          <SearchBox
            // onClick={() => setIsHamburgerOpened(false)}
            setIsHamburgerOpened={setIsHamburgerOpened}
            inputRef={inputRef}
            filteredMovies={filteredMovies}
            setShowSearchBox={setShowSearchBox}
            setInputValue={setInputValue}
            setSearchQuery={setSearchQuery}
            filteredTvShows={filteredTvShows}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
