document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    axios.post('http://localhost:3000/user/signup', {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })
    .then(function(response) {
        console.log('Signup successful:', response.data);
        alert('Signup successful!');
        // Redirect or do something else after successful signup
    })
    .catch(function(error) {
        console.error('Signup failed:', error.response.data);
        alert('Signup failed: ' + error.response.data);
    });
});