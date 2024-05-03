import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function GenresFilter() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const clickOnGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      // If the genre is already selected, remove it from the list
      setSelectedGenres((prevGenres) => prevGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
      // If the number of selected genres is less than three, add the new genre
      setSelectedGenres((prevGenres) => [...prevGenres, genre]);
    } else {
      // If the number of selected genres is already three, show an error toast
      toast.error('You can only select up to three genres', {
        // position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  console.log(selectedGenres);
  return (
    <>
      <div className="grid grid-cols-4 font-madimi">
        {' '}
        <button
          onClick={() => clickOnGenre('Action')}
          className={`mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500 
             hover:bg-white hover:bg-opacity-60
              hover:text-nfRed  ${selectedGenres.includes('Action') ? 'scale-125 !text-nfRed ' : ''}`}
        >
          Action
        </button>
        <button
          onClick={() => clickOnGenre('Adventure')}
          className={`mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500  
           hover:bg-white hover:bg-opacity-60 
           hover:text-nfRed ${selectedGenres.includes('Adventure') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Adventure
        </button>
        <button
          onClick={() => clickOnGenre('Animation')}
          className={` my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
           hover:bg-white hover:bg-opacity-60
            hover:text-nfRed ${selectedGenres.includes('Animation') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Animation
        </button>
        <button
          onClick={() => clickOnGenre('Comedy')}
          className={`mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500  
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Comedy') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Comedy
        </button>
        <button
          onClick={() => clickOnGenre('Crime')}
          className={`mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Crime') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Crime
        </button>
        <button
          onClick={() => clickOnGenre('Documentary')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Documentary') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Documentary
        </button>
        <button
          onClick={() => clickOnGenre('Drama')}
          className={`mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500 
             hover:bg-white hover:bg-opacity-60
              hover:text-nfRed ${selectedGenres.includes('Drama') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Drama
        </button>
        <button
          onClick={() => clickOnGenre('Family')}
          className={`mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Family') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Family
        </button>
        <button
          onClick={() => clickOnGenre('Fantasy')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
           hover:bg-white hover:bg-opacity-60
            hover:text-nfRed ${selectedGenres.includes('Fantasy') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Fantasy
        </button>
        <button
          onClick={() => clickOnGenre('History')}
          className={`mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500  
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('History') ? 'scale-125 !text-nfRed' : ''}`}
        >
          History
        </button>
        <button
          onClick={() => clickOnGenre('Horror')}
          className={`mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500
             hover:bg-white hover:bg-opacity-60
              hover:text-nfRed ${selectedGenres.includes('Horror') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Horror
        </button>
        <button
          onClick={() => clickOnGenre('Music')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500
            hover:bg-white hover:bg-opacity-60 
            hover:text-nfRed ${selectedGenres.includes('Music') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Music
        </button>
        <button
          onClick={() => clickOnGenre('Mystery')}
          className={` mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500  
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Mystery') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Mystery
        </button>
        <button
          onClick={() => clickOnGenre('Romance')}
          className={` mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Romance') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Romance
        </button>
        <button
          onClick={() => clickOnGenre('Science Fiction')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
           hover:bg-white hover:bg-opacity-60
            hover:text-nfRed ${selectedGenres.includes('Science Fiction') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Science Fiction
        </button>
        <button
          onClick={() => clickOnGenre('TV Movie')}
          className={`mx-1 my-1 rounded-lg   bg-opacity-0  px-1 py-1 text-xs font-bold text-white duration-500 
             hover:bg-white hover:bg-opacity-60 
             hover:text-nfRed ${selectedGenres.includes('TV Movie') ? 'scale-125 !text-nfRed' : ''}`}
        >
          TV Movie
        </button>
        <button
          onClick={() => clickOnGenre('Thriller')}
          className={` mx-1 my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500  
           hover:bg-white hover:bg-opacity-60
            hover:text-nfRed ${selectedGenres.includes('Thriller') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Thriller
        </button>
        <button
          onClick={() => clickOnGenre('War')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500 
           hover:bg-white hover:bg-opacity-60
            hover:text-nfRed ${selectedGenres.includes('War') ? 'scale-125 !text-nfRed' : ''}`}
        >
          War
        </button>
        <button
          onClick={() => clickOnGenre('Western')}
          className={`my-1 rounded-lg  bg-opacity-0 px-1 py-1 text-xs font-bold text-white duration-500
            hover:bg-white hover:bg-opacity-60
             hover:text-nfRed ${selectedGenres.includes('Western') ? 'scale-125 !text-nfRed' : ''}`}
        >
          Western
        </button>
      </div>
      <button className=" mt-2 w-[60%]    border-[1px] bg-nfRed p-3 font-truculenta text-base font-bold  text-white duration-700 hover:scale-110  hover:bg-opacity-80">
        Apply Filter
      </button>
      {/* <span className="z-[100]">
        <Toaster
          position="top-center"
          className="z-50"
          reverseOrder={false}
          autoClose={1000}
          draggablePercent={60}
          width
        />
      </span> */}
    </>
  );
}

export default GenresFilter;
