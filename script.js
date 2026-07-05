<script src="script.js"></script>
const addButtons = document.querySelectorAll('.add-btn');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

let cart =[];

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.parentElement;
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.quantity}
      <button onclick="removeItem('${item.name}')">🗑️</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = total;
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  let cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>No items in cart.</p>';
    return;
  }

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <p>${index + 1}. ${item.name} - ₹${item.price}</p>
    `;
  });
}

// Display items even after refresh
displayCart();

    const cartContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      cartContainer.innerHTML = cart.map(item => `
        <div>
          ${item.name} - $${item.price} × ${item.quantity}
        </div>
      `).join('');

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartContainer.innerHTML += `<p><strong>Total: $${total}</strong></p>`;
    }

    document.getElementById('checkout').addEventListener('click', () => {
      alert('Thank you for your purchase!');
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';
    });

    renderCart();