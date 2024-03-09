const express= require("express");
const bodyParser=require("body-parser");
const sequelize= require ("./util/database.js");
const {Sequelize, DataTypes}= require("sequelize");
const route= require("./routes/route");
const app= express();
const cors=require("cors");
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
app.use((req,res,next)=>{
    res.send("<h2>wrong page...</h2>")
});


(async () => {
    try {
      await sequelize.sync({force:true});
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
