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
import { SortPreferencesProvider } from './contexts/SortPreferencesContext';
import TVShow from './features/tvshows/TVShow';
import { SelectedShowsProvider } from './contexts/SelectedShowsContext';
import TVShowInfo from './features/tvshowinfo/TVShowInfo';
import { SelectedTVShowsProvider } from './contexts/SelectedTVShowsContext';

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
      { element: <TVShow />, path: '/tvshows' },
      // { element: <TVInfo />, path: '/tvshowsinfo/:id' },
      { element: <TVShowInfo />, path: '/tvshows/:id' },
      // { element: <TVShowInfo />, path: '/showinfo/:id' },
    ],
  },
]);
function App() {
  return (
    <SortPreferencesProvider>
      <SelectedMoviesProvider>
        <SelectedShowsProvider>
          <SelectedTVShowsProvider>
            <SearchQueryProvider>
              <CurrentPageProvider>
                <RouterProvider router={router} />
              </CurrentPageProvider>
            </SearchQueryProvider>
          </SelectedTVShowsProvider>
        </SelectedShowsProvider>
      </SelectedMoviesProvider>
    </SortPreferencesProvider>
  );
}

export default App;
