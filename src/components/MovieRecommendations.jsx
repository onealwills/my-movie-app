import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredMovies } from '../Redux/Selector/selector';
import { fetchMovies } from '../Redux/movieSlice';



const MovieRecommendations = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);


  console.log('movies', movies)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-recommendations">
      <h2>Movie Recommendations</h2>
      <div className="movies">
        {movies?.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
