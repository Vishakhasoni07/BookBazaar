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
            <div><button class="add-to-cart">Add to Cart</button></div>
            
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
    // script.js
// let cart = [];
// let total = 0;
// console.log("Hello");

// let add_cart_btn = document.querySelector(".add-to-cart");
// add_cart_btn.addEventListener("click", (e) => {
//     console.log("Hi");
//     console.log(e);
//     console.log("Hi");
// });


// function addToCart(productName, productPrice) {
//     // Add product to cart
//     cart.push({ name: productName, price: productPrice });
//     total += productPrice;

//     // Update cart display
//     updateCartDisplay();
//     let items = document.querySelector(".product");
//     console.log(items);
// }

// function updateCartDisplay() {
//     const cartItems = document.getElementById('cart-items');
//     const totalPrice = document.getElementById('total-price');

//     // Clear current cart items
//     //cartItems.innerHTML = '';

//     // Add each item to the cart display
//     cart.forEach(item => {
//         const li = document.createElement('li');
//         li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
//         cartItems.appendChild(li);
//         // add to cart button
        
//     });

//     // Update total price
//     totalPrice.textContent = `Total: $${total.toFixed(2)}`;
// }



// let add_cart_btns = document.querySelectorAll(".add-to-cart");



// let btn = document.querySelector(".btn-event-handler");
// btn.addEventListener("click", ()=>{
//     console.log("clicked")
// })

// script for cart
let add_cart_btns = document.querySelectorAll('.add-to-cart');
let books_in_cart = [];
let books_in_buy = JSON.parse(localStorage.getItem('books'));
let books_in_cart_ls = JSON.parse(localStorage.getItem('books_in_cart')) || [];
for(let i=0;i<add_cart_btns.length;i++)
{
    
    add_cart_btns[i].addEventListener('click', ()=>{
        books_in_cart.push(books_in_buy[i]);
        add_cart_btns[i].disabled = true;
        
        localStorage.setItem('books_in_cart', JSON.stringify(books_in_cart));
    })
        

    
}
// let books_in_cart_ls = JSON.parse(localStorage.getItem('books_in_cart')) || [];
// books_in_cart.forEach(book=>{books_in_cart_ls.push(book);
// localStorage.setItem('books_in_cart', JSON.stringify(books_in_cart_ls));})

// display books in cart
let total_price = 0.0;
const total_price_el = document.querySelector('#total-price');
const products = document.querySelector('.products');
if (products) {
    // const books_in_cart_ls = JSON.parse(localStorage.getItem('books_in_cart')) || [];
    
    books_in_cart_ls.forEach(book => {
        total_price += Number(book.price);
        const product = document.createElement('div');
        product.classList.add('product');
        
        product.innerHTML = `
          
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-condition">Condition: ${book.condition}</div>
            <div class="book-price">Price: $${book.price}</div>
            <div class="book-seller">Seller: ${book.seller.name}</div>
            <div class="book-phone">Contact: ${book.seller.phone}</div>
            <div><button class="remove-from-cart">Remove</button></div>
            
        `;
        products.appendChild(product);

    });
    
    total_price_el.innerHTML = `Total : $${total_price}`;
}
const product_els = document.querySelectorAll('.product');
let remove_btns = document.querySelectorAll('.remove-from-cart');
// const books_in_cart_ls = JSON.parse(localStorage.getItem('books_in_cart')) || [];

for(let i =0;i<remove_btns.length;i++)
{
    remove_btns[i].addEventListener('click', ()=>{
    
    product_els[i].innerHTML = '';
    product_els[i].style.border = 'none';
    // document.remove(product_els[i]);
    let books_in_cart_ls = JSON.parse(localStorage.getItem('books_in_cart')) || [];
    // delete books_in_cart_ls[i];
    total_price -= Number(books_in_cart_ls[i].price);
    total_price_el.innerHTML = `Total : $${total_price}`;
    books_in_cart_ls.splice(i,1);
    
    localStorage.setItem('books_in_cart', JSON.stringify(books_in_cart_ls));
    
    // let total_price = 0.0;
    // books_in_cart_ls.forEach(book => {
    //     total_price += Number(book.price);
    //     const product = document.createElement('div');
    //     product.classList.add('product');
        
    //     product.innerHTML = `
          
    //         <div class="book-title">${book.title}</div>
    //         <div class="book-author">by ${book.author}</div>
    //         <div class="book-condition">Condition: ${book.condition}</div>
    //         <div class="book-price">Price: $${book.price}</div>
    //         <div class="book-seller">Seller: ${book.seller.name}</div>
    //         <div class="book-phone">Contact: ${book.seller.phone}</div>
    //         <div><button class="remove-from-cart">Remove</button></div>
            
    //     `;
    //     products.appendChild(product);})
    })
}
