

const express=require("express");
const sequelize= require("../util/database")
const Signup= require("../modal/signup")
const Expense= require("../modal/expense")

module.exports.getleaderboard=async (req,res,next)=>{
    const expenses= await Expense.findAll();
    const users= await Signup.findAll();
    const userAggregatedExpenses={}
    expenses.forEach((expense)=>{
        if(userAggregatedExpenses[expense.SignUpId]){
            userAggregatedExpenses[expense.SignUpId]+=expense.Amount
        }
        else{
            userAggregatedExpenses[expense.SignUpId]=expense.Amount

        }
    })
    const userLeaderBoardDetails=[];
    users.forEach((user)=>{
        userLeaderBoardDetails.push({name:user.name, total_expense:userAggregatedExpenses[user.id]})
})
userLeaderBoardDetails.sort((a,b)=>b.total_expense-a.total_expense);
   

   
   
    res.status(200).json(userLeaderBoardDetails)
    
    

}
