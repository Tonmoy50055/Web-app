// function Switchpage(){ 
//   const type=document.getElementById("bookType");
//   const switchPage=type.value;
//   if(switchPage){
//     window.location.href=switchPage
//   }
// }
//   // function searchProducts() {
//   //           const input = document.getElementById("search").value.toLowerCase();
//   //           const products = document.querySelectorAll(".productitem");
//   //           products.forEach(product => {
//   //               const title = product.querySelector(".producttitle").textContent.toLowerCase();
//   //               product.style.display = title.includes(input) ? "block" : "none";
//   //           });
//   //       }
// function searchProducts() {
//   const query = document.getElementById('search').value.trim();
//   if (!query) {
//     loadAllBooks();
//     return;
//   }

//   fetch(`/search?query=${encodeURIComponent(query)}`)
//     .then(res => res.json())
//     .then(books => renderBooks(books))
//     .catch(err => console.error('Search error:', err));
// }

// function loadAllBooks() {
//   fetch('/books')
//     .then(res => res.json())
//     .then(books => renderBooks(books))
//     .catch(err => console.error('Error loading books:', err));
// }

// // Shared rendering function
// function renderBooks(books) {
//   const productList = document.getElementById('productlist');
//   productList.innerHTML = '';

//   if (books.length === 0) {
//     productList.innerHTML = '<p>No books found.</p>';
//     return;
//   }

//   books.forEach(book => {
//     const div = document.createElement('div');
//     div.className = 'productitem';
//     div.innerHTML = `
//       <img src="${book.image_url || 'placeholder.jpg'}" alt="Product Image">
//       <h2 class="producttitle">${book.title}</h2>
//       <div class="rating">
//         <i class="fas fa-star"></i><i class="fas fa-star"></i>
//         <i class="fas fa-star"></i><i class="fas fa-star"></i>
//         <i class="fas fa-star-half-alt"></i><span>(${book.rating_count || 0})</span>
//       </div>
//       <span class="product-price">$${book.price.toFixed(2)}</span>
//       <button class="addcart-btn" data-book-id="${book.id}">
//         <i class="fas fa-cart-plus"></i> Add to Cart
//       </button><br>
//       <span class="rental-price">Rent: $${(book.rental_price || book.price).toFixed(2)}</span>
//       <button class="rent-btn" data-book-id="${book.id}" data-price="${book.rental_price || book.price}">
//         <i class="fas fa-book-open"></i> Rent
//       </button>
//     `;
//     productList.appendChild(div);
//   });

//   attachButtonEvents(); // Important!
// }


// document.querySelectorAll('.addcart-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const productName = button.parentElement.querySelector('.producttitle').innerText;
//       const price = button.parentElement.querySelector('.product-price').innerText.replace('$', '');

//       fetch('http://localhost:3307/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include', // ensures cookies/sessions are sent
//         body: JSON.stringify({
//           title: productName,
//           price: parseFloat(price)
//         })
//       })
//       .then(res => res.json())
//       .then(data => alert('Added to cart!'))
//       .catch(err => alert('Failed to add to cart'));
//     });
//   });

//   // Rent Book
//   document.querySelectorAll('.rent-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const title = button.getAttribute('data-title');
//       const price = button.getAttribute('data-price');

//       fetch('http://localhost:3307/rentals', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: title,
//           price: parseFloat(price)
//         })
//       })
//       .then(res => res.json())
//       .then(data => alert('Book rented successfully!'))
//       .catch(err => alert('Failed to rent book'));
//     });
//   });

//   // Optional: Search functionality (simple client-side filter)
//   function searchProducts() {
//     const input = document.getElementById('search').value.toLowerCase();
//     document.querySelectorAll('.productitem').forEach(item => {
//       const title = item.querySelector('.producttitle').innerText.toLowerCase();
//       item.style.display = title.includes(input) ? 'block' : 'none';
//     });
//   }

//   // Category page switcher
//   function Switchpage() {
//     const selected = document.getElementById('bookType').value;
//     if (selected !== 'all') window.location.href = selected;
//   }



// document.querySelectorAll('.addcart-btn').forEach(button => {
//     button.addEventListener('click', () => {
//         // Get book ID and other data
//         const bookId = button.parentElement.getAttribute('data-book-id'); // Assuming bookId is stored in a data attribute
//         const productName = button.parentElement.querySelector('.producttitle').innerText;
//         const price = button.parentElement.querySelector('.product-price').innerText.replace('$', '');
        
