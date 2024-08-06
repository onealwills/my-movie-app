import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({movie}) => {
  return (
    <div className='min-w-72 shadow-md'>
        <div key={movie.id}>
          <img className='w-[300px] h-[500px]' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <Link to={`/movie/${movie.id}`}>
              <h2 className='text-gray-400 w-[300px]'>{movie.title ? movie.title : "No title found"}</h2>
          </Link>
          </div>
    </div>
  )
}

export default MovieCard
