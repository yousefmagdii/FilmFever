import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PlayButtons from './PlayButtons';
import useMovies from '../../features/movies/useMovies';
import { updateSelectedImage } from './homeSlice'; // Adjust the path as per your project structure
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';
import { useParams } from 'react-router-dom';
import FilmReelSpinner from '../../ui/Spinner';

function MovieInfo() {
  const { movies, isLoading } = useMovies();
  const { id } = useParams();

  const { selectedMovies } = useSelectedMovies();
  const { imageUrl, name, description, selectedImageIndex } = useSelector(
    (store) => store.home,
  );
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    if (isLoading) return; // If movies are still loading, return early
    if (!movies[selectedImageIndex]) {
      // If selectedMovie is not defined, dispatch action to update selectedImageIndex
      dispatch(updateSelectedImage(0)); // Dispatch action to update selectedImageIndex to 0 or any valid index
      // Or handle differently based on your use case
    }
  }, [isLoading, movies, selectedImageIndex, dispatch]); // Add dispatch to the dependency array

  const selectedMovie = movies && movies[selectedImageIndex];

  return (
    <div className="ml-12 mt-20 inline-block w-[40%] rounded-lg bg-gray-800 bg-opacity-50 p-5 font-truculenta">
      {selectedMovie ? (
        <>
          <p className="pb-5 text-6xl font-extrabold uppercase text-nfRed">
            {selectedMovie.title}
          </p>
          <p className="font-bold leading-8 text-gray-200 opacity-70">
            {selectedMovie.overview}
          </p>
          <p className="mt-3 contents text-xl font-bold leading-8 text-gray-200">
            Rating: {selectedMovie.vote_average.toFixed(1)}⭐
          </p>
          <PlayButtons
            movieId={selectedMovie.id}
            iconClass={
              selectedMovies.find((movie) => movie.id == selectedMovie.id)
                ? 'tabler:circle-check-filled'
                : 'heroicons-solid:plus'
            }
          />
          {/* Uncomment below to show duration */}
          {/* <p className="text-xl font-bold leading-8 text-gray-200 ">Duration: {selectedMovie.duration} minutes⌛</p> */}
          {/* <img
            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
            width={200}
            height={200}
          /> */}
        </>
      ) : (
        <FilmReelSpinner />
      )}
    </div>
  );
}

export default MovieInfo;
