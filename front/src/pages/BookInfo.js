import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

function BookInfo(props) {
  const { state } = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    console.log("this is my state", state);
  }, []);
  return (
    <div>
      {state ? (
        <div style={{ margin: "6%" }}>
          <h1>{state[0].title.toUpperCase()}</h1>
          <h3>Pages: {state[0].pages}</h3>
          <h3>Price: {state[0].price}</h3>
          <img src={state[0].image} />
          <h5
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
    
              onClick={() => navigate(`/${state[1]._id}`, {state:  state[1] })}
            >
              ({state[1].name}){" "}
            </h5>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "20%" }}>
          Sorry no book with that id :(
        </h1>
      )}
    </div>
  );
}

export default BookInfo;
