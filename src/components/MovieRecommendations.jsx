import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesByGenres } from '../Redux/movieSlice';




const MovieRecommendations = () => {
  const dispatch = useDispatch();
  const genreMovies = useSelector((state) => state.movies.genreMovies);
  const selectedGenres = useSelector((state) => state.movies.selectedGenres);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  console.log('movie recommendation=>', genreMovies)

  useEffect(() => {
    if (status === 'idle' && selectedGenres.length > 0) {
      dispatch(fetchMoviesByGenres());
    }
  }, [status, selectedGenres, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (genreMovies.length === 0) return <div>No movie recommendations found.</div>;

  return (
    <div className="movie-recommendations">
      <h2>Movie Recommendations</h2>
      <div className="movies">
      {genreMovies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
