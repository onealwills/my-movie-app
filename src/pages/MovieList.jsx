import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByGenres } from '../Redux/movieSlice';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import GenreSelection from '../components/GenreSelection';

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
        <nav className='h-[100px] mb-20'>
            <ul className='w-full h-full flex justify-around items-center'>
                <Link to='/'><li className='text-white'>My movie APP</li></Link>
                <Link to='/recommendations'><li className='text-white'>Recommendations</li></Link>
            </ul>
        </nav>
        <div>
            <GenreSelection/>
        </div>
        <div className='w-full h-full flex flex-wrap px-7 gap-2'>
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}    
        </div>
    </div>
  )
}

export default MovieList
