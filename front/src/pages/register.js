import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";

function Register(props) {
  // Author INFO
  const [authorname, setAutorName] = useState("");
  const [age, setAge] = useState();
  const [Nntionalty, setNationalty] = useState("");
  const [usernmae, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [img, setImg] = useState("");




const nav = useNavigate()

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };
  const handelAdd = () => {
    const obj = {
      name: authorname,
      age: age,
      nationality: Nntionalty,
      username:usernmae,
      password:password,
      image: img,
      gender: gender,
      
    };
    axios
      .post("http://localhost:8080/", obj)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token",response.data.data)
        window.location.href = "/mybook"
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div>
      <h1>Register</h1>
      <label>AuthorName</label>
      <br />
      <input type="text" value={authorname}  onChange={(e)=>setAutorName(e.target.value)}/>
      <br />
      <label>Age</label>
      <br />
      <input type="text" value={age}  onChange={(e)=>setAge(e.target.value)} />
      <br />
      <label>Nationalty</label>
      <br />
      <input type="text" value={Nntionalty}  onChange={(e)=>setNationalty(e.target.value)} />
      <br />
      <label>Username </label>
      <br />
      <input type="text" value={usernmae}  onChange={(e)=>setUsername(e.target.value)} />
      <br />
      <label>Password</label>
      <br />
      <input type="password"  value={password}  onChange={(e)=>setPassword(e.target.value)}/ >
      <br />
      <label>gender</label>
      <br />
      <select value={gender} onChange={handleSelectChange}>
        <option value="Male">Male</option>{" "}
        <option value="Female">Female</option>
      </select>
      <br />
      <label>Profile image</label>
      <br />
      <input type="text"  value={img}  onChange={(e)=>setImg(e.target.value)}  />
      <br />
    
      <button onClick={()=>handelAdd()}>Regiset</button>
    </div>
  );
}

export default Register;
