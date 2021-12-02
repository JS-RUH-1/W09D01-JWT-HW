import React, { useState, useEffect, useContext, createContext } from "react";
import "./components.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userStatus from "./userStatus";

function Signin() {
  let { auth, setAuth } = useContext(userStatus);

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function hundleSubmit(e) {
    e.preventDefault();

    //reset errors
    // emailError.textContent = "";
    // passwordError.textContent = "";
    //get the values from the form
    // const email = form.email.value;
    // const password = form.password.value;
    try {
      const res = axios
        .post("/authors/signin", user)
        .then((res) => {
          console.log(res.data);
          setAuth(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="main__continer">
      <form onSubmit={hundleSubmit}>
        <div className="container">
          <h1>Signin</h1>

          <hr />

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => {
              user.email = e.target.value;
              setUser({ ...user });
            }}
            id="email"
            required
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => {
              user.password = e.target.value;
              setUser({ ...user });
            }}
            id="psw"
            required
          />

          <hr />

          <button type="submit" className="registerbtn">
            Signin
          </button>
        </div>

        <div className="container signin">
          <p>
            Don't have an account? <Link to="/Signup">Sign up</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
