
let token=localStorage.getItem("token")
const form1 = document.getElementById("form");
form1.addEventListener("submit", function (e) {
    e.preventDefault();
    let amount = e.target.amountinput.value;
    let description = e.target.descriptioninput.value;
    let categories = e.target.categories.value;

    let obj = {
        "Amount": amount,
        "Description": description,
        "categories": categories
    };
    console.log(obj)

    axios.post("http://localhost:3000/add-expense", obj, { headers:{'Authorization':token}})
    .then(res => {
      
        // Clear form fields after successful submission
        e.target.amountinput.value = '';
        e.target.descriptioninput.value = '';
        e.target.categories.value = '';
        // Reload expense list after adding new expense
        loadExpenseList();
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
});



//Function to load and display the expense list
function loadExpenseList() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ''; // Clear previous content
    //let token=localStorage.getItem("token")
    console.log("???????????????>>>>>>>>>>",token)

    axios.get("http://localhost:3000/get-expense", { headers:{'Authorization':token}})
    .then(res => {
        console.log(res.data)
        res.data.forEach(expense => {
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `
                <p>Amount: ${expense.Amount}
                Description: ${expense.Description}
                Categories: ${expense.categories}
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button></p>
               
            `;
            expenseList.appendChild(expenseItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Function to edit an expense
function editExpense(id) {
 




    // Add your edit logic here
    console.log('Editing expense with ID:', id);
}

// Function to delete an expense
function deleteExpense(id) {

axios.delete(`http://localhost:3000/delete-expense/${id}`).then(res=>{
  loadExpenseList()

}) 
    // Add your delete logic here
    console.log('Deleting expense with ID:', id);
}
async function handleLeadorboard(event){
  const res=await axios.get("http://localhost:3000/leaderboardrd")
  const ul=document.getElementById("leaderboard");
  ul.innerHTML="";
  console.log(res.data)
  res.data.forEach((expenseDetails)=>{
    const name=  expenseDetails.name;
  const totalExpense= expenseDetails.amount
  const li=document.createElement("li");
  li.innerHTML=` ${name} ${totalExpense}`
 
  ul.appendChild(li)

  })
 
  
}





async function handleOnClick(event){
    console.log("click")
    //const token = localStorage.getItem("token");
  const res = await axios.get(
    "http://localhost:3000/purchase/premiumMembership",
    { headers: { Authorization: token } }
  );
  console.log(res);
  var options = {
    key: res.data.key_id,
    order_id: res.data.order.id, // For one time payment
    // This handler function will handle the success payment
    handler: async function (response) {
      const res = await axios.post(
        "http://localhost:3000/purchase/updateTransactionStatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      console.log(res);
      alert(
        `Welcome to our Premium Membership,
         You have now access to Premium exclusive
          Reports and LeaderBoard`
      );
     
      localStorage.setItem("token", res.data.token);
      const buyPremium=document.getElementById("buyPremium");
      buyPremium.style.visibility = "hidden";
      document.getElementById("message").innerHTML="You are a premium user"
     






    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  event.preventDefault();


}
window.addEventListener("DOMContentLoaded",()=>{
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
 
  


   const isPremiumUser=parseJwt(token).isPremiumUser
   if (isPremiumUser){
    const buyPremium=document.getElementById("buyPremium");
    buyPremium.style.visibility = "hidden";
    document.getElementById("message").innerHTML="You are a premium user"

   }





})








// Load expense list initially
loadExpenseList();


  


