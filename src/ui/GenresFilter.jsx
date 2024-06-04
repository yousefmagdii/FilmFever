import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useMovies from '../features/movies/useMovies';
import useTVShows from '../features/tvshows/useTVShows';
import { useLocation } from 'react-router-dom';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const tvShowGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

function GenresFilter({ handleResetPageNumber }) {
  const [selectedType, setSelectedType] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Determine the selected type based on the pathname
    if (location.pathname === '/tvshows') {
      setSelectedType('tv');
    } else if (location.pathname === '/movies') {
      setSelectedType('movie');
    }
  }, [location.pathname]);

  const { selectedGenres = [], setSelectedGenres } = useMovies() || {};
  const { selectedTVGenres = [], setSelectedTVGenres } = useTVShows() || {};

  const clickOnGenre = (genreId) => {
    if (selectedType === 'movie') {
      handleGenreSelection(selectedGenres, setSelectedGenres, genreId);
    } else if (selectedType === 'tv') {
      handleGenreSelection(selectedTVGenres, setSelectedTVGenres, genreId);
    }
  };

  const handleGenreSelection = (selectedGenres, setSelectedGenres, genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((g) => g !== genreId),
      );
      handleResetPageNumber();
    } else if (selectedGenres.length < 3) {
      setSelectedGenres((prevGenres) => [...prevGenres, genreId]);
      handleResetPageNumber();
    } else {
      toast.error('You can only select up to three genres');
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 font-madimi">
        {selectedType === 'movie'
          ? genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => clickOnGenre(genre.id)}
                className={`mx-1 my-1 rounded-lg bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
        hover:bg-white hover:bg-opacity-60
        hover:text-nfRed ${selectedGenres.includes(genre.id) ? 'scale-125 !text-nfRed ' : ''}`}
              >
                {genre.name}
              </button>
            ))
          : tvShowGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => clickOnGenre(genre.id)}
                className={`mx-1 my-1 rounded-lg bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
        hover:bg-white hover:bg-opacity-60
        hover:text-nfRed ${selectedTVGenres.includes(genre.id) ? 'scale-125 !text-nfRed ' : ''}`}
              >
                {genre.name}
              </button>
            ))}
      </div>
      <button className="mt-2 w-[60%] border-[1px] bg-nfRed p-3 font-truculenta text-base font-bold text-white duration-700 hover:scale-110 hover:bg-opacity-80">
        Apply Filter
      </button>
      <Toaster
        position="top-center"
        reverseOrder={false}
        autoClose={1000}
        draggablePercent={60}
      />
    </>
  );
}

export default GenresFilter;
