import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState();
  const [pages, setPages] = useState();
  function hundleAdd() {
    let data = {
      title: Title,
      image: imgUrl,
      price: price,
      pages: pages,
    };
    axios
      .post("/books/addBook", data)
      .then((res) => {
        navigate("/BooksPage");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="addBookForm">
      <label htmlFor="title">Enter title here</label>
      <input
        className="input__css"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <label htmlFor="imgUrl">Enter image url</label>
      <input
        className="input__css"
        id="imgUrl"
        onChange={(e) => setImgUrl(e.target.value)}
        type="text"
      />
      <label htmlFor="price">Enter price here</label>
      <input
        className="input__css"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
        type="text"
      />
      <label htmlFor="pages">Enter pages here</label>
      <input
        className="input__css"
        id="pages"
        onChange={(e) => setPages(e.target.value)}
        type="text"
      />
      <button className="new__btn" onClick={hundleAdd} type="submit">
        Add
      </button>
    </div>
  );
}

export default AddBook;
