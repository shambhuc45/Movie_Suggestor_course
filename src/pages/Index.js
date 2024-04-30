import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchText}`
      );
      const moviesData = response.data.moviesData;
      setMovies(moviesData);
      setIsError(false);
      setIsLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorMsg("Cannot fetch data. Please check your internet connection");
      setIsLoading(false);
      setFirstRun(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchText.length > 2) {
          fetchMovies();
          setSearchError("");
        } else if (searchText.length < 1) {
          fetchMovies();
          setSearchError("");
        } else {
          setSearchError("Enter at least 3 Characters!!");
        }
      }, 2000);

      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchText]);
  return (
    <>
      <div className="navbar">
        <h3>Suggested Movies</h3>
        <input
          type="text"
          value={searchText}
          placeholder="Enter Movie Name Here"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <br />
        <span style={{ color: "red" }}>{searchError}</span>
      </div>

      {isError ? (
        <>
          <div style={{ color: "red" }}>{errorMsg}</div>
        </>
      ) : (
        <>
          <div style={{ background: "e7e7e7", padding: "10px" }}>
            <div>{isLoading ? <>Loading.....</> : <></>}</div>
            {!isLoading && movies.length < 1 ? (
              <>Movies not Found!!</>
            ) : (
              <>
                {movies.map((el) => (
                  <div key={el.id}>
                    <Link to={`/view_movie/${el.id}`}>
                      <strong>{el.name}</strong>
                    </Link>
                    <br />
                    <img
                      src={el.image}
                      alt="Movie ImageLoading.."
                      style={{ width: "100px" }}
                    />
                    <p>Info : {el.info}</p>
                    <p>Rating: {el.rating}</p>
                    <br />
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
