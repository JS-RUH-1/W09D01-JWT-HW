import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [userData, setuserData] = useState({});

  function signupSubmit() {
    if (
      userData.name == null ||
      userData.email == null ||
      userData.password == null
    ) {
      alert("there is data messing");
      return;
    }
    axios
      .post("http://localhost:3001/api/user/signup", userData)
      .then((res) => {
        setuserData({});
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="myPage">
      <div className="form__sign">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signupSubmit();
          }}
        >
          <h2>SIGNUP FORM</h2>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => {
              userData.name = e.target.value;
              setuserData({ ...userData });
            }}
          ></input>
          <br />
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => {
              userData.email = e.target.value;
              setuserData({ ...userData });
            }}
          ></input>
          <br />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => {
              userData.password = e.target.value;
              setuserData({ ...userData });
            }}
          ></input>
          <br />
          <button type="submit"> SIGN UP </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
