import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './features/home/Home';
import Movie from './features/movies/Movie';
import List from './features/list/List';
import { SelectedMoviesProvider } from './contexts/SelectedMoviesContext';
import MovieInfo from './features/movieInfo/MovieInfo';
import { CurrentPageProvider } from './contexts/CurrentPageContext';
import { SearchQueryProvider } from './contexts/SearchQueryContext';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { element: <Home />, path: '/' },
      { element: <Movie />, path: '/movies' },
      { element: <List />, path: '/list' },
      { element: <MovieInfo />, path: '/movieinfo/:id' },
      { element: <MovieInfo />, path: '/movies/:id' },
    ],
  },
]);
function App() {
  return (
    <SelectedMoviesProvider>
      <SearchQueryProvider>
        <CurrentPageProvider>
          <RouterProvider router={router} />
        </CurrentPageProvider>
      </SearchQueryProvider>
    </SelectedMoviesProvider>
  );
}

export default App;
