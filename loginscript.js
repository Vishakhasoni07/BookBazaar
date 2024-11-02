// Login Form Submission
const loginForm = document.getElementById('loginForm');
var isloggedIn = false;
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = JSON.parse(localStorage.getItem('user'));

        // Check if user exists and credentials are correct
        if (user && user.username === username && user.password === password) {
            isloggedIn = true;
            window.location.href = 'index.html'; // Redirect to the home page
            document.getElementsByClassName('hidden').classList.remove('hidden');
                //document.getElementById('buyNav').style.display = 'inline';
            document.getElementById('sellNav').style.display = 'inline';
                //window.location.href = 'index.html'; // Redirect to the home page
                //document.getElementById('loginBtn').textContent = 'Logout';
                //document.getElementById('welcomeMsg').textContent = `Hello ${localStorage.getItem('username')}`;
        } else {
            document.getElementById('loginError').textContent = "Invalid username or password!";
        }
        // if (isloggedIn === true) {
        //     document.getElementById('buyNav').style.display = 'inline';
        //     document.getElementById('sellNav').style.display = 'inline';
        //     //document.getElementById('loginBtn').textContent = 'Logout';
        //     //document.getElementById('welcomeMsg').textContent = `Hello ${localStorage.getItem('username')}`;
        // }
    });

    // Allow login on pressing Enter key
    loginForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit')); // Simulate form submission
        }
    });
}
