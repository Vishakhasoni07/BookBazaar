// Register Form Submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const name = document.getElementById('regName').value;
        const gender = document.getElementById('regGender').value;
        const education = document.getElementById('regEducation').value;
        const phone = document.getElementById('regPhone').value;
        const email = document.getElementById('regEmail').value;

        // Check if all fields are filled
        if (username && password && name && gender && education && phone && email) {
            // Save user info to local storage
            const user = {
                username,
                password,
                name,
                gender,
                education,
                phone,
                email
            };

            localStorage.setItem('user', JSON.stringify(user));

            document.getElementById('registerSuccess').textContent = "Registration successful!";
            document.getElementById('registerError').textContent = "";
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); 
        } else {
            document.getElementById('registerError').textContent = "Please fill out all fields.";
        }
    });
}
