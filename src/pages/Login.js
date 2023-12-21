import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email_ref = useRef();
  const pass_ref = useRef();
  const navigate = useNavigate();

  const loginhandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email_ref.current.value,
      password: pass_ref.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData
      );
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      if (response.data.status === "success") {
        alert("Logged in Successfully");
        navigate("/");
      }
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
      Login:
      <form onSubmit={loginhandler}>
        Email: <br />
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          ref={email_ref}
        />{" "}
        <br />
        Password: <br />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          ref={pass_ref}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
