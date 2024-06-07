import { Icon } from '@iconify/react';
import { useSelectedMovies } from '../../contexts/SelectedMoviesContext';

function List() {
  const { selectedMovies } = useSelectedMovies();
  return (
    <div>
      <ul className="mt-2 grid h-dvh grid-cols-6 justify-center gap-4  font-truculenta text-lg font-bold">
        {selectedMovies.map((movie) => (
          <div
            key={movie.id}
            className="group/listitem mx-auto mb-4  hover:relative"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="h-60 w-52 rounded-xl object-cover  grayscale   duration-700 group-hover/listitem:h-[23rem] group-hover/listitem:grayscale-0 "
            />
            <div className="  group-hover/listitem::bg-white">
              <p
                className="bg-b-lg mt-2 rounded-b-lg bg-opacity-20
                      from-[#121212ac] from-10%
                  via-[#7c7c7c6e]  via-40%
                  to-[#00000000] 
                  to-100% pb-3
                      text-center   text-nfRed group-hover/listitem:absolute group-hover/listitem:bottom-0 group-hover/listitem:left-0 group-hover/listitem:right-0  group-hover/listitem:bg-gradient-to-t group-hover/listitem:pt-8 group-hover/listitem:text-white "
              >
                {movie.original_title}
              </p>
              <p className=" mt-2 hidden text-center text-white group-hover/listitem:absolute   group-hover/listitem:bottom-9 group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:block ">
                {movie.release_date.split('-')[0]}
              </p>
            </div>
            <span className="font-sm group/trailer hidden cursor-pointer justify-center bg-gray-800  bg-opacity-60 py-2 text-white  group-hover/listitem:absolute group-hover/listitem:bottom-[50%]  group-hover/listitem:left-0 group-hover/listitem:right-0 group-hover/listitem:flex">
              <Icon
                icon="mdi:play"
                height="30"
                width="30"
                className=" inline rounded-full border-2 border-white bg-black bg-opacity-50"
              />
              <span className="ml-2   align-middle transition-opacity duration-700  group-hover/trailer:inline">
                Watch Trailer
              </span>
            </span>
            <button className=" mt-2 hidden text-center text-white group-hover/listitem:absolute   group-hover/listitem:right-4  group-hover/listitem:top-2 group-hover/listitem:block ">
              <Icon
                icon="mdi:close"
                height="18"
                width="18"
                className="  inline rounded-full  bg-black bg-opacity-50"
              />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default List;
