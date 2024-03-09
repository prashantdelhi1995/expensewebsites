document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    axios.post('http://localhost:3000/user/login', {
      
        email: formData.get('email'),
        password: formData.get('password')
    })
    .then(function(response) {
        //console.log('login successful:', response.data);
        if(response.status==201){
        alert('login successful!');
        }
        else{
               alert(response.data)

        }
         
    })
    .catch(function(error) {
        alert("incorrect email or password")
     
        
    });
});