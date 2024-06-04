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

  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState('');

  const { movies } = useMovies(searchQuery);
  const { tvshows } = useTVShows(searchQuery);
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // console.log('searchedTVSHOWS', tvshows);

  // const filteredTVShows = tvshows.filter((tvshow) =>
  //   tvshow.title.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 flex w-full items-center bg-[#0d0c0c8d] bg-opacity-70 px-4
       py-3 font-madimi text-white duration-500 sm:p-3"
      >
        <div className="m-auto flex w-[80%] justify-between">
          <div className="flex justify-between">
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
              <span className="duration-700 group-hover:text-nfRed">EVER</span>
            </Link>
          </div>
          <ul className="flex font-bold uppercase text-orange-50">
            <Link to="/" className="m-auto rounded-3xl hover:text-nfRed">
              <li
                className={`p-2 ${location.pathname === '/' ? '!text-nfRed' : ''}`}
              >
                Home
              </li>
            </Link>
            <Link to="/movies" className="m-auto rounded-3xl hover:text-nfRed">
              <li
                className={`p-2 ${location.pathname === '/movies' ? '!text-nfRed' : ''}`}
              >
                Movies
              </li>
            </Link>
            <Link to="/tvshows" className="m-auto rounded-3xl hover:text-nfRed">
              <li
                className={`p-2 ${location.pathname === '/tvshows' ? '!text-nfRed' : ''}`}
              >
                Tv Shows
              </li>
            </Link>
            {/* <Link to="/" className="m-auto rounded-3xl hover:text-nfRed">
              <li className="p-2">Documentaries</li>
            </Link> */}
            <Link to="/list" className="m-auto rounded-3xl hover:text-nfRed">
              <li
                className={`p-2 ${location.pathname === '/list' ? '!text-nfRed' : ''}`}
              >
                My List
              </li>
            </Link>
            <span className="icon focus-bg-opacity-10 group relative mx-4 flex rounded-full bg-nfRed font-extralight text-white duration-700 focus-within:bg-white focus-within:bg-opacity-10 focus-within:pr-32 hover:bg-white hover:bg-opacity-10 hover:pr-32">
              <Icon
                icon="mi:search"
                height="40"
                width="70"
                className="p-2 group-hover:-z-10"
              />
              <input
                ref={inputRef}
                type="text"
                className="absolute left-0 right-0 hidden h-full rounded-full border-2 border-nfRed bg-nfRed bg-opacity-20 px-14 pr-2 outline-nfRed focus:inline focus:invalid:ring-0 group-hover:inline"
                style={{ outline: 'none' }}
                onChange={handleInputChange}
                onFocus={() => setShowSearchBox(true)}
                value={inputValue}
              />
            </span>
          </ul>
        </div>
      </header>
      {showSearchBox && (
        <div className="">
          <SearchBox
            inputRef={inputRef}
            filteredMovies={filteredMovies}
            setShowSearchBox={setShowSearchBox}
            setInputValue={setInputValue}
            setSearchQuery={setSearchQuery}
          />
        </div>
      )}
    </>
  );
}

export default Header;
