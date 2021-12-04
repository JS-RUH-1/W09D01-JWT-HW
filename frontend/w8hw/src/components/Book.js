import React from 'react'
import axios from 'axios';
import {useEffect, useState } from 'react';
import Authors from "./Authors"

export default function Book() {
    const [books, setBooks] = useState([])
    const [nameD, setNameD] = useState('')
    const [book, setBook] = useState({})
    const [boook, setBoook] = useState({})

    useEffect(()=>{
        console.log(book)
      }, [book])  
    
    useEffect(()=>{
        axios.get('http://localhost:3002/api/book')
        .then((res) => {          
          console.log(res.data)
          setBooks(res.data)
        })
        .catch(error => {
            console.log(error.response)
        });
      }, [])  

      const updateBooks = () =>{
        axios.get('http://localhost:3002/api/book')
        .then((res) => {          
          console.log(res.data)
          setBooks(res.data)
        })
        .catch(error => {
            console.log(error.response)
        });
      }

      const deleteBook = (e) =>{
        e.preventDefault()
        console.log(nameD)
        axios.delete('http://localhost:3002/api/book', { data: { title: nameD} })
        .then((res) => {          
          console.log(res)
          updateBooks()
        })
        .catch(error => {
            console.log(error.response)
        });
      }

      const addBook = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3002/api/book',  book)
        .then((res) => {          
          console.log(res)
          updateBooks()
        })
        .catch(error => {
            console.log(error.response)
        });
      }

      const editBook = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:3002/api/book',  boook)
        .then((res) => {          
          console.log(res)
          updateBooks()
        })
        .catch(error => {
            console.log(error.response)
        });
      }


    return (
        <div>
            <div>
                {/* <h1><a href="Authors.js">Authors</a></h1> */}
                <a href="Authors.js">Authors</a>
            </div>
              {books.map((book, index)=>(
       <div key={index}>
         <img alt="author-img" width='200px' src={book.image}/>
         <ul>
            <li >{book.title}</li>
            <li >price:{book.price}</li>
            <li >pages:{book.pages}</li>
         </ul>
       </div>
     ))} 
            <form>
      <input onChange={(e)=> setNameD(e.target.value)} placeholder="book name"/>
      <button onClick={(e)=>deleteBook(e)} >Delete Book</button>
             </form>
             <br/>
    <form>
      <input onChange={(e)=> setBoook({...boook, ['title']: e.target.value})} placeholder="book title"/>
      <input onChange={(e)=> setBoook({...boook, ['price']: parseInt(e.target.value)})} placeholder="book price"/>
      <input onChange={(e)=> setBoook({...boook, ['pages']: e.target.value})} placeholder="book pages"/>
      <input onChange={(e)=> setBoook({...boook, ['image']: e.target.value})} placeholder="book image"/>
      <button onClick={(e)=>editBook(e)} >edit book</button>
    </form>
<br/>

<form>
      <input onChange={(e)=> setBook({...book, ['title']: e.target.value})} placeholder="book title"/>
      <input onChange={(e)=> setBook({...book, ['price']: parseInt(e.target.value)})} placeholder="book price"/>
      <input onChange={(e)=> setBook({...book, ['pages']: e.target.value})} placeholder="book pages"/>
      <input onChange={(e)=> setBook({...book, ['image']: e.target.value})} placeholder="book image"/>
      <button onClick={(e)=>addBook(e)} >add book</button>
    </form>
<br/>
        </div>
    )
}
