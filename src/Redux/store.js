import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice.js';
import genreReducer from "./genreSlice.js";
import { localStorageMiddleware } from "../localStorageMiddleware.js";





export const store = configureStore({
    reducer:{
        movies: movieReducer,
        genres: genreReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})