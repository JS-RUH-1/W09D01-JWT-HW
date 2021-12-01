import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";

function AuthorsPage() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [sName, setsName] = useState("");
  const [sAge, setsAge] = useState();
  const [sNationality, setSNationality] = useState("");
  const [sImg, setsImg] = useState("");
  const [sGender, setSGender] = useState("");
  const [sBooks, setsBooks] = useState([]);
  const [flag, setflag] = useState("none");
  const [flag2, setflag2] = useState("block");

  function getCookie(cname) {
    var arrayb = document.cookie.split(";");
    for (const item of arrayb) {
      if (item.startsWith("jwt=")) {
        return item.substr(4);
      }
    }
  }

  useEffect(() => {
    if (getCookie("jwt") === undefined) {
      navigate("/signin");
    } else {
      axios
        .get("/authors")
        .then((res) => {
          console.log(res.data);
          setAuthors(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function hundleImg(a) {
    setflag("block");
    setflag2("none");
    setsName(a.name);
    setsAge(a.age);
    setSGender(a.gender);
    setSNationality(a.nationality);
    setsBooks(a.books);
    setsImg(a.image);
  }
  function hundleDelete(a) {
    console.log(a);
    axios
      .delete(`/authors/deleteauthor/${a._id}`)
      .then((res) => {
        console.log(res.data);
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function hundleEdit(a) {
    console.log(a);

    navigate("/EditAuthor/" + a._id);
  }
  return (
    <>
      <div className="second__nav">
        <h2 className="header__Book"> Welcome to author page</h2>
        <button className="new__btn">
          <Link className="Link_SecNav" to="/AddAuthor">
            Add new author
          </Link>
        </button>
      </div>
      <div className="continer">
        <div className="main__authors">
          {authors.map((a) => {
            return (
              <div className="author__card">
                <p> {a.name}</p>
                <img
                  className="img"
                  onClick={() => {
                    hundleImg(a);
                  }}
                  width="200px"
                  src={a.image}
                  alt="Author img"
                />
                <div style={{ display: "flex" }}>
                  <button className="edit__btn" onClick={() => hundleEdit(a)}>
                    Edit
                  </button>
                  <button
                    className="delete__btn"
                    onClick={() => hundleDelete(a)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="selected__author">
          <h2 onClick style={{ display: `${flag2}` }}>
            To get more details click any author picture
          </h2>
          <div className="author__card" style={{ display: `${flag}` }}>
            <p> {sName}</p>
            <img className="img" src={sImg} alt="Author img" />
            <p> {sAge} years</p>
            <p> {sGender}</p>
            <p> {sNationality}</p>
            <h4>{sName} Books: </h4>
            {sBooks.map((book) => {
              return (
                <div className="book__card">
                  <p> {book.title}</p>
                  <img className="img" src={book.image} alt="Author img" />
                  <p> {book.price} $</p>
                  <p> {book.pages} pages</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorsPage;
