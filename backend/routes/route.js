const express= require("express");
const route= express.Router();
const {Sequelize, DataTypes}= require("sequelize");
const sequelize= require("../util/database")
const Signup= require("../modal/signup")
const bcrypt = require("bcrypt");
route.post("/user/signup",async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log("*********.......",name  ,email, password)
    try {

        const existingUser = await Signup.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).send('Email already exists');
          }
          bcrypt.hash(password,10,async(err,hash)=>{
            const SignUp = await Signup.create({ name,email,password:hash });
        return res.status(201).json(SignUp);

          })
       
        //res.json({ message: 'User created successfully!', expense });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user.' });
      }
    


    });
    route.post("/user/login",async(req,res,next)=>{
      const {email,password}=req.body;
      console.log("*********......."  ,email, password)
      try {
       
    
        await Signup.findOne({ where: { email: email } }).then((user) => {
          if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                return res
                  .status(500)
                  .json({ success: false, message: "Something went Wrong!" });
              }
              if (result == true) {
        
                return res.status(200).json({
                  success: true,
                  message: "Login Successful!",
                
                });
              } else {
                return res.status(401).json({
                  success: false,
                  message: "Password Incorrect!",
                });
              }
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "User doesn't Exists!",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    


          
            
          
       
      
route.get("/",(req,res)=>{
    res.send("<h1>hiii everyone</h1>")
})





module.exports=route;