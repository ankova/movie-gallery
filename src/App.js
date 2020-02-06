import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import MovieList from './components/MovieList/MovieList';
import Checkbox from './components/Checkbox/Checkbox';
import Rating from './components/Rating';

const App = () => {
  const [movies, setMovies] = useState([]); 
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=89c84ad4507eac89b10fd0706f10f092&language=en-US?')
    .then(response => {
      const genres = response.data.genres;
      setGenres(genres)

      axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=89c84ad4507eac89b10fd0706f10f092&language=en-US&page=1')
      .then(response => {
            let results = response.data.results.map(movie =>
                ({ 
                  ...movie,  
                  poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  genres: genres
                    .filter(genre => movie.genre_ids.indexOf(genre.id) !== -1 )
                    .map(genre => genre.name)
                })
              )
              
            return (results)
          })
          
      .then(results => setMovies(results))
      .catch(error => {console.log(error.message)})

    })
    .catch(error => {console.log(error.message)})

  }, []);

  useEffect(() => {
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
      .filter(m => m.vote_average >= minRating)
      .sort((a, b) => b.popularity - a.popularity)
    );
  }, [movies, selectedGenres, minRating]);

  const handleSelectGenre = (event, genre) => {
    if(event.target.checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id))
    }
  }

  const handleRatingChange = (rating) => {
    setMinRating(rating);
  }

    return ( 
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>

        <div>
          {genres.map(genre => 
            <Checkbox key={genre.id} name={genre.name} onChange={e => handleSelectGenre(e, genre)} />)}
        </div>
         
        <Rating onChange={handleRatingChange} />

        <div>
          <MovieList movies={filteredMovies} />
        </div>
        
      </div>
    );
  }

export default App;