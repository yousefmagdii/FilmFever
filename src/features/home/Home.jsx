import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
// import { movies } from '../services/movieData';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedImage } from './homeSlice';
import MovieInfo from './MovieInfo';
import useMovies from '../movies/useMovies';
import FilmReelSpinner from '../../ui/Spinner';
import useTVShows from '../tvshows/useTVShows';

function Home() {
  const { movies, isLoading: isLoadingMovies } = useMovies();
  const { shows, isLoading: isLoadingTVShows } = useTVShows();
  const [numImagesToShow, setNumImagesToShow] = useState(3);

  const [selectedImageIndex, setSelectedImageIndex] = useState(2);

  useEffect(() => {
    const updateNumImages = () => {
      if (window.innerWidth < 550) {
        setNumImagesToShow(0);
      } else if (window.innerWidth < 768) {
        setNumImagesToShow(1);
      } else if (window.innerWidth < 1024) {
        setNumImagesToShow(4);
      } else if (window.innerWidth < 1280) {
        setNumImagesToShow(3);
      } else {
        setNumImagesToShow(3); // Default to 3 for larger screens
      }
    };

    window.addEventListener('resize', updateNumImages);
    updateNumImages(); // Initial check

    return () => window.removeEventListener('resize', updateNumImages);
  }, []);

  const { imageUrl, name, description } = useSelector((store) => store.home);

  const dispatch = useDispatch();

  const selectImage = (index) => {
    dispatch(updateSelectedImage(index));
    setSelectedImageIndex(index);
  };

  const moveCarousel = (direction) => {
    let newIndex;
    const totalImages = allImages.length;

    if (direction === 'prev') {
      newIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    } else {
      if (selectedImageIndex === 0) {
        newIndex = 3;
      } else {
        newIndex = (selectedImageIndex + 1) % totalImages;
      }
    }

    setSelectedImageIndex(newIndex);
  };

  // Concatenate all images from all movies into a single array
  const allMoviesImages = movies.flatMap((movie) => movie.poster_path);
  const allTVShowsImages = shows.flatMap((show) => show.poster_path);

  const allImage = [...allMoviesImages, ...allTVShowsImages];
  const allImages = allMoviesImages.flatMap((movie, index) => {
    const tvShow = allTVShowsImages[index];
    return tvShow ? [tvShow, movie] : [movie];
  });
  // Determine the range of images to display in the carousel
  let startIndex, endIndex;
  if (endIndex - startIndex === 2) {
    // If there are exactly three images, continue as is
    startIndex = selectedImageIndex - 1 < 0 ? 0 : selectedImageIndex - 1;
    endIndex =
      selectedImageIndex + 1 >= allImages.length
        ? allImages.length - 1
        : selectedImageIndex + 1;
  } else {
    // If fewer than three images, adjust endIndex to show three images
    startIndex = selectedImageIndex - 2 < 0 ? 0 : selectedImageIndex - 2;
    endIndex =
      startIndex + 3 >= allImages.length
        ? allImages.length - 1
        : startIndex + numImagesToShow;
  }
  if (isLoadingMovies || isLoadingTVShows) return <FilmReelSpinner />;
  return (
    <div
      className="!h-dvh overflow-hidden"
      // style={{
      //   backgroundImage: `url('https://image.tmdb.org/t/p/original${movies[selectedImageIndex].backdrop_path}')`,
      // }}
    >
      <MovieInfo />
      <div className="absolute flex items-center justify-center  overflow-hidden max-xl:left-0 max-xl:right-0 max-xl:mt-10 max-[1025px]:mt-10 xl:bottom-12 xl:right-12 xl:!h-96 xl:w-[50%]">
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform  rounded-full bg-white   text-nfRed active:bg-black active:text-white"
          onClick={() => moveCarousel('prev')}
        >
          <Icon
            icon="material-symbols:play-arrow-outline"
            height="40"
            width="40"
            className="rotate-180 p-2"
          />
        </button>
        {allImages.slice(startIndex, endIndex + 1).map((image, index) => (
          <img
            key={startIndex + index}
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={`Thumbnail ${startIndex + index + 1}`}
            className={` transform cursor-pointer rounded-3xl border-2 border-transparent
               p-1 max-xl:w-1/5 max-[1025px]:w-1/6 max-md:w-1/3 max-sm:w-1/2 xl:w-1/4  
               ${startIndex + index === selectedImageIndex ? 'border-nfRed' : 'opacity-90 hover:opacity-100 hover:duration-300 hover:ease-in-out'}`}
            onClick={() => selectImage(startIndex + index)}
          />
        ))}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white   text-nfRed active:bg-black active:text-white"
          onClick={() => moveCarousel('next')}
        >
          {/* <Icon icon="mi:next" height="40" width="40" className="p-2" /> */}
          <Icon
            icon="material-symbols:play-arrow-outline"
            height="40"
            width="40"
            className="p-2"
          />
        </button>
      </div>
    </div>
  );
}

export default Home;
