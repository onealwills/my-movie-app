import { createSelector } from '@reduxjs/toolkit';

const selectMovies = (state) => state.movies.data;
const selectSelectedGenres = (state) => state.genres.selected;

export const selectFilteredMovies = createSelector(
  [selectMovies, selectSelectedGenres],
  (movies, selectedGenres) => {
    if (selectedGenres.length === 0) return movies;
    return movies?.filter((movie) =>
      movie.genre_ids.some((genre) => selectedGenres.includes(genre))
    );
  }
);
