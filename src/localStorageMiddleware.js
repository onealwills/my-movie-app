// src/Redux/localStorageMiddleware.js

export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (['movies/setSelectedGenres', 'movies/fetchMovies/fulfilled', 'movies/fetchMoviesByGenres/fulfilled'].includes(action.type)) {
    const state = store.getState();
    localStorage.setItem('selectedGenres', JSON.stringify(state.movies.selectedGenres));
    localStorage.setItem('movies', JSON.stringify(state.movies.movies));
    localStorage.setItem('genreMovies', JSON.stringify(state.movies.genreMovies));
  }
  
  return result;
};

export const loadState = () => {
  try {
    const selectedGenres = JSON.parse(localStorage.getItem('selectedGenres')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const genreMovies = JSON.parse(localStorage.getItem('genreMovies')) || [];
    return { selectedGenres, movies, genreMovies };
  } catch (err) {
    return { selectedGenres: [], movies: [], genreMovies: [] };
  }
};
