import './App.css';
import { useEffect } from 'react';
import { fetchMovies } from './Redux/movieSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import MovieList from './pages/MovieList.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import MovieRecommendations from './pages/MovieRecommendations.jsx';


function App() {
const dispatch = useDispatch();
const { movies, status, error } = useSelector((state) => state.movies);


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
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/recommendations" element={<MovieRecommendations />} />
        <Route path="/movie/:id" element={<MovieDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
