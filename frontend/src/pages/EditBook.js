import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function EditBook() {
  const params = useParams();
  const [Load, setLoad] = useState(true);
  const [Book, setBook] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("there is token");
    } else navigate("/noAccess");
  }, []);
  async function fetchData() {
    const res = await axios.get(
      `http://localhost:3001/api/book/getBook/${params.id}`
    );
    const data = await res.data;
    setBook(data);

    setLoad(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (Load) return <Loading />;
  function submitEdit() {
    axios
      .put(`http://localhost:3001/api/book/edit/${params.id}`, Book)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitEdit();
        }}
        className="form__white__label"
        style={{ textAlign: "center" }}
      >
        <label className="labels">title:</label>
        <input
          type="text"
          defaultValue={Book.title}
          onChange={(e) => {
            Book.title = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">image:</label>
        <input
          type="text"
          defaultValue={Book.image}
          onChange={(e) => {
            Book.image = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">pages:</label>
        <input
          type="text"
          defaultValue={Book.pages}
          onChange={(e) => {
            Book.pages = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <br />
        <label className="labels">price:</label>
        <input
          type="text"
          defaultValue={Book.price}
          onChange={(e) => {
            Book.price = e.target.value;
            setBook({ ...Book });
          }}
        ></input>
        <hr />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default EditBook;
