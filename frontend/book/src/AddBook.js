import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/carousel";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Row, Col, Button, Form } from "react-bootstrap";

function AddBook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/book").then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  }, []);

  function add(e) {
    e.preventDefault();
    // console.log(e.target[0].value);
    console.log(e);
    let title = e.target[0].value;
    let img = e.target[1].value;
    let price = e.target[2].value;
    let pages = e.target[3].value;

    console.log(img);
    axios
      .post("http://localhost:3000/book/create", {
        data: { title: title, img: img, price: price, pages: pages },
      })

      .then((res) => {
        console.log("add suc" + res);
        setBook([...book, res.data]);
      });

    alert("Add Sucsesfull");
  }

  function update(e){
    e.preventDefault()
    let id = e.target[0].value;
    let title = e.target[1].value;
    let img = e.target[2].value;
    let price = e.target[3].value;
    let pages = e.target[4].value;
    console.log(id)
  
    axios
    .put(`http://localhost:3000/book/${id}/update`, {
     id:id, title: title, img: img, price: price, pages: pages ,
    })
  
    .then((res) => {
      console.log("add suc" + res);
      // setBook([...book, res.data]);
    });
  
  alert("update Sucsesfull");
  }


  return (
    <div>
      <Form onSubmit={(e) => {
        update(e);
      }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Book id</Form.Label>
      <Form.Control type="text" placeholder="Enter Book Title" />
    </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Book Title" />
        </Form.Group>

        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Book Img</Form.Label>
          <Form.Control type="text" placeholder="Enter Book Img" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Pages</Form.Label>
          <Form.Control type="number" placeholder="Enter Pages" />
        </Form.Group>

        <Button className="logbutton" variant="primary" type="submit"         onClick={(e) => {
          add(e);
        }}>
          Add
        </Button>
        <Button className="logbutton" variant="primary" type="submit" >
        update
      </Button>
      </Form>

    </div>
  );
}

export default AddBook;
