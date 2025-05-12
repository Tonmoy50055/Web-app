document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "admin") {
      alert("Access denied!");
      window.location.href = "1st.html";
      return;
    }

    try {
      const res = await fetch("http://localhost:3003/admin-stats");
      const stats = await res.json();

      const statBoxes = document.querySelectorAll(".card .box h1");
      statBoxes[0].textContent = stats.customers;
      statBoxes[1].textContent = stats.books;
      statBoxes[2].textContent = stats.categories;
      statBoxes[3].textContent = stats.income;
    } catch (err) {
      alert("Failed to load stats.");
      console.error(err);
    }
  });
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "1st.html";
  });