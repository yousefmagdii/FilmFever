import { Icon } from '@iconify/react';
import React, { useState } from 'react';
// import { movies } from '../services/movieData';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedImage } from './homeSlice';
import MovieInfo from './MovieInfo';
import useMovies from '../movies/useMovies';
import FilmReelSpinner from '../../ui/Spinner';

function Home() {
  const { movies, isLoading } = useMovies();
  console.log(movies);

  const [selectedImageIndex, setSelectedImageIndex] = useState(2);

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

  // console.log(selectedImageIndex);
  // Concatenate all images from all movies into a single array
  const allImages = movies.flatMap((movie) => movie.poster_path);

  // Determine the range of images to display in the carousel
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
        : startIndex + 3;
  }
  if (isLoading) return <FilmReelSpinner />;
  return (
    <div
      className="!h-dvh overflow-hidden"
      // style={{
      //   backgroundImage: `url('https://image.tmdb.org/t/p/original${movies[selectedImageIndex].backdrop_path}')`,
      // }}
    >
      <MovieInfo />
      <div className="absolute  bottom-12 right-12 flex !h-96 w-[50%] items-center justify-center overflow-hidden">
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
            className={`  w-1/4 transform cursor-pointer rounded-3xl border-2 border-transparent p-1  ${startIndex + index === selectedImageIndex ? 'border-nfRed' : 'opacity-90 hover:opacity-100 hover:duration-300 hover:ease-in-out'}`}
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
