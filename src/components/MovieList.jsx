import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByGenres } from '../Redux/movieSlice';
import GenreSelection from './GenreSelection';
import MovieCard from './MovieCard';

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
    
    <div className='bg-gray-800'>
        <nav className='h-[50px] border-2 border-red-700'>
            <ul className='w-full flex justify-between items-center'>
                <li>My movie APP</li>
                <li>Recommendations</li>
            </ul>
        </nav>
        <div>
            <GenreSelection/>
        </div>
        <div>
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}    
        </div>
      
    </div>
  )
}

export default MovieList
