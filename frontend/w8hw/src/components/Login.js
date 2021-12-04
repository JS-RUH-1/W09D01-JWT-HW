import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import User from '../profile/User';


export default function Login() {
   const navigate= useNavigate()
    // localStorage.setItem("token", res.token)  insid the res 
    const [user ,setUser] = useState('')
    const [email ,setEmail] = useState([])
    const [pass ,setPass] = useState([])

    const handlesub = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3002/api/author/login", {email:email, password:pass})
        .then( (response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("id", response.data.id)

        setUser(response.data)
      
          navigate("/User")
          alert("Hello!! welcom");
        })
    }
    return (
        <div>
           <form >
  <label for="fname">email:</label>
  <input type="email" onChange={(e)=>setEmail(e.target.value)}  />
  <label for="lname">password:</label>
  <input type="password" onChange={(e)=>setPass(e.target.value)}  />
  <input type="submit" value="Submit" onClick={(e)=>handlesub(e)}/>
          </form> 
        </div>
    )
}
