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
let cart = [];
let total = 0;
console.log("Hello");

let add_cart_btn = document.querySelector(".add-to-cart");
add_cart_btn.addEventListener("click", (e) => {
    console.log("Hi");
    console.log(e);
    console.log("Hi");
});


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



let btn = document.querySelector(".btn-event-handler");
btn.addEventListener("click", ()=>{
    console.log("clicked")
})
