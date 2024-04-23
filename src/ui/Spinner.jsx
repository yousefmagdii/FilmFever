import React from 'react';

const FilmReelSpinner = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#141414]">
      <svg
        className="h-16 w-16 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          className="opacity-25"
          fill="#fff"
          d="M12 0c-1.63 0-3.19.36-4.58 1.01L6.33 3.03 3 2.8C1.34 2.66 0 3.84 0 5.4V19.5c0 1.66 1.34 3 3 3h18c1.66 0 3-1.34 3-3V5.4c0-1.56-1.34-2.74-3-2.6L17.67 3l-1.08-2.02C15.19.36 13.63 0 12 0zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
        ></path>
        <path
          className="opacity-75"
          fill="#fff"
          d="M21 6.52V4.5c0-.83-.67-1.5-1.5-1.5h-5.69c-.32-1.21-1.44-2.04-2.69-1.82l-2.63.54C8.45 2.84 8 3.58 8 4.36V6.5H5.5C4.67 6.5 4 7.17 4 8v10c0 .83.67 1.5 1.5 1.5H8v2c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2h2.5c.83 0 1.5-.67 1.5-1.5v-10c0-.77-.57-1.42-1.31-1.48l-.63-.03c1.25-.22 2.37.61 2.69 1.82H21zm-2 13h-6v2h6v-2zm0-16h-6V4.36c0-.49.25-.94.67-1.2l2.63-.54c.25-.05.51.02.72.2.18.15.27.38.25.61V6.5h3.5zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        ></path>
      </svg>
    </div>
  );
};

export default FilmReelSpinner;
