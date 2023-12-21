import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddMovie() {
  const movie_name_ref = useRef();
  const movie_rating_ref = useRef();
  const movie_desc_ref = useRef();
  const navigate = useNavigate();

  const addmoviehandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movie_name_ref.current.value,
      rating: movie_rating_ref.current.value,
      description: movie_desc_ref.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Please check your Internet connection");
      }
    }
  };

  return (
    <>
      <Link to={"/"}>Home</Link>
      <h2>Movie Details</h2>
      <br />
      <form onSubmit={addmoviehandler}>
        Movie Name: <br />
        <input
          type="text"
          placeholder="Enter movie name"
          required
          id="movie_name"
          ref={movie_name_ref}
        />
        <br />
        <br />
        Movie Rating: <br />
        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Enter movie rating"
          ref={movie_rating_ref}
          required
        />
        <br />
        <br />
        Description: <br />
        <textarea
          name="desc"
          id=""
          cols="30"
          rows="10"
          placeholder="Enter movie Description"
          ref={movie_desc_ref}
        ></textarea>
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
