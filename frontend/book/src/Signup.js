import axios from "axios";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();

  function formFunction(e) {
    const form = document.querySelector("form");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    e.preventDefault();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // emailError.textContent = "";
      // passwordError.textContent = "";

      const email = form.email.value;
      const password = form.password.value;
      console.log(email);
      console.log(password);

      axios
        .post("http://localhost:8080/signup", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.errors) {
            emailError.textContent = res.data.errors.email;
            passwordError.textContent = res.data.errors.password;
          }
          if (res.data.user) {
            // location.assign("/");

            console.log(res.data);
            const token = res.data.token;
            const user = res.data.user;
            console.log(res.data.user);

            const authorSign = jwt(token); // decode your token here
            console.log(token);
            console.log(authorSign);
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", user.email);
            navigate("/");
          }
        });
    });
  }

  return (
    <div>
      <form onSubmit={(e) => formFunction(e)}>
        <h2>Sign Up</h2>
        <label for="email">Email</label>
        <input type="text" name="email" required />
        <div class="email error" />
        <label for="password">Password</label>
        <input type="password" name="password" required />
        <div class="password error" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
