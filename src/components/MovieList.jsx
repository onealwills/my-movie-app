import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByGenres } from '../Redux/movieSlice';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);
    const selectedGenres = useSelector((state) => state.movies.selectedGenres);

    console.log('movies=>', movies);
    console.log('selected genres=>', selectedGenres);
   
    useEffect(() => {
        if (status === 'idle') {
            if (selectedGenres.length > 0) {
                dispatch(fetchMoviesByGenres());
            } else {
                dispatch(fetchMovies());
            }
        }
    }, [status, dispatch, selectedGenres]);

  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  return (
    
    <div>
       {movies?.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
      ))}
      
    </div>
  )
}

export default MovieList
