import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar() {
  const navigate = useNavigate();

  function getCookie(cname) {
    var arrayb = document.cookie.split(";");
    for (const item of arrayb) {
      if (item.startsWith("jwt=")) {
        return item.substr(4);
      }
    }
  }
  let token = getCookie("jwt");

  return (
    <>
      <div className="continer__NavBar">
        <Link className="Link_Nav" to="/">
          Home
        </Link>
        <Link className="Link_Nav" to="/AuthorsPage">
          Authors
        </Link>
        <Link className="Link_Nav" to="/BooksPage">
          Books
        </Link>
        {!token ? (
          <Link className="Link_Nav" to="/Signup">
            Signup
          </Link>
        ) : null}
        {!token ? (
          <Link className="Link_Nav" to="/Signin">
            signin
          </Link>
        ) : null}
        {token ? (
          <button
            onClick={() => {
              axios
                .get("/authors/signout")
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            signout
          </button>
        ) : null}
      </div>
      <hr />
    </>
  );
}

export default NavBar;
