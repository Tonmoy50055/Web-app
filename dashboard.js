// document.addEventListener('DOMContentLoaded', () => {
  
//   const rentals = [
//       { title: 'The Great Gatsby', dueDate: '2025-04-25' },
//       { title: '1984', dueDate: '2025-04-20' },
//     ];
  
//     const rentalList = document.querySelector('.rental-items');
  
//     rentals.forEach(book => {
//       const li = document.createElement('li');
//       li.textContent = `${book.title} - Due: ${book.dueDate}`;
//       rentalList.appendChild(li);
//     });
//     const user=JSON.parse(localStorage.getItem("loggedInUser"))
//   document.getElementById("username").textContent = user.name;  
//   });
// Fetch the logged-in user
let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Update the welcome message
if (currentUser && currentUser.name) {
  document.querySelector('.welcome-box h2').textContent = `Hello, ${currentUser.name}!`;
} else {
  // Redirect to login if not logged in
  alert("You must be logged in to view the dashboard.");
  window.location.href = "1st.html";
}

// Load rented books
const rentalsList = document.querySelector('.rental-items');
const allRentals = JSON.parse(localStorage.getItem('rentals')) || [];

const userRentals = allRentals.filter(rental => rental.email === currentUser.email);

if (userRentals.length === 0) {
  rentalsList.innerHTML = "<li>You have no rentals currently.</li>";
} else {
  userRentals.forEach(rental => {
    const li = document.createElement('li');
    li.textContent = rental.bookTitle;
    rentalsList.appendChild(li);
  });
}

// Logout link
document.querySelectorAll('.sidebar ul li a').forEach(link => {
  if (link.textContent.toLowerCase() === "logout") {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = "1st.html";
    });
  }
});
