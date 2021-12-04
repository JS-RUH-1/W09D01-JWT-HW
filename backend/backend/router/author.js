const router = require("express").Router();
const mongoose = require("mongoose");
const AuthorSchema = require("../schema/author");
const Author = mongoose.model("Author",AuthorSchema);
const seedAuthor = require("../seed.js/author_seed");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const e = require("express");

router.get("/", (req, res) => {
    Author.find({}, (err, authors) => {
      res.send(authors)
    }); 
      
//====>dont opint a gine this for add the data inside the data bais <=============
    //==> so do not delet it you need it <===

      // Author.insertMany(seedAuthor, (err, authors) => {
      //   if (err){ console.log(err)}
      //     console.log("added provided authors data", authors)
      //    });
      
  });

  //=================================================================

     //   her the post, put and the delet is by name 

  // router.post("/", (req, res) => {
  //   Author.create(req.body, function (err, res) {
  //     if (err) return (err);
  //   });
  //   res.send('done')
  // });

  // router.put("/", (req, res) => {
  //   Author.findOneAndUpdate({ name: req.body.name },
  //   { 
  //     age: req.body.age,
  //     nationality: req.body.nationality, 
  //     gender: req.body.gender,
  //     image: req.body.image
  
  //   }, () => {
  //       console.log('done')
  //   }); 
  //   res.send('done')
  // });

  // router.delete("/", (req, res) => {
  //   Author.deleteMany({ name: req.body.name}, () => {
  //   console.log('delet')
  // }); 
  //   res.send('delet')
  // });

// ==========> her by useing id <=====================
  router.get("/:id", (req, res) => {
    Author.findOne({_id: req.params.id}, (err, author) => {
      res.send(author)
    }); 
  });

  router.delete("/:id", (req, res) => {
    Author.deleteMany({ _id: req.params.id}, () => {
    console.log('deleted')
  }); 
    res.send('deleted!')
  });

// patch is for update it is semilar to put 
// but for the user 

  router.patch("/:id", (req, res) => {
    Author.findOneAndUpdate({ _id: req.params.id },
    { 
      age: req.body.age,
      nationality: req.body.nationality, 
      gender: req.body.gender,
      image: req.body.image,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
  
    }, () => {
        console.log('updated')
    }); 
  
  
    res.send('updated!')
  });

  //================= post ==========================
  //================= login part ========
  router.post('/login', (req, res) =>{

    Author.findOne({email: req.body.email}, (err, dbUser) =>{
      if(!dbUser){
        return res.status(404).json({message: "user not found"})
      }else{
        // password hash # 
        //we goin to use bcrypt for the hash pass
        bcrypt.compare(req.body.password, dbUser.password, (err, compareRes)=>{
          if (err) { // error while comparing
            res.status(502).json({message: "error while checking user password"});
        }else if (compareRes){ 
          // password match
          const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'})
          res.status(200).json({message: "user logged in", "token": token, "id": dbUser._id, "name": dbUser.name})
        }else { 
          // password doesnt match
          res.status(401).json({message: "invalid credentials"});
      };
        });
      };
    });
  });

 //================= signup part ========


  router.post('/signup', (req, res) =>{
     // checks if email already exists
     Author.findOne({email: req.body.email}, (err, dbUser)=>{
       if (dbUser){

         return res.status(409).json({message: "email already exists"})
      
        }else if(req.body.email && req.body.password){
         // password hash 
         bcrypt.hash(req.body.password, 12 , (err, passwordHash) =>{
           if (err){
             return res.status(500).json({message: "couldnt hash the password"})
           }else if (passwordHash) {
             return Author.create(({...req.body,   password: passwordHash }))
             .then(() =>{
               res.status(200).json({message: "user created"});             
             })
             .catch(err => {
              console.log(err);
              res.status(502).json({message: "error while creating the user"});  
             });
           };
         });
        }else if(!req.body.password){
          return res.status(400).json({message: "password not provided"})
        } else if (!req.body.email) {
          return res.status(400).json({message: "email not provided"});
      };
     } )
  } )
  


module.exports = router;