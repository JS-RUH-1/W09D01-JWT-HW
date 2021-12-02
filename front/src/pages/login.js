import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router';

function Login(props) {

    const nav =useNavigate()

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const handelLogin = ()=>{
        const obj = {
            username: username,
            password: password,
          };

          
        console.log(obj)
        axios.post("http://localhost:8080/login",obj).then((res) => {
            if(res.data.data){
                localStorage.setItem("token",res.data.data)
                window.location.href = "/mybook"
            }
            else{
                alert("please check username and password")
            }
            console.log("no data", res.data);
          });
    }

    return (
        <div>
             <h1>Login</h1>
            <label>Username </label>
            <br/>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <br/>
            <button onClick={()=>handelLogin()}>Login</button>
        </div>
    );
}

export default Login;