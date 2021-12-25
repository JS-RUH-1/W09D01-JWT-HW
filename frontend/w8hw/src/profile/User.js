import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function User() {
  const id = localStorage.getItem("id")
  const navigate= useNavigate()

  const [authors, setAuthors] = React.useState([])
  const [authorId, setAuthorId] = React.useState('')
  const [author, setAuthor] = React.useState({})
  const [authorU, setAuthorU] = React.useState({})
  const [enableEdit,setEnabeEdit] = useState(false)
  const [idEdit,setIdEdit] = useState()
  
  React.useEffect(()=>{
    console.log(authors)
  }, [authors])  

  React.useEffect(()=>{
        axios.get(`/api/author/${id}`)
    .then((res) => {          
      console.log(res.data)
      setAuthors([res.data])
    })
    .catch(error => {
        console.log(error.res)
    });
  }, [])  

  const logout =() =>{
  localStorage.removeItem("id")
  localStorage.removeItem("token")
  navigate("/")
 
  }

  const updateauthor = () =>{
    axios.get(`/api/author/${id}`)
    .then((res) => {          
      console.log(res.data)
      setAuthors([res.data])
    })
    .catch(error => {
        console.log(error.res)
    });
  }

  const deleteAuthor = (id) =>{
    console.log(id)
    axios.delete(`/api/author/${id}`)
    .then((res) => {          
      console.log(res)
      updateauthor()
    })
    .catch(error => {
        console.log(error.res)
    });
  }

  const addAuthor = (e) =>{
    e.preventDefault()
    axios.post('/api/author/',  author)
    .then((res) => {          
      console.log(res)
      updateauthor()
    })
    .catch(error => {
        console.log(error.res)
    });
  }

  const editeAuthor = (e) =>{
    e.preventDefault()
    axios.patch(`/api/author/${id}`,  authorU)
    .then((res) => {          
      console.log(res)
      updateauthor()
    })
    .catch(error => {
        console.log(error.res)
    });
  }


    return (
        <div>
               {authors.map((author, index)=>(
          <div key={index}>
            <img alt="author-img" width='200px' src={author.image}/>
            <ul>
               <li >name:{author.name}</li>
               <li >gender:{author.gender}</li>
               <li >age:{author.age}</li>
               <li >nationality:{author.nationality}</li>
               <button onClick={()=>deleteAuthor(author._id)} >Delete Author</button>
               <button onClick={()=>setAuthorId(author._id)} >edit Author</button>
               <button onClick={()=>logout(author._id)} >logout</button>

            </ul>
          </div>
        ))}
   
   
       {/* <form>
         <input onChange={(e)=> setNameD(e.target.value)} placeholder="author name"/>
         <button onClick={(e)=>deleteAuthor(e)} >Delete Author</button>
       </form> */}
   <br/>
       <form>

         <input onChange={(e)=> setAuthor({...author, ['name']: e.target.value})} placeholder="author name"/>
         <input onChange={(e)=> setAuthor({...author, ['age']: parseInt(e.target.value)})} placeholder="author age"/>
         <input onChange={(e)=> setAuthor({...author, ['nationality']: e.target.value})} placeholder="author nationality"/>
         <input onChange={(e)=> setAuthor({...author, ['gender']: e.target.value})} placeholder="author gender"/>
         <input onChange={(e)=> setAuthor({...author, ['image']: e.target.value})} placeholder="author image"/>
         <button onClick={(e)=>addAuthor(e)} >add Author</button>
       </form>
   <br/>
       <form>
         <input onChange={(e)=> setAuthorU({...authorU, ['name']: e.target.value})} placeholder="author name"/>: <br/>
         <input value={authorId} placeholder="author id" />
         <input onChange={(e)=> setAuthorU({...authorU, ['age']: parseInt(e.target.value)})} placeholder="author age"/>
         <input onChange={(e)=> setAuthorU({...authorU, ['nationality']: e.target.value})} placeholder="author nationality"/>
         <input onChange={(e)=> setAuthorU({...authorU, ['gender']: e.target.value})} placeholder="author gender"/>
         <input onChange={(e)=> setAuthorU({...authorU, ['image']: e.target.value})} placeholder="author image"/>
         <button onClick={(e)=>editeAuthor(e)} >edit Author</button>
       </form>
   <br/>
        </div>
    )
}
