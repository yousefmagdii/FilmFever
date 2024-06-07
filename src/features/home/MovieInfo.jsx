import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PlayButtons from './PlayButtons';
import useMovies from '../../features/movies/useMovies';
import { updateSelectedImage } from './homeSlice'; // Adjust the path as per your project structure
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useParams } from 'react-router-dom';
import FilmReelSpinner from '../../ui/Spinner';
import useTVShows from '../tvshows/useTVShows';
import { useSelectedTVShows } from '../../contexts/SelectedTVShowsContext';

function MovieInfo() {
  const { movies, isLoading: isLoadingMovies } = useMovies();
  const { shows, isLoading: isLoadingTVShows } = useTVShows();
  const { id } = useParams();

  const { selectedMovies } = useSelectedMovies();
  const { selectedTVShows } = useSelectedTVShows();
  const { selectedImageIndex } = useSelector((store) => store.home);
  const dispatch = useDispatch(); // Get the dispatch function

  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (isLoadingMovies || isLoadingTVShows) return; // If data is still loading, return early

    // Combine movies and TV shows alternately
    const combinedItems = [];
    const maxLength = Math.max(movies.length, shows.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < shows.length)
        combinedItems.push({ type: 'show', data: shows[i] });
      if (i < movies.length)
        combinedItems.push({ type: 'movie', data: movies[i] });
    }

    setAllItems(combinedItems);
  }, [isLoadingMovies, isLoadingTVShows, movies, shows]);

  useEffect(() => {
    if (isLoadingMovies || isLoadingTVShows || !allItems.length) return; // If data is still loading or combinedItems is not ready, return early
    if (!allItems[selectedImageIndex]) {
      dispatch(updateSelectedImage(0)); // Dispatch action to update selectedImageIndex to 0 or any valid index
    }
  }, [
    isLoadingMovies,
    isLoadingTVShows,
    allItems,
    selectedImageIndex,
    dispatch,
  ]); // Add dispatch to the dependency array

  if (isLoadingMovies || isLoadingTVShows || !allItems.length)
    return <FilmReelSpinner />;

  const selectedItem = allItems[selectedImageIndex];
  // console.log(selectedItem.type);
  return (
    <div className="relative ml-12 mt-20 inline-block w-[40%] rounded-lg bg-gray-800 bg-opacity-50 p-5 font-truculenta">
      {selectedItem ? (
        <>
          <p className="pb-5 text-6xl font-extrabold uppercase text-nfRed">
            {selectedItem.data.title || selectedItem.data.name}
          </p>
          <p className="font-bold leading-8 text-gray-200 opacity-70">
            {selectedItem.data.overview}
          </p>
          <p className="mt-3 contents text-xl font-bold leading-8 text-gray-200">
            Rating: {selectedItem.data.vote_average.toFixed(1)}⭐
          </p>
          <p className="  text-xl font-bold leading-8 text-gray-200">
            {selectedItem.type === 'movie' ? 'Movie' : 'Tv Show'}{' '}
          </p>

          <PlayButtons
            movieId={
              selectedItem.type === 'movie' ? selectedItem.data.id : null
            }
            tvShowId={
              selectedItem.type === 'show' ? selectedItem.data.id : null
            }
            mediaType={selectedItem.type}
          />
        </>
      ) : (
        <FilmReelSpinner />
      )}
    </div>
  );
}

export default MovieInfo;
