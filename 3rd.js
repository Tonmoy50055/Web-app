document.querySelectorAll('.addcart-btn').forEach(button => {
    button.addEventListener('click', () => {
      let title1 = button.getAttribute('data-title');
      alert(`${title1} added to cart.`);
      // Optional: store to localStorage
    });
  });

  // Rent logic with price
  document.querySelectorAll('.rent-btn').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');
      const price = parseFloat(button.getAttribute('data-price'));
      const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
      if (!currentUser) {
        alert("Please log in to rent a book.");
        window.location.href = "1st.html";
        return;
      }
  
      const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
  
      rentals.push({
        email: currentUser.email,
        bookTitle: title,
        rentalPrice: price,
        rentalDate: new Date().toISOString().split('T')[0]
      });
  
      localStorage.setItem('rentals', JSON.stringify(rentals));
      alert(`${title} has been rented successfully for $${price}!`);
    });
  });