import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, toggleGenreSelection } from '../Redux/genreSlice';
import { fetchMoviesByGenres, setSelectedGenres } from '../Redux/movieSlice';

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
  
    // const handleGenreClick = (genreId) => {
    //   dispatch(toggleGenreSelection(genreId));
    // };

    const handleGenreChange = (e) => {
        const value = e.target.value;
        const newSelectedGenres = selectedGenres.includes(value)
            ? selectedGenres.filter((genre) => genre !== value)
            : [...selectedGenres, value];

        dispatch(setSelectedGenres(newSelectedGenres));
        dispatch(fetchMoviesByGenres());
    };
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }


  return (
    <div>
    {/* <h2>Select Your Favorite Genres</h2>
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
      </ul> */}
      <h2>Select Genres</h2>
        {genres?.map((genre) => (
            <div key={genre.id}>
                <input
                    type="checkbox"
                    value={genre.id}
                    checked={selectedGenres.includes(genre.id)}
                    onChange={handleGenreChange}
                />
                <label>{genre.name}</label>
            </div>
        ))}
    </div>
  )
}

export default GenreSelection
