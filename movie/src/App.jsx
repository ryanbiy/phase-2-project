import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
import AddFavourites from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavorites';

const App = () => {
  // State hooks for storing movies, search input value, and favourite movies
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  // Effect hook for fetching movies from the API when search input value changes
  useEffect(() => {
    const fetchMovies = async () => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b76cd05d`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    };
    fetchMovies();
  }, [searchValue]);

  // Event handler for updating search input value
  const handleSearchInputChanges = (event) => {
    setSearchValue(event.target.value);
  };

  // Event handler for resetting search input value
  const resetInputField = () => {
    setSearchValue('');
  };

  // Event handler for adding a movie to favourites
  const saveToFavourites = (movie) => {
    const newFavourites = [...favourites, movie];
    setFavourites(newFavourites);
  };

  // Event handler for removing a movie from favourites
  const removeFromFavourites = (movie) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavourites);
  };

  // Render method for the App component
  return (
    <div>
      {/* App heading */}
      <h1 id='head'>Wetto Streams</h1>
      {/* Main movie app container */}
      <div className="movie-app">
        {/* Search box container */}
        <div className="search-box-container">
          <SearchBox
            value={searchValue}
            onInputChange={handleSearchInputChanges}
            onReset={resetInputField}
            setSearchValue={setSearchValue}
          />
        </div>
        {/* Movie list container */}
        <div className="movie-list-container">
          {/* Movie list heading */}
          <MovieListHeading heading="Movies" />
          {/* Movie list component */}
          <MovieList
            movies={movies}
            favouriteComponent={AddFavourites}
            handleFavouritesClick={saveToFavourites}
          />
        </div>
        {/* Favourites list container */}
        <div className="favourites-list-container">
          {/* Favourites list heading */}
          <MovieListHeading heading="Favourites" />
          {/* Favourites list component */}
          <MovieList
            movies={favourites}
            favouriteComponent={RemoveFavourites}
            handleFavouritesClick={removeFromFavourites}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
