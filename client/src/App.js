import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5002/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovies = updatedMovie => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie;
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route 
      exactpath='/'
      render={props => <MovieList {...props} movies={movies} />}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path='/update-movie/:id'
        render={props => (
          <UpdateMovieForm
            {...props}
            movies={movies}
            updateMovies={updateMovies}
          />
        )}
      />
    </>
  );
};

export default App;
