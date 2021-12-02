import React, { useState } from "react";
import "./components.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
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
        .post("/authors/signup", user)
        .then((res) => {
          console.log(res.data);
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
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter email"
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
            placeholder="Enter password"
            name="psw"
            onChange={(e) => {
              user.password = e.target.value;
              setUser({ ...user });
            }}
            id="psw"
            required
          />

          <label for="Name">
            <b>Author name</b>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            name="Name"
            onChange={(e) => {
              user.name = e.target.value;
              setUser({ ...user });
            }}
            id="Name"
            required
          />
          <label for="nationality">
            <b>Author nationality</b>
          </label>
          <input
            type="text"
            placeholder="Enter nationality"
            name="nationality"
            onChange={(e) => {
              user.nationality = e.target.value;
              setUser({ ...user });
            }}
            id="nationality"
            required
          />
          <label for="image">
            <b>Author image</b>
          </label>
          <input
            type="text"
            placeholder="Enter image"
            name="image"
            onChange={(e) => {
              user.image = e.target.value;
              setUser({ ...user });
            }}
            id="image"
            required
          />
          <hr />

          <p>
            By creating an account you agree to our{" "}
            <Link to="/">Terms & Privacy</Link>.
          </p>
          <button type="submit" className="registerbtn">
            Register
          </button>
        </div>

        <div className="container signin">
          <p>
            Already have an account? <Link to="/Signin">Sign in</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
