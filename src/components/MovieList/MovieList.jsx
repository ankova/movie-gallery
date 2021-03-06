import React, {useEffect, useState} from 'react';

import './MovieList.css';

const MovieList = (props) => {
    let [movies, setMovieList] = useState([]);

    useEffect(() => setMovieList(props.movies))

    return (
        <div className="movie-list">
            <ul>
                {movies && movies.map(movie => 
                    <li key={movie.id}>
                        <div>
                            <h3>{movie.original_title}</h3>
                            <div className="genres">
                                {movie.genres.map((genre,i) => <h6 key={i}>{genre}</h6> )}
                            </div>
                            <img src={movie.poster_path} alt={movie.title} />
                        </div>
                    </li> 
                )}
            </ul>
        </div>
    );
}

export default MovieList;