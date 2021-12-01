import { Link, useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  return (
    <div className="NavBar">
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        {" "}
        Authors
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/books">
        {" "}
        Books
      </Link>

      {!token ? (
        <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
          {" "}
          SignUp
        </Link>
      ) : null}
      {!token ? (
        <Link style={{ color: "white", textDecoration: "none" }} to="/signin">
          {" "}
          SignIn
        </Link>
      ) : null}

      {token ? (
        <button
          className="signOutBtn"
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          SignOut
        </button>
      ) : null}
    </div>
  );
}

export default NavBar;
