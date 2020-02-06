import axios from 'axios';

//genres
//https://api.themoviedb.org/3/genre/movie/list?api_key=89c84ad4507eac89b10fd0706f10f092&language=en-US
//image api
//https://api.themoviedb.org/3/configuration?api_key=89c84ad4507eac89b10fd0706f10f092


const getNowPlayingMovies = () => {
    axios.get('https://api.themoviedb.org/3/movie/550?api_key=89c84ad4507eac89b10fd0706f10f092')
    .then((response) =>  response)
  }

  export {getNowPlayingMovies};