import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../Redux/movieSlice';
import { Link } from 'react-router-dom';
import GenreSelection from './GenreSelection';

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    console.log('movies=>', movies);
   
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchMovies());
      }
    }, [status, dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  return (
    
    <div>
        <div>
            <GenreSelection/>
        
        </div>

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
