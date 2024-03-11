const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require("../util/database")
const Expense=require("../modal/expense")
const middleware=require("../middleware/middleware")
module.exports.getExpense= async (req, res) => {
    try {
      const expense = await Expense.findAll({where:{SignUpId:req.user.id}});
      res.json(expense);
    } catch (error) {
      console.error('Error fetching users:', error);
      
      res.status(500).json({ error: 'Error fetching users.' });
    }
  }

  module.exports.postExpense= async (req, res) => {
    const { Amount, Description, categories } = req.body;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",Amount,Description,categories)
    try {
      console.log("value of id is >>>>>>>>>>>>>", req.user.id)
      const expense = await Expense.create({ Amount, Description, categories, SignUpId:req.user.id });
      res.json({ message: 'User created successfully!', expense });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user.' });
    }
  }

  module.exports.putExpense= async (req, res) => {
    const id = req.params.id;
    console.log("id is",id)
    const { Amount, Description, categories } = req.body;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).json({ error: 'User not found' });
      }
      await expense.update({Amount, Description, categories });
      res.json({ message: 'User updated successfully!', expense });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user.' });
    }
  }

  module.exports.DeleteExpense=async (req, res) => {
    const id = req.params.id;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        return res.status(404).json({ error: 'User not found' });
      }
      await expense.destroy();
      res.json({ message: 'User deleted successfully!' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user.' });
    }
  }