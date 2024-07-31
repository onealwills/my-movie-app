import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice.js';





export const store = configureStore({
    reducer:{
        movies: movieReducer
    }
})