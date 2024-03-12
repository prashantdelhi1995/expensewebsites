
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
        "Welcome to our Premium Membership, You have now access to Premium exclusive Reports and LeaderBoard"
      );
     
      localStorage.setItem("token", res.data.token);
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  event.preventDefault();


}





// Load expense list initially
loadExpenseList();


  


