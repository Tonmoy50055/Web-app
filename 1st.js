
// ocument.addEventListener("DOMContentLoaded", () => {
//   const loginButton = document.getElementById("loginBtn");

//   loginButton.addEventListener("click", function (event) {
//     event.preventDefault(); // prevent form submission

//     const nameInput = document.getElementById("name").value.trim();
//     const emailInput = document.getElementById("email").value.trim();
//     const passwordInput = document.getElementById("password").value.trim();

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const validUser = users.find(user =>
//       user.name === nameInput && user.email === emailInput && user.password === passwordInput
//     );

//     if (validUser) {
//       alert("Login successful!");
//       localStorage.setItem("loggedInUser", JSON.stringify(validUser)); // Store user info
//       window.location.href = "dashboard.html"; // Redirect to dashboard
//     } else {
//       alert("Invalid name, email, or password. Please try again.");
//     }
//   });
// });





// document.getElementById("loginForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   try {
//     const response = await fetch("http://localhost:3003/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (data.success) {
//       alert("Login successful!");
//       localStorage.setItem("user", JSON.stringify(data.user)); // store user locally
//       window.location.href = "dashboard.html"; // redirect
//     } else {
//       alert(data.message);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Login failed. Please try again.");
//   }
// });



document.querySelector("button").addEventListener("click", async function (event) {
    event.preventDefault();
  
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
  
    try {
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        if(data.user.role==="admin")
        {
          window.location.href = "4th.html";

        }
        else{
        window.location.href = "dashboard.html";}
        
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  });
  