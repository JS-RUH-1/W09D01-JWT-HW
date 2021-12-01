import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const [Loading, setLoading] = useState(false);
  function checkUser() {
    if (userData.email == null || userData.password == null) {
      alert("there is data messing");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:3001/api/user/signin", userData)
      .then((res) => {
        if (res.data !== "invalid email/password") {
          localStorage.setItem("token", res.data);
          navigate("/");
        } else {
          alert("invalid email/password");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err) console.log(err);
      });
  }
  if (Loading) return <div>Loading .......</div>;
  return (
    <div className="myPage">
      <div className="form__sign">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkUser();
          }}
        >
          <h2>SIGNIN FORM</h2>
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
            type="text"
            onChange={(e) => {
              userData.password = e.target.value;
              setuserData({ ...userData });
            }}
          ></input>
          <br />
          <button type="submit"> SIGN IN </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
