import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesByGenres } from '../Redux/movieSlice';
import MovieCard from '../components/MovieCard';
// import { selectFilteredMovies } from '../Redux/Selector/selector';
// import { fetchMovies } from '../Redux/movieSlice';



const MovieRecommendations = () => {
  const dispatch = useDispatch();
  const { movies: movieList, status: fetchStatus, error: fetchError } = useSelector((state) => state.movies);
  const selectedGenres = useSelector((state) => state.movies.selectedGenres);
    const status = useSelector((state) => state.genres.status);
    const error = useSelector((state) => state.genres.error);

  
  console.log('select genres for recommendation>>', selectedGenres)

  useEffect(() => {
    if (status === 'idle' && selectedGenres.length > 0) {
      dispatch(fetchMoviesByGenres());
    }
  }, [status, selectedGenres, dispatch]);

  const recommendedMovies = movieList.filter((movie) =>
    movie.genre_ids.some((genre) => selectedGenres?.includes(genre))
  );

 
  if (recommendedMovies.length === 0) return <div>No movie recommendations found.</div>;

  return (
    <div className="bg-gray-800">
      <h2 className='text-yellow-200 text-3xl font-bold mb-4'>Movie Recommendations</h2>
      <div className="w-full h-full flex flex-wrap px-7 gap-2">
      {recommendedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
