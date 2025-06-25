console.log('🧩 refrigerators.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const search = this.value.toLowerCase();
      const products = document.querySelectorAll('.refrigerator-card');

      products.forEach(product => {
        const name = product.querySelector('.refrigerator-name')?.textContent.toLowerCase() || "";
        product.style.display = name.includes(search) ? 'block' : 'none';
      });
    });
  }

  // Sort functionality
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      const order = this.value;
      const list = document.getElementById('refrigeratorList') || document.querySelector('main');
      const cards = Array.from(document.querySelectorAll('.refrigerator-card'));

      cards.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.refrigerator-new')?.textContent.replace(/[₹,]/g, '') || 0);
        const priceB = parseInt(b.querySelector('.refrigerator-new')?.textContent.replace(/[₹,]/g, '') || 0);
        return order === 'low' ? priceA - priceB : priceB - priceA;
      });

      list.innerHTML = '';
      cards.forEach(card => list.appendChild(card));
    });
  }

  // Add to cart logic
  const buttons = document.querySelectorAll('.refrigerator-cart');
  console.log('Cart buttons found:', buttons.length);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const username = localStorage.getItem('loggedInUser');
      console.log('Clicked add to cart. Username:', username);

      if (!username) {
        const popup = document.createElement('div');
        popup.className = 'popup-center bg-red-600';
        popup.textContent = "⚠️ Please log in to add items to cart!";
        document.body.appendChild(popup);

        setTimeout(() => {
          popup.remove();
          window.location.href = 'login.html';
        }, 2000);

        return;
      }

      const cartKey = `cartItems_${username}`;
      const card = button.closest('.refrigerator-card');
      const name = card.querySelector('.refrigerator-name')?.textContent || "";
      const priceText = card.querySelector('.refrigerator-new')?.textContent.replace(/[₹,]/g, '') || "0";
      const price = parseFloat(priceText);
      const image = card.querySelector('img')?.src || "";

      let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existingItem = cartItems.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem(cartKey, JSON.stringify(cartItems));

      const popup = document.createElement('div');
      popup.className = 'popup-center bg-green-600';
      popup.textContent = "✅ Product added to cart!";
      document.body.appendChild(popup);

      setTimeout(() => popup.remove(), 2000);

      updateCartCount();
    });
  });

  updateCartCount();

  // ✅ Cart count update function (shared with order.js compatibility)
  function updateCartCount() {
    const username = localStorage.getItem('loggedInUser');
    const cartKey = `cartItems_${username}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElem = document.getElementById('cartCount');

    if (cartCountElem) {
      if (totalQuantity > 0) {
        cartCountElem.textContent = totalQuantity;
        cartCountElem.classList.remove('hidden');
      } else {
        cartCountElem.textContent = "0";
        cartCountElem.classList.add('hidden');
      }
    }
  }

  // Expose function globally so order.js can use it
  window.updateCartCount = updateCartCount;

  // Popup style animation
  const popupStyle = document.createElement('style');
  popupStyle.innerHTML = `
    .popup-center {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      color: #fff;
      padding: 14px 24px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      z-index: 9999;
      opacity: 0;
      animation: fadeInScale 0.4s ease-out forwards;
    }
    @keyframes fadeInScale {
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;
  document.head.appendChild(popupStyle);
});
