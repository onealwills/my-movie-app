import './App.css';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { fetchMovies } from './Redux/movieSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import MovieRecommendations from './components/MovieRecommendations.jsx';
import MovieList from './components/MovieList.jsx';
import GenreSelection from './components/GenreSelection.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
const dispatch = useDispatch();
const { movies, status, error } = useSelector((state) => state.movies);


console.log("env", process.env.REACT_APP_API_KEY);

console.log("bearer token",process.env.REACT_APP_ACCESS_TOKEN);

useEffect(()=>{
    if (status === 'idle') {
        dispatch(fetchMovies()); // Dispatch the async thunk
        }

},[dispatch, status])


useEffect(() => {
    console.log('Current Redux state:', { movies, status, error });
  }, [movies, status, error]);



  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  return (
    // <div className="App">
    //   <h1 className='bg-red-700'>Hello world</h1>
    //   <HomePage/>
    //   <GenreSelection/>
    //   <MovieRecommendations/>
    //   <MovieList/>
    //   <GenreSelection/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/recommendations" element={<MovieRecommendations />} />
        <Route path="/movie/:id" element={<MovieDetail/>} />
      </Routes>
      <GenreSelection/>
    </Router>
  );
}

export default App;
