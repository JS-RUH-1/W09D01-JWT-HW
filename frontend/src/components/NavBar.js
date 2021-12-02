import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./components.css";
import userStatus from "./userStatus";

function NavBar() {
  let { auth, setAuth } = useContext(userStatus);
  function getCookie(cname) {
    var arrayb = document.cookie.split(";");
    for (const item of arrayb) {
      if (item.startsWith("jwt=")) {
        return item.substr(4);
      }
    }
  }
  let token = getCookie("jwt");
  setAuth(token === undefined ? false : true);
  console.log(auth);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              height="40px"
              width="40px"
              alt="logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzPr7OgLjPAZ-GeJAZPv4KTAHcTEtWFljSw&usqp=CAU"
            ></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex ">
            <Link className="Link_Nav" to="/AuthorsPage">
              Authors
            </Link>
            <Link className="Link_Nav" to="/BooksPage">
              Books
            </Link>
            {!auth ? (
              <Link className="Link_Nav" to="/Signup">
                Signup
              </Link>
            ) : null}
            {!auth ? (
              <Link className="Link_Nav" to="/Signin">
                signin
              </Link>
            ) : null}
            {auth ? (
              <Button
                variant="danger"
                onClick={() => {
                  axios
                    .get("/authors/signout")
                    .then((res) => {
                      console.log(res);
                      setAuth(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                signout
              </Button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
