import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [userData, setuserdata] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );

      setuserdata(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Please check your Internet connection");
      }
    }
  };

  const logouthandler = () => {
    localStorage.removeItem("accessToken");
    alert("Logout Successfully");
    navigate("/");
  };
  return (
    <>
      <Link to={`/`}> Home</Link> <br />
      <br />
      Name: {userData.name} <br />
      Email: {userData.email} <br />
      Country: {userData.country} <br />
      <button onClick={logouthandler}>Logout</button>
    </>
  );
}
