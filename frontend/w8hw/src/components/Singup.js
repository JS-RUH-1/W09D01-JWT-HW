import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/carousel";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import axios from "axios"

export default function Singup() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    // const [image,setImage] =useState("")
    // const [nationality,setNationality] =useState("")
    const [name,setName] =useState("")
    const [user, setUser] = useState([])

    const handlesub = () =>{
        axios.post("http://localhost:3002/api/author/signup", {email:email, password:pass, name:name})
        .then( (response) => {
          console.log(response.data);
          setUser([...user,response.data])
      
        //   navigate("../")
          alert("Hello!! welcom");
        })
        
      }
    return (
        <div>
         <div>
           <form >
  <label for="fname">name:</label>
  <input type="name" onChange={(e)=>setName(e.target.value)}  />
  <label for="fname">email:</label>
  <input type="email" onChange={(e)=>setEmail(e.target.value)}  />
  <label for="lname">password:</label>
  <input type="password" onChange={(e)=>setPass(e.target.value)}  />
  <input type="submit" value="Submit" onClick={(e)=>handlesub(e)}/>
          </form> 
        </div>
        </div>
    )
}
