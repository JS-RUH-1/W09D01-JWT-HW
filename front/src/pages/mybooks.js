import React, { useEffect, useState } from "react";
import axios from "axios";

function Mybooks(props) {
  const [bookimage, setBookImage] = useState("");
  const [bookName, setbookName] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");

  //trigger for choosing the function for modal eithier edit or add new
  const [trigger, setTrigger] = useState(true);

  const [data, setData] = useState([]);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const handelEditInfo = (e) => {
    setEditTitle(e.title);
    setEditId(e._id);
    setBookImage(e.image);
    setbookName(e.title);
    setPages(e.pages);
    setPrice(e.price);
  };

  const handelEdit = () => {
    const obj = {
      title: bookName,
      pages: pages,
      price: price,
      image: bookimage,
    };

    axios
      .put(`http://localhost:8080/${editId}`, obj, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        fetchApi();
      })
      .catch((error) => {
        console.log(error);
      });
    axios.put(`http://localhost:8080/books/${editTitle}`, obj, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    setEditId("");
    setBookImage("");
    setbookName("");
    setPages("");
    setPrice("");
  };

  const handelDelete = (e) => {
    axios
      .delete(`http://localhost:8080/${e._id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        fetchApi();
        axios.delete(`http://localhost:8080/books/${e.title}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelAddInfo = () => {
    setEditId("");
    setBookImage("");
    setbookName("");
    setPages("");
    setPrice("");
  };

  const handelAdd = () => {
    console.log("adding >>>");
    const obj = {
      name: data[1],
      age: data[2],
      nationality: data[3],
      image: data[5],
      gender: data[4],
      books: [
        ...data[6],
        { title: bookName, pages: pages, price: price, image: bookimage },
      ],
    };

    //put new book in Author [Book ]schema
    axios
      .put(`http://localhost:8080/`, obj, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        fetchApi();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //push new book in book schema
    axios.post(
      `http://localhost:8080/books`,
      { title: bookName, pages: pages, price: price, image: bookimage },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
  };

  const fetchApi = () => {
    axios
      .get("http://localhost:8080/author", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data.user);

        console.log("no data", res.data.user);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <h1>My BOOKS</h1>
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modalContactFormEdit"
        onClick={() => (setTrigger(true), handelAddInfo())}
      >
        {" "}
        Add new book
      </button>

      <div class="container">
        <div class="row">
          {data[6]?.map((e, i) => (
            <div class="col ">
              <div class="card m-5" style={{ width: "20rem" }}>
                <img
                  src={e.image}
                  class="card-img-top"
                  alt="..."
                  height={300}
                  style={{ objectFit: "contain", paddingTop: 5 }}
                />
                <div class="card-body">
                  <h5 class="card-title">{e.title.toUpperCase()}</h5>
                  <hr />
                  <h6 class="card-text">Price: {e.price}</h6>
                  <hr />
                  <h6 class="card-text">pages: {e.pages}</h6>
                  <hr />
                  <a
                    onClick={() => handelDelete(e)}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </a>
                  <a
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#modalContactFormEdit"
                    onClick={() => (setTrigger(false), handelEditInfo(e))}
                  >
                    {" "}
                    Edit Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="modalContactFormEdit"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Add Book</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form34">
                  Book name
                </label>
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setbookName(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Price
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Pages
                </label>
                <input
                  type="text"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="form-control validate"
                />
              </div>

              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  image
                </label>
                <input
                  type="text"
                  value={bookimage}
                  onChange={(e) => setBookImage(e.target.value)}
                  className="form-control validate"
                />
              </div>
              <div className="md-form mb-2">
                <label data-error="wrong" data-success="right" for="form29">
                  Preview
                </label>
                <img
                  src={bookimage}
                  value={bookimage}
                  width={200}
                  height={200}
                />
              </div>

              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => (trigger ? handelAdd() : handelEdit())}
                >
                  Save Changes{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mybooks;
