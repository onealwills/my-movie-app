import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice.js';
import genreReducer from "./genreSlice.js";





export const store = configureStore({
    reducer:{
        movies: movieReducer,
        genres: genreReducer,
    }
})