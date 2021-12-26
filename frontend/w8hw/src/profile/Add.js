import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Add() {
    const [add, setAdd] = useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem("id")

    const Add = (e) =>{
        let title = e.target[0].value;
        let img = e.target[1].value;
        let price = e.target[2].value;
        let pages = e.target[3].value;
        console.log(e);
        
        axios.post(`/api/author/createBook/${id}`, {
            title:title,
            image:img,
            price:price,
            pages:pages,
        })
        .then((res) => {
            console.log(res);
            setAdd([...add, res.data.books]);
          });
    
        navigate(`/User`);
    
        alert("Add Sucsesfull");
    }
    return (
        <div>
                 <form
        onSubmit={(e) => {
          Add(e);
        }}
      >
        <label>title</label>
        <input type="text" />
        <label>Image</label>
        <input type="text" />
        <label>Price</label>
        <input type="number" />
        <label>pages</label>
        <input type="text" />
        <button type="submit">Added</button>
      </form>
        </div>
    )
}
