import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Author(props) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchApi = () => {
    axios.get("http://localhost:8080/").then((res) => {
      setData(res.data);
      console.log("no data", res.data);
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {data.map((e, i) => (
          <div className="col m-2" key={i}>
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={e.image}
                className="card-img-top"
                alt="..."
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <hr />
                <h6 className="card-text">Nationality: {e.nationality}</h6>
                <hr />
                <a
                  onClick={() => navigate(`/${e._id}`, { state: e })}
                  className="btn btn-primary m-2"
                >
                  Info
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Author;
