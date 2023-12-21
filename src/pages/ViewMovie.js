import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewMovie() {
  const getParams = useParams();
  const getId = getParams.id;

  const [movieData, setMovieData] = useState({});

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      {/* <button onClick={getMovieData}>View movie Data</button> */}

      <div className="movie_data">
        <strong>Movie Data</strong>
        <br /> Name:{movieData.name}
        <br />
        <br /> Information:{movieData.info}
        <br />
        <br /> Description:{movieData.desc}
        <br />
        <br />
        <br />
        <img src={movieData.image} alt="MovieImage" />
        <br />
        <br /> Rating:{movieData.rating}
      </div>
    </>
  );
}
