import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    setShouldUpdate(false);
  }, [shouldUpdate]);

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route path="/movies/:id">
          <Movie
            addToSavedList={addToSavedList}
            shouldUpdate={() => setShouldUpdate(true)}
          />
        </Route>
        <Route path="/add">
          <AddMovie shouldUpdate={() => setShouldUpdate(true)} />
        </Route>
        <Route path="/update-movie/:id">
          <UpdateMovie
            movies={movieList}
            shouldUpdate={() => setShouldUpdate(true)}
          />
        </Route>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
