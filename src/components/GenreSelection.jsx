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
    );
};

export default GenreSelection;
