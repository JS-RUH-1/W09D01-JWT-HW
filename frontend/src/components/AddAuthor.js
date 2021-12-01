import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAuthor() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [books, setBooks] = useState([]);

  function handelNewForm() {
    setBooks([...books, { title: "", img: "", price: 0, pages: 0 }]);
  }
  function handelDeleteForm(element, i) {
    setBooks(books.filter((item, index) => index !== i));
  }

  function hundleAdd() {
    const data = {
      name: name,
      image: image,
      age: age,
      nationality: nationality,
      gender: gender,
      books: books,
    };
    axios
      .post("/authors/AddAuthor", data)
      .then((res) => {
        navigate("/AuthorsPage");
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  return (
    <div className="addBookForm">
      <label htmlFor="name">Enter name here</label>
      <input
        className="input__css"
        id="name"
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label htmlFor="age">Enter age here</label>
      <input
        className="input__css"
        id="age"
        onChange={(e) => setAge(e.target.value)}
        type="text"
      />
      <label htmlFor="nationality">Enter nationality here</label>
      <input
        className="input__css"
        id="nationality"
        onChange={(e) => setNationality(e.target.value)}
        type="text"
      />
      <label htmlFor="image">Enter image url here</label>
      <input
        className="input__css"
        id="image"
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <label htmlFor="gender">Enter gender here</label>
      <input
        className="input__css"
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        type="text"
      />

      <button type="button" className="new__btn" onClick={handelNewForm}>
        <h4 className="">add book</h4>
      </button>

      {books.map((book, i) => {
        return (
          <div className="addBookForm2">
            <label htmlFor="title">Enter title here</label>
            <input
              className="input__css2"
              id="title"
              defaultValue={book.title}
              onChange={(e) => {
                book.name = e.target.value;
                setBooks([...books]);
              }}
              type="text"
            />
            <label htmlFor="imgUrl">Enter image url</label>
            <input
              className="input__css2"
              id="imgUrl"
              value={book.image}
              onChange={(e) => {
                book.image = e.target.value;
                setBooks([...books]);
              }}
              type="text"
            />
            <label htmlFor="price">Enter price here</label>
            <input
              className="input__css2"
              id="price"
              value={book.price}
              onChange={(e) => {
                book.price = e.target.value;
                setBooks([...books]);
              }}
              type="text"
            />
            <label htmlFor="pages">Enter pages here</label>
            <input
              className="input__css2"
              id="pages"
              value={book.pages}
              onChange={(e) => {
                book.pages = e.target.value;
                setBooks([...books]);
              }}
              type="text"
            />
            <button
              type="button"
              onClick={() => {
                handelDeleteForm(book, i);
              }}
              className="delete__btn"
            >
              <h4>delete book</h4>
            </button>
          </div>
        );
      })}
      <button className="new__btn" onClick={hundleAdd} type="submit">
        Add
      </button>
    </div>
  );
}

export default AddAuthor;
