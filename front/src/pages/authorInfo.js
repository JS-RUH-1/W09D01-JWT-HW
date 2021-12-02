import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AuthorkInfo(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("this is my state", state);
  }, []);
  return (
    <div>
      {state ? (
        <div style={{ margin: "6%" }}>
          <h1>{state.name.toUpperCase()}</h1>
          <h3>Age: {state.age}</h3>
          <h3>Gender: {state.gender}</h3>
          <h3>Nationality: {state.nationality}</h3>
          <span style={{ fontSize: 20 }}> Books:</span>
          {state.books.map((e) => (
            <h5
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/Book/${e._id}`, { state: [e,state] })}
            >
              ({e.title}){" "}
            </h5>
          ))}
          <img src={state.image} />
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "20%" }}>
          Sorry no book with that id :(
        </h1>
      )}
    </div>
  );
}

export default AuthorkInfo;
