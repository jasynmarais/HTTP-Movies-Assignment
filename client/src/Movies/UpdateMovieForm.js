import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormValues = { title: '', director: '', metascore: '', stars: [] };

const UpdateMovieForm = props => {
    const [movieForm, setMovieForm] = useState(initialFormValues);

    useEffect(() => {
        movieToEdit();
    }, []);

const movieToEdit = () => {
    const id = props.match.params.id;
    const movieMatch = props.movies.find(movie => movie.id.toString() === id);

    if (movieMatch) {
        setMovieForm(movieMatch);
    }
};

const handleMovieInputChange = e => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
};

const handleStarsInputChange = (e, index) => {
    const updatedStars = movieForm.stars.map((star, i) => {
        if (i === index) {
            return e.target.value;
        }
        return star;
    });
    setMovieForm({
        ...movieForm,
        stars: updatedStars
    });
};

const handleSubmit = e => {
    e.preventDefault();

    axios
     .put(`http://localhost:5000/api/movies/${movieForm.id}`, movieForm)
     .then(res => {
         props.updateMovies(res.data);
         setMovieForm(initialFormValues);
         props.history.push(`/`);
     })
     .catch(err => console.log(err));
};

return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={handleMovieInputChange}
          value={movieForm.title}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          onChange={handleMovieInputChange}
          value={movieForm.director}
        />
        <input
          type='text'
          name='metascore'
          placeholder='Metascore'
          onChange={handleMovieInputChange}
          value={movieForm.metascore}
        />
        {movieForm.stars.map((star, i) => (
            <input
                type='text'
                name='stars'
                placeholder='Stars'
                onChange={e => handleStarsInputChange(e, i)}
                value={star}
                />
        ))}
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
