import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  form {
    padding: 0rem 40rem;
    div {
      display: grid;
      grid-template: auto / 1fr 1fr 1fr 1fr;
      grid-gap: 2rem;
      background: white;
      padding: 2rem 0.5rem;
      label {
        grid-column: 1/2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input {
        grid-column: 3/5;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button {
        grid-column: 2/4;
      }
    }
  }
`;

const initial = {
  title: "",
  director: "",
  metascore: "",
};

export default (props) => {
  const { id } = useParams();
  const { push } = useHistory();

  const initialFormValues =
    props.movies.find((m) => m.id.toString() === id.toString()) || initial;

  const [movie, setMovie] = useState(initialFormValues);

  useEffect(() => {
    setMovie(initialFormValues);
  }, [initialFormValues]);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        ...movie,
        id: parseInt(movie.id),
      })
      .then((res) => {
        props.shouldUpdate();
        push("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
          />
          <label htmlFor="metascore">Metascore</label>
          <input
            type="number"
            min="0"
            max="100"
            id="metascore"
            name="metascore"
            value={movie.metascore}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </Container>
  );
};
