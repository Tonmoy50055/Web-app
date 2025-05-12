// // document.addEventListener('DOMContentLoaded', () => {
  
// //   const rentals = [
// //       { title: 'The Great Gatsby', dueDate: '2025-04-25' },
// //       { title: '1984', dueDate: '2025-04-20' },
// //     ];
  
// //     const rentalList = document.querySelector('.rental-items');
  
// //     rentals.forEach(book => {
// //       const li = document.createElement('li');
// //       li.textContent = `${book.title} - Due: ${book.dueDate}`;
// //       rentalList.appendChild(li);
// //     });
// //     const user=JSON.parse(localStorage.getItem("loggedInUser"))
// //   document.getElementById("username").textContent = user.name;  
// //   });
// // Fetch the logged-in user
// let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

// // Update the welcome message
// if (currentUser && currentUser.name) {
//   document.querySelector('.welcome-box h2').textContent = `Hello, ${currentUser.name}!`;
// } else {
//   // Redirect to login if not logged in
//   alert("You must be logged in to view the dashboard.");
//   window.location.href = "1st.html";
// }

// // Load rented books
// const rentalsList = document.querySelector('.rental-items');
// const allRentals = JSON.parse(localStorage.getItem('rentals')) || [];

// const userRentals = allRentals.filter(rental => rental.email === currentUser.email);

// if (userRentals.length === 0) {
//   rentalsList.innerHTML = "<li>You have no rentals currently.</li>";
// } else {
//   userRentals.forEach(rental => {
//     const li = document.createElement('li');
//     li.textContent = rental.bookTitle;
//     rentalsList.appendChild(li);
//   });
// }

// // Logout link
// document.querySelectorAll('.sidebar ul li a').forEach(link => {
//   if (link.textContent.toLowerCase() === "logout") {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       localStorage.removeItem('currentUser');
//       window.location.href = "1st.html";
//     });
//   }
// });
// function clear(){
//   // localStorage.removeItem("userRentals");
//   if (confirm("Are you sure you want to clear all app data?")) 
//           localStorage.clear();
//           alert("All app data cleared. Please reload the page.");
//           location.reload();

// }


//
// const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

// fetch(`/rentals/${user.id}`)
//   .then(res => res.json())
//   .then(rentals => {
//     const container = document.getElementById("my-rentals");
//     container.innerHTML = rentals.map(rental => `
//       <div class="rental-item">
//         <img src="${rental.image_url || 'placeholder.jpg'}" alt="${rental.title}">
//         <h3>${rental.title}</h3>
//         <p>Rented on: ${rental.rent_date}</p>
//         <p>Return by: ${rental.return_date}</p>
//         <p>Price: $${rental.price.toFixed(2)}</p>
//       </div>
//     `).join('');
//   });


document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = '1st.html'; // redirect if not logged in
    return;
  }

  document.getElementById('userName').innerText = user.name;
  document.getElementById('userEmail').innerText = user.email;

  // Fetch Rentals
  fetch(`http://localhost:3003/user/${user.id}/rentals`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('rentalsList');
      list.innerHTML = "";
      if (data.length === 0) return list.innerText = "No current rentals.";
      data.forEach(book => {
        const item = document.createElement('div');
        item.className = 'book-item';
        item.innerText = `${book.title} (${book.rental_date})`;
        list.appendChild(item);
      });
    });

  // Fetch Cart
  fetch(`http://localhost:3003/user/${user.id}/cart`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('cartList');
      list.innerHTML = "";
      if (data.length === 0) return list.innerText = "Your cart is empty.";
      data.forEach(book => {
        const item = document.createElement('div');
        item.className = 'book-item';
        item.innerText = `${book.title}`;
        list.appendChild(item);
      });
    });

  // Logout functionality
  logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Logout clicked"); // <-- Add this
  localStorage.removeItem("loggedInUser");
  window.location.href = "1st.html";
});
});



// document.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in first.");
//       window.location.href = "1st.html"; // redirect to login
//       return;
//     }

//     // Fetch dashboard stats
//     fetch("/dashboard/stats", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const statsContainer = document.querySelector(".dashboard-stats");
//         statsContainer.innerHTML = `
//           <div class="stat-box">
//             <h3>Total Rentals</h3>
//             <p>${data.totalRentals || 0}</p>
//           </div>
//           <div class="stat-box">
//             <h3>Total Cart Items</h3>
//             <p>${data.totalCartItems || 0}</p>
//           </div>
//           <div class="stat-box">
//             <h3>Total Books</h3>
//             <p>${data.totalBooks || 0}</p>
//           </div>
//         `;
//       })
//       .catch((err) => console.error("Stats Error:", err));

//     // Fetch recent rentals
//     fetch("/rentals/recent", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((rentals) => {
//         const rentalsContainer = document.querySelector(".rented-books");
//         if (rentals.length === 0) {
//           rentalsContainer.innerHTML = "<p>No rentals yet.</p>";
//         } else {
//           rentalsContainer.innerHTML = rentals.map(rental => `
//             <div class="rental-card">
//               <h3>${rental.title}</h3>
//               <p>Author: ${rental.author}</p>
//               <p>Price: ₹${rental.rental_price}</p>
//               <p>Date: ${new Date(rental.rental_date).toLocaleDateString()}</p>
//             </div>
//           `).join('');
//         }
//       })
//       .catch((err) => console.error("Rentals Error:", err));

//     // Fetch rental/cart history
//     fetch("/history", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((history) => {
//         const historyContainer = document.querySelector(".history-items");
//         if (history.length === 0) {
//           historyContainer.innerHTML = "<p>No history available.</p>";
//         } else {
//           historyContainer.innerHTML = history.map(item => `
//             <div class="history-card">
//               <h3>${item.title}</h3>
//               <p>Author: ${item.author}</p>
//               <p>Price: ₹${item.rental_price}</p>
//               <p>Date: ${new Date(item.rental_date).toLocaleDateString()}</p>
//             </div>
//           `).join('');
//         }
//       })
//       .catch((err) => console.error("History Error:", err));
//   });