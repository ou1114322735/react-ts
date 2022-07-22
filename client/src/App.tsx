import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import AddMovie from './pages/movies/AddMovie';
import EditMovie from './pages/movies/EditMovie';
import MovieList from './pages/movies/MovieList';
import { store } from './redux/store';

const App:React.FC = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='add' element={<AddMovie/>}></Route>
      <Route path='edit/:id' element={<EditMovie/>} ></Route>
      <Route path='list' element={<MovieList/>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
