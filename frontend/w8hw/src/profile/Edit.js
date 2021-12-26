import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
    const [book, setBook] = useState([]);
    const [title, setTitle] = useState();
    const [img, setImg] = useState();
    const [price, setPrice] = useState();
    const [page, setPage] = useState();
    const navigate = useNavigate();
    const uid= localStorage.getItem("id")
    const { id } = useParams();

    const putData = (e) => {
        e.preventDefault();
        console.log("hi");
        axios
          .put(`/api/author/editBook/${uid}/${id}`, {
            title: title,
            image: img,
            price: price,
            pages: page,
          })
          .then((res) => {
            console.log(res);
          });
        navigate(`/User`);
        alert("Updated successfully");
      };
    return (
        <div>
                <form
        onSubmit={(e) => {
          putData(e);
        }}
      >
        <label>title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Image</label>
        <input
          type="text"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <label>price</label>
        <input
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label>page</label>
        <input
          type="text"
          onChange={(e) => {
            setPage(e.target.value);
          }}
        />
        <button  type="submit">
          Eidet
        </button>
      </form>  
        </div>
    )
}
