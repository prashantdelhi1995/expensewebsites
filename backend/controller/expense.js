const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require("../util/database")
const Expense=require("../modal/expense")
const middleware=require("../middleware/middleware")
const Signup= require("../modal/signup")
module.exports.getExpense= async (req, res) => {
  const t= await sequelize.transaction();
    try {
      const expense = await Expense.findAll({where:{SignUpId:req.user.id},transaction:t});
  
      await t.commit();
      res.json(expense);
    } catch (error) {
      console.error('Error fetching users:', error);
      await t.rollback(); 
      
      res.status(500).json({ error: 'Error fetching users.' });
    }
  }

  module.exports.postExpense= async (req, res) => {
    const t= await sequelize.transaction();
    const { Amount, Description, categories } = req.body;
    
    try {
      console.log("value of id is >>>>>>>>>>>>>", req.user.id)
      const expense = await Expense.create({ Amount, Description, categories, SignUpId:req.user.id },{transaction:t});
      console.log(">>>>>totalspend",req.user.totalspend)
      let total_expense= Number(req.user.totalspend) + Number(Amount) ;
      console.log("***************",total_expense);
           await  req.user.update( { totalspend: total_expense},{transaction:t} );
           await t.commit();
      
    



      res.json({ message: 'User created successfully!', expense });
    } catch (error) {
      await t.rollback(); 
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user.' });
    }
  }

  module.exports.putExpense= async (req, res) => {
    const t= await sequelize.transaction();
    const id = req.params.id;
    console.log("id is",id)
    const { Amount, Description, categories } = req.body;
    try {
      const expense = await Expense.findByPk(id,{transaction:t} );
      if (!expense) {
        return res.status(404).json({ error: 'User not found' });
      }
      await expense.update({Amount, Description, categories },{transaction:t} );
      await t.commit();
      res.json({ message: 'User updated successfully!', expense });
    } catch (error) {
      console.error('Error updating user:', error);
      await t.rollback(); 
      res.status(500).json({ error: 'Error updating user.' });
    }
  }

  module.exports.DeleteExpense=async (req, res) => {
    const t= await sequelize.transaction();
    const id = req.params.id;
    try {
      const expense = await Expense.findByPk(id ,{transaction:t} );
      if (!expense) {
        return res.status(404).json({ error: 'User not found' });
      }
      await expense.destroy({transaction:t});
      await t.commit();
      res.json({ message: 'User deleted successfully!' });
    } catch (error) {
      console.error('Error deleting user:', error);
      await t.rollback(); 
      res.status(500).json({ error: 'Error deleting user.' });
    }
  }