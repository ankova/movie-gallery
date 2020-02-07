import React, {useEffect, useState, Fragment} from 'react';

const MovieList = (props) => {
    let [movieList, setMovieList] = useState([]);
    let movies = movieList;

    useEffect(() => setMovieList(props.movies))

    return (
        <div>
            <ul>
                {movies && movies.map(movie => 
                    <li key={movie.id}>
                        <h3>{movie.original_title}</h3>
                        {movie.genres.map((genre,i) => <h6 key={i}>{genre}</h6> )}
                        <img src={movie.poster_path} />
                    </li> 
                )}
            </ul>
        </div>
    );
}

export default MovieList;