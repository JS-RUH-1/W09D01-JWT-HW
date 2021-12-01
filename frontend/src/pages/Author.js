import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function Author() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("there is token");
    } else navigate("/noAccess");
  }, []);
  const [NewAuthorInfo, setNewAuthorInfo] = useState({
    name: "",
    nationality: "",
    age: "",
    gender: "",
    image: "",
    books: [],
  });
  const [show, setShow] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const handleClose = (index) => {
    show.splice(index, 1, false);
    setShow([...show]);
  };
  const handleShow = (index) => {
    show.splice(index, 1, true);
    setShow([...show]);
  };
  let [Authors, setAuthors] = useState([]);
  // =================================
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/author/getAll")
      .then((res) => {
        setAuthors(res.data);
        res.data.forEach(() => {
          show.push(false);
          setShow(show);
          setLoading(false);
        });

        console.log(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }, []);
  // ==============================
  function deleteItem(el) {
    axios
      .delete(`http://localhost:3001/api/author/delete/${el._id}`)
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  // =============================
  function handleAddNewAuthor() {
    axios
      .post("http://localhost:3001/api/author/add", NewAuthorInfo)
      .then((res) => {
        setAddForm(false);
        setAuthors(res.data);
        setNewAuthorInfo({
          name: "",
          nationality: "",
          age: "",
          gender: "",
          image: "",
          books: [],
        });
      });
  }
  // ============================
  if (loading) return <Loading />;
  return (
    <div className="authAndBook">
      <div className="myPage">
        <button
          className="btn btn-dark mx-auto d-block "
          onClick={() => {
            setAddForm(true);
          }}
        >
          {" "}
          Add Author{" "}
        </button>
        <div className="authors">
          {Authors.map((el, i) => {
            return (
              <div key={el._id} className="cardAuthor">
                <img
                  onClick={() => {
                    handleShow(i);
                  }}
                  src={el.image}
                  alt="imageA"
                  width="100%"
                  height="200px"
                />
                <h5>{el.name}</h5>
                <div className="btns">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteItem(el);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={"/editAuthor/" + el._id}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                </div>
                <Modal
                  show={show[i] === true}
                  onHide={() => {
                    handleClose(i);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{el.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      <b>nationality: </b>
                      {el.nationality}
                    </p>
                    {el.age != null ? (
                      <p>
                        <b>Age: </b>
                        {el.age}
                      </p>
                    ) : null}
                    <p>
                      <b>gender: </b> {el.gender}
                    </p>
                    <b>Books:</b>
                    <div className="allBooks">
                      {el.books.map((book) => {
                        return (
                          <div className="bookCard text-center">
                            <img src={book.image} alt="book" width="100%" />
                            <p>{book.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            );
          })}
        </div>
        <Modal
          show={AddForm === true}
          onHide={() => {
            setAddForm(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>ADD NEW AUTHOR</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddNewAuthor();
              }}
            >
              <label className="labels">Author name:</label>
              <input
                type="text"
                defaultValue={NewAuthorInfo.name}
                onChange={(e) => {
                  NewAuthorInfo.name = e.target.value;
                  setNewAuthorInfo({ ...NewAuthorInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Author image:</label>
              <input
                type="text"
                defaultValue={NewAuthorInfo.image}
                onChange={(e) => {
                  NewAuthorInfo.image = e.target.value;
                  setNewAuthorInfo({ ...NewAuthorInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Nationality:</label>
              <input
                type="text"
                defaultValue={NewAuthorInfo.nationality}
                onChange={(e) => {
                  NewAuthorInfo.nationality = e.target.value;
                  setNewAuthorInfo({ ...NewAuthorInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Gender:</label>
              <input
                type="text"
                defaultValue={NewAuthorInfo.gender}
                onChange={(e) => {
                  NewAuthorInfo.gender = e.target.value;
                  setNewAuthorInfo({ ...NewAuthorInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Age:</label>
              <input
                type="text"
                defaultValue={NewAuthorInfo.age}
                onChange={(e) => {
                  NewAuthorInfo.age = parseInt(e.target.value);
                  setNewAuthorInfo({ ...NewAuthorInfo });
                }}
                required
              ></input>
              <br />
              <hr />
              <b className="myTitle">Books:</b>
              <br />
              <div className="btns">
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    NewAuthorInfo.books.push({
                      title: "",
                      price: 0,
                      pages: 0,
                      image: "",
                    });
                    setNewAuthorInfo({ ...NewAuthorInfo });
                  }}
                >
                  {" "}
                  add{" "}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    NewAuthorInfo.books.pop();
                    setNewAuthorInfo({ ...NewAuthorInfo });
                  }}
                >
                  Remove
                </button>
              </div>
              {NewAuthorInfo.books.map((book, index) => {
                return (
                  <div className="form__add">
                    <label>Title:</label>
                    <input
                      type="text"
                      defaultValue={book.title}
                      onChange={(e) => {
                        NewAuthorInfo.books[index].title = e.target.value;
                        setNewAuthorInfo({ ...NewAuthorInfo });
                      }}
                    />
                    <br />
                    <label>image:</label>
                    <input
                      type="text"
                      defaultValue={book.image}
                      onChange={(e) => {
                        NewAuthorInfo.books[index].image = e.target.value;
                        setNewAuthorInfo({ ...NewAuthorInfo });
                      }}
                    />
                    <br />
                    <label>price:</label>
                    <input
                      type="text"
                      defaultValue={book.price}
                      onChange={(e) => {
                        NewAuthorInfo.books[index].price = e.target.value;
                        setNewAuthorInfo({ ...NewAuthorInfo });
                      }}
                    />
                    <br />

                    <label>pages:</label>
                    <input
                      type="text"
                      defaultValue={book.pages}
                      onChange={(e) => {
                        NewAuthorInfo.books[index].pages = e.target.value;
                        setNewAuthorInfo({ ...NewAuthorInfo });
                      }}
                    />
                    <br />
                  </div>
                );
              })}
              <button className="btn btn-success" type="submit">
                {" "}
                Submit{" "}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Author;
