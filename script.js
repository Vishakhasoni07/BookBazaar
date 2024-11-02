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
            localStorage.setItem('isLoggedIn', 'true'); // Store login state
            localStorage.setItem('username', username); // Store username for display

            window.location.href = 'index.html'; // Redirect to home page
        } else {
            document.getElementById('loginError').textContent = "Invalid username or password!";
        }
        if (isloggedIn === true) {
           document.getElementById('buyNav').style.display = 'inline';
           document.getElementById('sellNav').style.display = 'inline';
            document.getElementById('loginBtn').textContent = 'Logout';
            let l= document.getElementById('loginBtn')
            console.log(l)
        document.getElementById('welcomeMsg').textContent = `Hello ${localStorage.getItem('username')}`;
         } else {
            document.getElementById('buyNav').style.display = 'none';
            document.getElementById('sellNav').style.display = 'none';
         }
    });


    // Allow login on pressing Enter key
    loginForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit')); // Simulate form submission
        }
    });

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html'; // Redirect to home page
    }
    
}

// Sell Form Submission (Add book details)
const sellForm = document.getElementById('sellForm');
if (sellForm) {
    sellForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const bookName = document.getElementById('bookName').value;
        const author = document.getElementById('author').value;
        const condition = document.getElementById('condition').value;
        const price = document.getElementById('price').value;
        const sellerName = document.getElementById('sellerName').value;
        const sellerPhone = document.getElementById('sellerPhone').value;

        // Check if all fields are filled
        if (bookName && author && condition && price && sellerName && sellerPhone) {
            const book = {
                title: bookName,
                author: author,
                condition: condition,
                price: price,
                seller: {
                    name: sellerName,
                    phone: sellerPhone
                }
            };

            // Get existing books from localStorage
            let books = JSON.parse(localStorage.getItem('books')) || [];
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));

            document.getElementById('message').textContent = "Book listed successfully!";
            document.getElementById('sellError').textContent = "";

            // Clear form fields after submission
            sellForm.reset();
        } else {
            document.getElementById('sellError').textContent = "Please fill out all fields.";
        }
    });
}

// Display books on Buy page
const booksContainer = document.querySelector('.books-container');
if (booksContainer) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <img src="book-placeholder.jpg" alt="${book.title}">
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-condition">Condition: ${book.condition}</div>
            <div class="book-price">Price: $${book.price}</div>
            <div class="book-seller">Seller: ${book.seller.name}</div>
            <div class="book-phone">Contact: ${book.seller.phone}</div>
            <div><button class="add-to-cart" onclick="addToCart(${book.title},${book.price})">Add to Cart</button></div>
            
        `;
        booksContainer.appendChild(bookCard);

    });
}
if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('buyNav').style.display = 'inline';
        document.getElementById('sellNav').style.display = 'inline';
        document.getElementById('loginBtn').textContent = 'Logout';
        document.getElementById('welcomeMsg').textContent = `Hello ${localStorage.getItem('username')}`;
    }
