import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function Book() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/book").then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
    // console.log(book);
  }, []);

  function DeleteItem(e, id) {
    e.preventDefault();
    console.log("test button" + id);
    axios.delete(`http://localhost:3000/book/${id}/delete`).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  }

  return (
    <div class="card">
      {book.map((item) => {
        return (
          <div>
            <p>id: {item._id} </p>
            <img src={item.image} style={{ width: "100%" }} />
            <div class="container">
              <h4>
                <b>Title : {item.title}</b>
              </h4>
              <p>Price : {item.price}</p>
              <p>Pages : {item.pages}</p>
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

export default Book;
