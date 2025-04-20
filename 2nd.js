const { localsAsTemplateData } = require("hbs");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelectorAll('input[type="password"]')[0].value.trim();
      const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value.trim();
  
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields!");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      // Load existing users
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check if email already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        alert("This email is already registered.");
        return;
      }
  
      // Save new user
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please log in.");
      window.location.href = "1st.html"; // login page
    });
  });
  function resetApp() {
    if (confirm("Are you sure you want to clear all app data?")) {
      localStorage.clear();
      alert("All app data cleared. Please reload the page.");
      location.reload();
    }
  }
  //
//   document.addEventListener("DOMContentLoaded",()=>{
//     const form=document.querySelector("form")
// form.addEventListener("submit",function (e){
// const name=form.querySelector('input[type="text"]').value.trim();
// const email=form.querySelector('input[type="email"]').value.trim();
// const password=form.querySelector('input[type="password"]')[0].value.trim();
// const confirmPassword=form.querySelector('input[type="password"]')[1].value.trim();
// if (!name || !email || !password || !confirmPassword){
//   alert("Please fill the requirments")
// return;
// }
//  let users= JSON.parse(localStorage.getItem("users"))||[]
//  const existinUser=users.find(users=>users.email===email)
//  if(existinUser)
//  {
// alert("Email already used")
// return;
//  }
//  users.push({name,email,password,confirmPassword})
//  localStorage.setItem("users",JSON.stringify(users))
// alert("Registration is successful")
// window.location.href=""

// })
// } )