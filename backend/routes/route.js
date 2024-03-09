const express= require("express");
const route= express.Router();
const {Sequelize, DataTypes}= require("sequelize");
const sequelize= require("../util/database")
const Signup= require("../modal/signup")
route.post("/user/signup",async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log("*********.......",name  ,email, password)
    try {

        const existingUser = await Signup.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).send('Email already exists');
          }
        const SignUp = await Signup.create({ name,email,password });
        return res.status(201).json(SignUp);
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
  
        const loginUser = await Signup.findOne({ where: { email: email, password: password } });

          if (loginUser) {
              return res.status(201).send('user log in successfully');
            }
            else {
              res.send("incorrect id or password")
            }
            
          
        } catch (error) {
          console.error('email id and password is incorrect:', error);
          res.status(500).json({ error: 'Error log in user.' });
        } })
      
route.get("/",(req,res)=>{
    res.send("<h1>hiii everyone</h1>")
})





module.exports=route;