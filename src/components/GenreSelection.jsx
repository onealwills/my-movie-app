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


    console.log('selected genres', selectedGenres)
    console.log('genres', genres)

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
        <div className='flex justify-center items-center mb-14'>
            <div className='w-[700px] flex flex-wrap justify-center items-center'>
                {genres?.map((genre) => (
                    <div key={genre.id}>
                        <button
                            type="button"
                            onClick={() => handleGenreChange(genre.id)}
                            className={`text-white border bg-transparent appearance-none py-2 px-4  hover:bg-white hover:text-black ${
                                selectedGenres.includes(genre.id) ? "bg-gray-800" : ""
                            }`}
                        >
                            {genre.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default GenreSelection
