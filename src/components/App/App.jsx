import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import MovieList from '../MovieList';
import Checkbox from '../Checkbox';
import Rating from '../Rating';

const App = () => {
  const [movies, setMovies] = useState([]); 
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState([]);

  useEffect(() => {
    //Fetch all genres and set to state
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=89c84ad4507eac89b10fd0706f10f092&language=en-US?')
    .then(response => {
      if(response.status === 200) {
      return response.data;
    }})
    .then(response => {
      const genres = response.genres;
      setGenres(genres)

      //Fetch all now playing movies
      axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=89c84ad4507eac89b10fd0706f10f092&language=en-US&page=1')
      .then(response => {
        if(response.status === 200) {
        return response.data;
      }})
      .then(response => {
            let results = response.results.map(movie =>
                ({ 
                  ...movie,  
                  poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, //adds full path to poster image
                  //filters all genres by id and adds them to the movie object as a new property
                  genres: genres
                    .filter(genre => movie.genre_ids.indexOf(genre.id) !== -1 )
                    .map(genre => genre.name)
                })
              )
              
            return (results) //returns the modified object
          })
          
      .then(results => setMovies(results)) // adds the modified object to the state
      .catch(error => {console.log(error.message)}) // can be modified to point to an error page if such

    })
    .catch(error => {console.log(error.message)})

  }, []);

  useEffect(() => {
    // sets filtered by genre movies to the state
    setFilteredMovies(
      movies.filter(m => {
        for(let i=0; i<selectedGenres.length; i++){
          const genre = selectedGenres[i];
          if(m.genre_ids.indexOf(genre.id) === -1) {
            return false;
          }
        }
        return true;
      })
      .filter(m => m.vote_average >= minRating) //filter by rating
      .sort((a, b) => b.popularity - a.popularity) // sorts by popularity
    );
  }, [movies, selectedGenres, minRating]); // initial state

  //Filters by genre on checkbox change
  const handleSelectGenre = (event, genre) => { 
    if(event.target.checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id))
    }
  }

  //Filters by rating
  const handleRatingChange = (rating) => {
    setMinRating(rating);
  }

    return ( 
      <div className="App">
        <div className="App-header">
          <h2>Playing Movies</h2>
        </div>

        <div className="movie-genres">
          {genres.map(genre => 
            <Checkbox key={genre.id} name={genre.name} onChange={e => handleSelectGenre(e, genre)} />)}
        </div>
         
        <Rating onChange={handleRatingChange} />

        <MovieList movies={filteredMovies} />
        
      </div>
    );
  }

export default App;
