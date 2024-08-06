import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, resetMovieDetails, resetStatus } from '../Redux/movieSlice';

const MovieDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector((state) => state.movies.movieDetails);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);


    console.log('id>>',id)

    useEffect(() => {
      if(status === "idle"){
        dispatch(fetchMovieDetails(id));
      }
      // dispatch(resetMovieDetails());
      // dispatch(resetStatus());
    }, [dispatch, id, status]);
        
    console.log("Movie details in component:", movieDetails);
    
      if (status === 'loading') return <div>Loading...</div>;
      if (status === 'failed') return <div>Error: {error}</div>;
    
  return (
    <div className='bg-gray-800 w-full flex justify-center items-center'>
    {movieDetails ? (
      <div className='w-[500px] mt-8'>
        <div className='w-full flex justify-center items-center  border-3 border-black '>
          <img className='w-[400px] h-[600px]' src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} alt={movieDetails.title} />
        </div>
        <h1 className='text-yellow-200 text-3xl font-bold mb-4 mt-4'>{movieDetails?.title}</h1>
        <p className='text-gray-100 text-lg mb-7'>{movieDetails?.overview}</p>
        <p className='text-gray-100 text-lg mb-1'>Runtime: {movieDetails?.runtime} minutes</p>
        <p className='text-gray-100 text-lg mb-1'>Average Rating: {movieDetails?.vote_average}</p>
        <p className='text-gray-100 text-lg mb-1'>Release Date: {movieDetails?.release_date}</p> 
      </div>
    ) : (
      <div>No movie details found</div>
    )}
  </div>
  )
}

export default MovieDetail
