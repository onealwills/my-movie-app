import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const api_key = process.env.REACT_APP_API_KEY;


const initialState = {
    movies: [],
    status: 'idle', // or 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedGenres: [],
  };


  // Create an asynchronous thunk for fetching movies
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (page = 1) => {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`);
      const data = await response.json();
      console.log("fetch result", data);
      return data.results; // Adjust this if your API response format is different
    }
  );


  // Thunk to fetch movies based on selected genres
export const fetchMoviesByGenres = createAsyncThunk(
  'movies/fetchMoviesByGenres',
  async (_, { getState }) => {
      const { selectedGenres } = getState().movies;
      const genreString = selectedGenres.join(',');
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreString}`);
      const data = await response.json();
      console.log("fetch movies by genre result", data);
      return data.results;
  }
);


  

  


// Create a slice of the store
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      setSelectedGenres: (state, action) => {
        state.selectedGenres = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchMoviesByGenres.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMoviesByGenres.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.movies = action.payload;
        })
      .addCase(fetchMoviesByGenres.rejected, (state, action) => {
          state.status = 'failed';
      });
    }
  });

 
  export const { setSelectedGenres } = moviesSlice.actions;
  export default moviesSlice.reducer;