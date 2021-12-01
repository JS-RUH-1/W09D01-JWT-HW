import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function Books() {
  const [loading, setLoading] = useState(true);
  const [Books, setBooks] = useState([]);
  const [AddForm, setAddForm] = useState(false);
  const [NewBookInfo, setNewBookInfo] = useState({
    title: "",
    image: "",
    price: 0,
    pages: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("there is token");
    } else navigate("/noAccess");
  }, []);
  function handleAddNewBook() {
    axios
      .post("http://localhost:3001/api/book/add", NewBookInfo)
      .then((res) => {
        setBooks(res.data);
        setAddForm(false);
        setNewBookInfo({
          title: "",
          image: "",
          price: 0,
          pages: 0,
        });
      })
      .catch();
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/book/getAll")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        setLoading(false);
      })
      .catch();
  }, []);
  function deleteBook(id) {
    axios
      .delete(`http://localhost:3001/api/book/delete/${id}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  // --------------
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
          Add Book{" "}
        </button>
        <Modal
          show={AddForm === true}
          onHide={() => {
            setAddForm(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>ADD NEW BOOK</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddNewBook();
              }}
            >
              <label className="labels">Title:</label>
              <input
                type="text"
                defaultValue={NewBookInfo.title}
                onChange={(e) => {
                  NewBookInfo.title = e.target.value;
                  setNewBookInfo({ ...NewBookInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Image:</label>
              <input
                type="text"
                defaultValue={NewBookInfo.image}
                onChange={(e) => {
                  NewBookInfo.image = e.target.value;
                  setNewBookInfo({ ...NewBookInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Price:</label>
              <input
                type="text"
                defaultValue={NewBookInfo.price}
                onChange={(e) => {
                  NewBookInfo.price = e.target.value;
                  setNewBookInfo({ ...NewBookInfo });
                }}
                required
              ></input>
              <br />
              <label className="labels">Pages:</label>
              <input
                type="text"
                defaultValue={NewBookInfo.pages}
                onChange={(e) => {
                  NewBookInfo.pages = e.target.value;
                  setNewBookInfo({ ...NewBookInfo });
                }}
                required
              ></input>
              <br />

              <button className="btn btn-success" type="submit">
                {" "}
                Submit{" "}
              </button>
            </form>
          </Modal.Body>
        </Modal>
        {/********************************/}
        <div className="authors">
          {Books.map((el, i) => {
            return (
              <div className="cardAuthor" key={el._id}>
                <img src={el.image} alt="img" width="100%" />
                <h5> {el.title}</h5>
                <div className="btns">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteBook(el._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={"/editBook/" + el._id} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
    </div>
  );
}

export default Books;
