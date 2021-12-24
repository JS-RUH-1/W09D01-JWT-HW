import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav, Container, Navbar } from "react-bootstrap";
import Author from "./Author";
import Book from "./Book";
import Home from "./Home";
import AddBook from "./AddBook";
import Signup from "./Signup";
import Login from "./Login";
import jwt_decode from "jwt-decode";

export default function NavBar() {
  let decodedData;
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("userEmail");
  console.log(storedUser);
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
    let expirationDate = decodedData.exp;
    var current_time = Date.now() / 1000;
    if (expirationDate < current_time) {
      localStorage.removeItem("token");
    }
  }
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <li>
                <Nav.Link>
                  <Link to="/home">Home</Link>
                </Nav.Link>
              </li>

              <li>
                <Nav.Link>
                  <Link to="/author">Author</Link>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link>
                  <Link to="/book">Book</Link>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link>
                  <Link to="/AddBook">Add Book</Link>
                </Nav.Link>
              </li>

              {storedUser ? (
                <div>
                  <li>Welcome, {storedUser}</li>
                  <li>
                    <Nav.Link>
                      <Link to="/Logout">Log out</Link>
                    </Nav.Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <Nav.Link>
                      <Link to="/Login">Login</Link>
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link>
                      <Link to="/SignUp">Sign Up</Link>
                    </Nav.Link>
                  </li>
                </div>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Author" element={<Author />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
