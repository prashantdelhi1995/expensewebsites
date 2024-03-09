const {Sequelize, DataTypes}= require("sequelize");
const sequelize= new Sequelize("expense","root","123456",{
    host: 'localhost',
    dialect: 'mysql',

});
module.exports=sequelize;
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('nodecomplete', 'root', '123456', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });
// module.exports=sequelize;