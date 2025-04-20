// document.getElementById("loginBtn").addEventListener("click",function(){

// const Email=document.getElementById("email").value.trim();
// const Password=document.getElementById("password").value.trim();
// if(Email===""|| Password==="")
// {

//     alert("Please enter valid email and password")
//     return;
// }

// if(Email==="tonmoy10@gmail.com" && Password==="1234")
// {

//     window.location.href="dashboard.html";
// }
// else {
//     alert("Invalid email or password");
//   }
// }
// )
document.querySelector("button").addEventListener("click", function (event) {
    event.preventDefault(); // prevent default form submission
  
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const validUser = users.find(
      (user) => user.email === emailInput && user.password === passwordInput
    );
  
    if (validUser) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(validUser)); // Optional: for dashboard use
      window.location.href = "dashboard.html"; //  dashboard file
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });