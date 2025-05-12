// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = form.querySelector('input[type="text"]').value.trim();
//     const email = form.querySelector('input[type="email"]').value.trim();
//     const password = form.querySelectorAll('input[type="password"]')[0].value.trim();
//     const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value.trim();

//     // Validation
//     if (!name || !email || !password || !confirmPassword) {
//       alert("Please fill all fields!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     // Load existing users
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if email already exists
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//       alert("This email is already registered.");
//       return;
//     }

//     // Save new user
//     users.push({ name, email, password });
//     localStorage.setItem("users", JSON.stringify(users));
//     alert("Registration successful! Please log in.");
//     window.location.href = "1st.html"; // Go to login page
//   });
// });

// // Optional reset function (if you need it later)
// function resetApp() {
//   if (confirm("Are you sure you want to clear all app data?")) {
//     localStorage.clear();
//     alert("All app data cleared. Please reload the page.");
//     location.reload();
//   }
// }










//
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelectorAll('input[type="password"]')[0].value.trim();
      const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value.trim();
  
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields!");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3003/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
  
        const data = await response.json();
        alert(data.message);
        if (response.ok) 
          {window.location.href = "1st.html";}
      } catch (error) {
        alert("Something went wrong. Try again.");
      }
    });
  });
  