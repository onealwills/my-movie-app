import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const api_key = process.env.REACT_APP_API_KEY;


const initialState = {
    movies: [],
    status: 'idle', // or 'loading' | 'succeeded' | 'failed'
    error: null
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
  

  


// Create a slice of the store
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
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
        });
    },
  });

 

  export default moviesSlice.reducer;