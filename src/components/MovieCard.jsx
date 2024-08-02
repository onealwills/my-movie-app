import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({movie}) => {
  return (
    <div className='w-72  border-2 border-black'>
        <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
                <h2 className='border-2 border-green-800'>{movie.title}</h2>
            </Link>
        {/* <p className='border-2 border-red-600'>{movie.overview}</p> */}
        <img className='w-[300px] h-[500px]' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
    </div>
  )
}

export default MovieCard
