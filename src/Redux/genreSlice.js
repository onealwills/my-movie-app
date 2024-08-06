import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const access_token = process.env.REACT_APP_ACCESS_TOKEN;

const initialState = {
  genres: [],
  selectedGenres: [],
  status: 'idle',
  error: null
};

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });
    const data = await response.json();
    console.log('Fetched genres data:', data);
    console.log("bearer token",process.env.REACT_APP_BEARER_TOKEN);
    return data.genres; 
  }
);



const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    toggleGenreSelection: (state, action) => {
      const genreId = action.payload;
      if (state.selectedGenres.includes(genreId)) {
        state.selectedGenres = state.selectedGenres.filter(id => id !== genreId);
      } else {
        state.selectedGenres.push(genreId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleGenreSelection } = genresSlice.actions;

export default genresSlice.reducer;
