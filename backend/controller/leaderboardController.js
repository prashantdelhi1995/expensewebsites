
const {Sequelize, DataTypes}= require("sequelize");
const express=require("express");
const sequelize= require("../util/database")
const Signup= require("../modal/signup")
const Expense= require("../modal/expense")

module.exports.getleaderboard=async (req,res,next)=>{

try{
 const userLeaderBoardDetails = await Signup.findAll({
  attributes: ['name', 'totalspend'],
  order: [['totalspend', 'DESC']]
})

   res.status(200).json(userLeaderBoardDetails)
  
  
  
} catch(err){
  res.status(400).json(err)
}





    // Expense.findAll({
    //     attributes: [
    //       [sequelize.fn("sum", sequelize.col("amount")), "totalExpense"],
    //       [sequelize.col("signup.name"), "name"],
    //     ],
    //     group: ["SignUpId"],
    //     include: [
    //       {
    //         model: Signup,
    //         attributes: [],
    //       },
    //     ],
    //     order: [[sequelize.fn("sum", sequelize.col("amount")), "DESC"]],
    //   })   .then((expenses) => {
    //     console.log("start",expenses," end")
    //     const result = expenses.map((expense) => ({
    //       name: expense.getDataValue("name"),
    //       amount: expense.getDataValue("totalExpense"),
    //     }));
    //     console.log(result)
    //     res.send(JSON.stringify(result));
    //   })
    //   .catch((err) => console.log(err));





    //     const userAggregatedExpenses={}
//     expenses.forEach((expense)=>{
//         if(userAggregatedExpenses[expense.SignUpId]){
//             userAggregatedExpenses[expense.SignUpId]+=expense.Amount
//         }
//         else{
//             userAggregatedExpenses[expense.SignUpId]=expense.Amount

//         }
//     })
//     const userLeaderBoardDetails=[];
//     users.forEach((user)=>{
//         userLeaderBoardDetails.push({name:user.name, total_expense:userAggregatedExpenses[user.id]})
// })
// userLeaderBoardDetails.sort((a,b)=>b.total_expense-a.total_expense);
   

   
   
    res.status(200).json(userLeaderBoardDetails)
    
    

}
