import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

function Movie({ addToSavedList, ...props }) {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const history = useHistory();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />

            <div className="save-button" onClick={saveMovie}>
                Save
            </div>
            <Link className="update-button" to={`/update-movie/${params.id}`}>
                Update
            </Link>
            <button
                className="delete-button"
                onClick={async () => {
                    try {
                        const response = await axios.delete(
                            `http://localhost:5000/api/movies/${params.id}`,
                        );
                        history.push('/');
                    } catch (e) {
                        console.log(e);
                    }
                }}>
                Delete
            </button>
        </div>
    );
}

export default Movie;
