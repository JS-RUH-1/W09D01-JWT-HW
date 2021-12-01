import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import EditBook from "./EditBook";
function BooksPage() {
  function getCookie(cname) {
    var arrayb = document.cookie.split(";");
    console.log(arrayb);
    for (const item of arrayb) {
      if (item.startsWith("jwt=")) {
        return item.substr(4);
      }
    }
  }
  console.log(getCookie("jwt"));

  const navigate = useNavigate();
  const [Books, setBooks] = useState([]);
  useEffect(() => {
    if (getCookie("jwt") === undefined) {
      navigate("/signin");
    } else {
      axios
        .get("/books")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  function hundleDelete(book) {
    console.log(book);
    axios
      .delete(`/books/deletebook/${book._id}`)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function hundleEdit(book) {
    console.log(book);

    navigate("/EditBook/" + book._id);
  }
  return (
    <div>
      <div className="second__nav">
        <h2 className="header__Book">Welcome to book page</h2>
        <button className="new__btn">
          <Link className="Link_SecNav" to="/AddBook">
            {" "}
            Add new book
          </Link>
        </button>
      </div>
      <div className="main__authors">
        {Books.map((book) => {
          return (
            <div className="book__card">
              <p>{book.title}</p>
              <img className="img" src={book.image} alt="Author img" />
              <p> {book.price} $</p>
              <p> {book.pages} pages</p>
              <button className="edit__btn" onClick={() => hundleEdit(book)}>
                Edit
              </button>
              <button
                className="delete__btn"
                onClick={() => hundleDelete(book)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BooksPage;
