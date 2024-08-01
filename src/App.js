import './App.css';
import { useEffect } from 'react';
import { fetchMovies } from './Redux/movieSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import MovieRecommendations from './components/MovieRecommendations.jsx';
import MovieList from './components/MovieList.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
