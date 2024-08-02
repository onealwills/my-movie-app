import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../Redux/genreSlice';
import { setSelectedGenres, fetchMoviesByGenres } from '../Redux/movieSlice';

const GenreSelection = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres.genres);
    const selectedGenres = useSelector((state) => state.movies.selectedGenres);
    const status = useSelector((state) => state.genres.status);
    const error = useSelector((state) => state.genres.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGenres());
        }
    }, [status, dispatch]);


    const handleGenreChange = (genreId) => {
        const newSelectedGenres = selectedGenres.includes(genreId)
        ? selectedGenres.filter((genre) => genre !== genreId)
        : [...selectedGenres, genreId];
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
            <h2>Select Genres</h2>
            <div className='flex'>
                {genres?.map((genre) => (
                    <div className='border-2 border-yellow-500 w-[120px]' key={genre.id}>
                        <button
                        className={`bg-gray-800 text-white py-2 px-4 rounded w-[100px] ${
                            selectedGenres.includes(genre.id) ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleGenreChange(genre.id)}
                        >
                        {genre.name}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default GenreSelection;
