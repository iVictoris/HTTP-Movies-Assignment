import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function MovieList() {
    const [movieList, setMovieList] = useState([]);

    const getMovieList = () => {
        axios
            .get('http://localhost:5000/api/movies')
            .then((res) => setMovieList(res.data))
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        getMovieList();
    }, []);
    return (
        <div className="movie-list">
            {movieList.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            ))}
        </div>
    );
}

export default MovieList;
