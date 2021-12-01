import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function EditAuthor() {
  const params = useParams();
  const [Load, setLoad] = useState(true);
  const [Author, setAuthor] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("there is token");
    } else navigate("/noAccess");
  }, []);
  async function fetchData() {
    const res = await axios.get(
      `http://localhost:3001/api/author/getAuthor/${params.id}`
    );
    const data = await res.data;
    setAuthor(data);
    setLoad(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  function submitEdit() {
    axios
      .put(`http://localhost:3001/api/author/edit/${params.id}`, Author)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  // WAIT UNTIL THE DATA
  if (Load) return <Loading />;
  return (
    <div>
      {" "}
      <form
        style={{ textAlign: "center" }}
        className="form__white__label"
        onSubmit={(e) => {
          e.preventDefault();
          submitEdit();
        }}
      >
        <label className="labels">Author name:</label>
        <input
          type="text"
          defaultValue={Author.name}
          onChange={(e) => {
            Author.name = e.target.value;
            setAuthor({ ...Author });
          }}
        ></input>
        <br />
        <label className="labels">Age:</label>
        <input
          type="text"
          defaultValue={Author.age}
          onChange={(e) => {
            Author.age = e.target.value;
            setAuthor({ ...Author });
          }}
        ></input>
        <br />
        <hr />
        <b className="myTitle">Books</b>
        <br />
        {Author.books.map((b, index) => {
          return (
            <div className="form__white__label">
              <label className="labels">title:</label>
              <input
                type="text"
                defaultValue={b.title}
                onChange={(e) => {
                  Author.books[index].title = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">image:</label>
              <input
                type="text"
                defaultValue={b.image}
                onChange={(e) => {
                  Author.books[index].image = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">pages:</label>
              <input
                type="text"
                defaultValue={b.pages}
                onChange={(e) => {
                  Author.books[index].pages = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <br />
              <label className="labels">price:</label>
              <input
                type="text"
                defaultValue={b.price}
                onChange={(e) => {
                  Author.books[index].price = e.target.value;
                  setAuthor({ ...Author });
                }}
              ></input>
              <hr />
            </div>
          );
        })}
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default EditAuthor;
