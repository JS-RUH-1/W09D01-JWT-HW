import React from "react";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Author from "./pages/author";
import Book from "./pages/book";
import BookInfo from "./pages/BookInfo";
import AuthorkInfo from "./pages/authorInfo";
import Register from "./pages/register";
import Login from "./pages/login";
import Mybooks from "./pages/mybooks";

function App(props) {

  return (
    <BrowserRouter>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link active" href="/">
                Author{" "}
              </a>
              <a class="nav-item nav-link" href="/Book">
                Books
              </a>

              {localStorage.getItem("token") ? (
                <div style={{ display: "inline-block" }}>
                  <a
                    style={{ display: "inline-block" }}
                    class="nav-item nav-link"
                    href="/mybook"
                  >
                    Mybooks
                  </a>

                  <a
                    style={{ cursor: "pointer", display: "inline-block" }}
                    class="nav-item nav-link"
                    onClick={() => (
                      localStorage.clear(), (window.location.href = "/login")
                    )}
                  >
                    Logout
                  </a>
                </div>
              ) : (
                <div style={{ display: "inline-block" }}>
                  <a
                    style={{ display: "inline-block" }}
                    class="nav-item nav-link"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    style={{ display: "inline-block" }}
                    class="nav-item nav-link"
                    href="/register"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/:id" element={<AuthorkInfo />} />
        <Route path="/mybook" element={<Mybooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Book/:id" element={<BookInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
