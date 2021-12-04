import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function Author() {
  const [author, setAuthor] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/author").then((res) => {
      console.log(res.data);
      setAuthor(res.data);
      // setAuthorBooks(res.data.books);
    });
    // console.log("authorBooks", authorBooks);
  }, []);

  function DeleteItem(e, id) {
    e.preventDefault();
    console.log("test button" + id);
    axios.delete(`http://localhost:3000/author/${id}/delete`).then((res) => {
      console.log(res.data);
      setAuthor(res.data);
    });
  }

  return (
    <div class="card">
      {author.map((item) => {
        return (
          <div>
            <p>id: {item._id} </p>
            <img src={item.image} style={{ width: "100%" }} />
            <div class="container">
              <h4>
                <b>Name : {item.name}</b>
              </h4>
              <p>Gender : {item.gender}</p>
              <p>Age : {item.age}</p>
              <button
                onClick={(e) => {
                  DeleteItem(e, item._id);
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Author;
