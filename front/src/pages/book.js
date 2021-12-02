
// Note : in this component i used 2 get request  from  backend
// i know i can get it using only 1 route however to insure all requirment 
// for the HW is done i used this way 




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Book(props) {
  const [data, setData] = useState([]);
  //to make useNavgition route from bookInfo to AutorInfo :)
  const [autorInfo,setAutorInfo] =useState([]);

  const navigate = useNavigate();

  const fetchApi = () => {

    //please read note in line 1 to understand why we have 2 fetch
    axios.get("http://localhost:8080/").then((res) => {
      setAutorInfo(res.data);
     console.log("no data", res.data)})

    //please read note in line 1 to understand why we have 2 fetch
     axios.get("http://localhost:8080/books").then((res) => {
      setData(res.data);
      console.log("no data", res.data);
    });
  };

  const findAuthor = (e)=>{
    let index = 0 ;
   console.log("this is info",autorInfo)
  
    autorInfo.map((i,myIndex)=>{
     i.books.map((b)=>{ return(b.title==e.title)?index=i:0}) 
  })
 
  navigate(`/Book/${e._id}`, { state: [e,index] })

}


  useEffect(() => {
    
    fetchApi();

  }, []);



  return (
    <div class="container">
      <div class="row">
        {data.map((e) => (
          <div class="col ">
            <div class="card m-5" style={{ width: "20rem" }}>
              <img
                src={e.image}
                class="card-img-top"
                alt="..."
                height={300}
                style={{ objectFit: "contain",paddingTop:5, }}
              />
              <div class="card-body">
                <h5 class="card-title">{e.title.toUpperCase()}</h5>
                <hr />
                <h6 class="card-text">Price: {e.price}</h6>
                <hr />
                <a
                  onClick={() => findAuthor(e) }
                  class="btn btn-primary m-2"
                >
                  More
                </a>
          
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;
