const {Sequelize, DataTypes}= require("sequelize");
const sequelize= require ("../util/database.js");
const Signup = sequelize.define('SignUp', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  module.exports=Signup;