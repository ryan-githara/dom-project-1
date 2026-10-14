// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {

  // Get all buttons
  const plusBtns = document.querySelectorAll(".fa-plus-circle");
  const minusBtns = document.querySelectorAll(".fa-minus-circle");
  const deleteBtns = document.querySelectorAll(".fa-trash-alt");
  const likeBtns = document.querySelectorAll(".fa-heart");
  const totalPriceElement = document.querySelector(".total");

  // Function to calculate total price - Requirement: See total price adjusted
  function updateTotal() {
    let total = 0;
    // Get all cards that still exist
    const allCards = document.querySelectorAll(".card");
    
    allCards.forEach(card => {
      const qte = parseInt(card.querySelector(".quantity").innerText);
      const unitPrice = parseInt(card.querySelector(".unit-price").innerText.replace("$", "").trim());
      total += qte * unitPrice;
    });
    
    totalPriceElement.innerText = `${total} $`;
  }

  // 1. PLUS BUTTON - Adjust quantity through "+"
  plusBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Find the quantity span in the same card
      const qteSpan = this.parentElement.querySelector(".quantity");
      let qte = parseInt(qteSpan.innerText);
      qte++;
      qteSpan.innerText = qte;
      updateTotal(); // update total after change
    });
  });

  // 2. MINUS BUTTON - Adjust quantity through "-"
  minusBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const qteSpan = this.parentElement.querySelector(".quantity");
      let qte = parseInt(qteSpan.innerText);
      // Prevent negative quantity
      if (qte > 0) {
        qte--;
        qteSpan.innerText = qte;
        updateTotal();
      }
    });
  });

  // 3. DELETE BUTTON - Delete items from cart
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const product = this.closest(".card").parentElement;
      product.remove();
      updateTotal();
    });
  });

  // 4. LIKE BUTTON - Like through heart button that changes color
  likeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      this.classList.toggle("liked");
    });
  });

});