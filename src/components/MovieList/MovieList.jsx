import React, {useEffect, useState} from 'react';
import Movie from '../Movie/Movie';

const MovieList = (props) => {
    let [movieList, setMovieList] = useState([]);
    let movies = movieList;

    useEffect(() => setMovieList(props.movies))

    return (
        <div>
            {movies && movies.map(movie => 
                <div key={movie.id}>
                    <p>{movie.original_title}</p>
                    <ul>
                        {movie.genres.map((genre,i) => <li key={i}>{genre}</li>)}
                    </ul>
                    <img src={movie.poster_path} />
                </div>
            )}
        </div>
    );
}

export default MovieList;