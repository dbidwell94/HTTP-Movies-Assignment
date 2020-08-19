import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  form {
    display: grid;
    grid-template: auto / repeat(6, 1fr);
    grid-gap: 2rem;
    label {
      grid-column: 1 / 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      grid-column: 4 / 7;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    button {
      grid-column: 2 / 6;
    }
  }
`;

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
};

export default (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { push } = useHistory();

  function handleUpdate(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", {
        ...formValues,
        stars: ["Joe Dirt", "Spongebob"],
        id: uuid(),
      })
      .then((res) => {
        props.shouldUpdate();
        push(`/`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Movie Title"
          value={formValues.name}
          onChange={handleUpdate}
          name="title"
          id="title"
        />
        <label htmlFor="director">Director</label>
        <input
          placeholder="Movie Director"
          value={formValues.director}
          onChange={handleUpdate}
          name="director"
          id="director"
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0 - 100"
          value={formValues.metascore}
          onChange={handleUpdate}
          name="metascore"
          id="metascore"
        />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};
