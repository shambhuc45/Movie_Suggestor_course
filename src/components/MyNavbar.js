import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyNavbar() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Movie Suggester</Navbar.Brand>
          
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to={`/add_movie/`}>Add a Movie</Link>
            </Navbar.Text>
            <Navbar.Text>
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to={`/profile`}>Profile</Link>
                </>
              ) : (
                <>
                  <Link to={`/login`}>Login</Link>
                </>
              )}
            </Navbar.Text>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
