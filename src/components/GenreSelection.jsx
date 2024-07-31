import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, toggleGenreSelection } from '../Redux/genreSlice';

const GenreSelection = () => {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres.genres);
    const selectedGenres = useSelector((state) => state.genres.selectedGenres);
    const status = useSelector((state) => state.genres.status);
    const error = useSelector((state) => state.genres.status);


    console.log('genres=>', genres);
    console.log('selected genres=>',selectedGenres);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchGenres());
      }
    }, [status, dispatch]);
  
    const handleGenreClick = (genreId) => {
      dispatch(toggleGenreSelection(genreId));
    };
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }


  return (
    <div>
    <h2>Select Your Favorite Genres</h2>
      <ul>
        {genres?.map((genre) => (
          <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              readOnly
            />
            {genre.name}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default GenreSelection
