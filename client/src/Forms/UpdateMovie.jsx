import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

export default ({ ...props }) => {
    const [movie, setMovie] = useState({});
    const match = useRouteMatch();
    const history = useHistory();
    const { handleSubmit, register, errors, reset } = useForm();
    const onSubmit = async (values) => {
        const movieChanges = {
            ...values,
            ...movie,
        };
        try {
            // send to BE
            // @ /api/movies/:id
            const response = await axios.put(
                `http://localhost:5000/api/movies/${match.params.id}`,
                movieChanges,
            );
            history.push(`/movies/${response.data.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    // match.parms.id => update-movie/:id
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const {
                    data: { metascore, title, director, ...data },
                } = await axios.get(
                    `http://localhost:5000/api/movies/${match.params.id}`,
                );
                setMovie(data); // holds id, stars, other unused
                reset({ title, director, metascore });
            } catch (e) {
                console.log(e);
            }
        };

        fetchMovie();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="title"
                ref={register({
                    required: 'Required',
                })}
            />

            <input
                name="director"
                ref={register({
                    required: 'Required',
                })}
            />
            <input
                name="metascore"
                ref={register({
                    required: 'Required',
                })}
            />

            <button type="submit">Update</button>
        </form>
    );
};
