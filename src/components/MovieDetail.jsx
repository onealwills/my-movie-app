import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../Redux/movieSlice';

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector((state) => state.movies.movieDetails);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        if (id && status === 'idle') {
          dispatch(fetchMovieDetails(id));
        }
      }, [dispatch, id, status]);
    
      useEffect(() => {
        console.log("Movie details in component:", movieDetails);
      }, [movieDetails]);
    
      if (status === 'loading') return <div>Loading...</div>;
      if (status === 'failed') return <div>Error: {error}</div>;
    
  return (
    <div>
    {movieDetails ? (
      <div>
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <p>Runtime: {movieDetails.runtime} minutes</p>
        <p>Average Rating: {movieDetails.vote_average}</p>
        <p>Release Date: {movieDetails.release_date}</p>
        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
      </div>
    ) : (
      <div>No movie details found</div>
    )}
  </div>
  )
}

export default MovieDetail