//         // Assume you have the userId stored in localStorage or a session
//         const userId = localStorage.getItem('userId'); // Or get from session, e.g., req.session.userId on backend

//         if (!userId) {
//             alert('Please log in to add items to your cart.');
//             return;
//         }

//         // Make the POST request to add the item to the cart
//         fetch('http://localhost:3307/cart', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include', // ensures cookies/sessions are sent
//             body: JSON.stringify({
//                 userId: userId,  // Send userId from session or localStorage
//                 bookId: bookId   // Send the correct bookId
//             })
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.success) {
//                 alert(`"${productName}" has been added to your cart for $${price}`);
//             } else {
//                 alert('Something went wrong. Please try again.');
//             }
//         })
//         .catch(err => {
//             console.error('Error adding product to cart:', err);
//             alert('Something went wrong. Please try again.');
//         });
//     });
// });





document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please log in first.");
    window.location.href = "1st.html";  // Redirect to login if not logged in
    return;
  }

  const userId = loggedInUser.id;

  // Rent a book using book title
  document.querySelectorAll(".rent-btn").forEach(button => {
    button.addEventListener("click", () => {
      const bookCard = button.closest(".book-card");
      const bookTitle = bookCard.getAttribute("data-title");
      const rentText = bookCard.querySelector("p:nth-of-type(2)").textContent;
      const price = parseFloat(rentText.replace(/[^\d.]/g, "")); // Extract price

      const rentalDate = new Date();
      const returnDate = new Date(rentalDate);
      returnDate.setDate(rentalDate.getDate() + 7);

      // Convert dates to MySQL DATETIME/DATE format
      const rentalDateStr = rentalDate.toISOString().slice(0, 19).replace("T", " ");
      const returnDateStr = returnDate.toISOString().slice(0, 10);

      fetch("/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          bookTitle,
          rentalDate: rentalDateStr,
          returnDate: returnDateStr,
          price
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(`Successfully rented '${bookTitle}' for ₹${price}. Rental period: ${rentalDateStr} to ${returnDateStr}`);
        } else {
          alert(data.message || "Something went wrong while renting the book.");
        }
      })
      .catch(err => {
        console.error("Rental error:", err);
        alert("An error occurred while renting the book.");
      });
    });
  });

  // Add to cart using book title
  document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const bookCard = button.closest(".book-card");
      const bookTitle = bookCard.getAttribute("data-title");

      fetch("/cart/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookTitle })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(`'${bookTitle}' has been added to your cart.`);
        } else {
          alert(data.message || "Something went wrong while adding the book to the cart.");
        }
      })
      .catch(err => {
        console.error("Cart error:", err);
        alert("An error occurred while adding the book to the cart.");
      });
    });
  });
});




























                                 // 

// function addToRentals(bookId) {
//     fetch('/rentals', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ bookId: bookId })
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Book rented successfully!');
//         // Optionally update the UI to show this change
//     })
//     .catch(error => console.error('Error:', error));
// }

// // Function to handle adding a book to the cart
// function addToCart(bookId) {
//     fetch('/cart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ bookId: bookId })
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Book added to cart!');
//         // Optionally update the UI to show this change
//     })
//     .catch(error => console.error('Error:', error));
// }
// document.querySelectorAll('.addcart-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       let title1 = button.getAttribute('data-title');
//       alert(`${title1} added to cart.`);
//       // Optional: store to localStorage
//     });
//   });

//   // Rent logic with price
//   document.querySelectorAll('.rent-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const title = button.getAttribute('data-title');
//       const price = parseFloat(button.getAttribute('data-price'));
//       const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
//       if (!currentUser) {
//         alert("Please log in to rent a book.");
//         window.location.href = "1st.html";
//         return;
//       }
  
//       const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
//       rentals.push({
//         email: currentUser.email,
//         bookTitle: title,
//         rentalPrice: price,
//         rentalDate: new Date().toISOString().split('T')[0]
//       });
  
//       localStorage.setItem('rentals', JSON.stringify(rentals));
//       alert(`${title} has been rented successfully for $${price}!`);
//     });
//   });