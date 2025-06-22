document.getElementById('searchInput').addEventListener('input', function () {
  const search = this.value.toLowerCase();
  const products = document.querySelectorAll('.refrigerator-card');

  products.forEach(product => {
    const name = product.querySelector('.refrigerator-name').textContent.toLowerCase();
    product.style.display = name.includes(search) ? 'block' : 'none';
  });
});

document.getElementById('sortSelect').addEventListener('change', function () {
  const order = this.value;
  const list = document.getElementById('refrigeratorList');
  const cards = Array.from(document.querySelectorAll('.refrigerator-card'));

  cards.sort((a, b) => {
    const priceA = parseInt(a.querySelector('.refrigerator-new').textContent.replace('₹', '').replace(',', ''));
    const priceB = parseInt(b.querySelector('.refrigerator-new').textContent.replace('₹', '').replace(',', ''));
    return order === 'low' ? priceA - priceB : priceB - priceA;
  });

  list.innerHTML = '';
  cards.forEach(card => list.appendChild(card));
});

document.querySelectorAll('.refrigerator-cart').forEach(button => {
  button.addEventListener('click', () => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      alert("Please log in to add items to cart.");
      return;
    }
    const cartKey = `cartItems_${username}`;

    const card = button.closest('.refrigerator-card');
    const name = card.querySelector('.refrigerator-name').textContent;
    const priceText = card.querySelector('.refrigerator-new').textContent.replace('₹', '').replace(',', '');
    const price = parseFloat(priceText);
    const image = card.querySelector('img').src;

    let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    const popup = document.createElement('div');
    popup.className = 'popup-center';
    popup.textContent = "✅ Product added to cart!";
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
  });
});

const popupStyle = document.createElement('style');
popupStyle.innerHTML = `
.popup-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2b6cb0;
  color: #fff;
  padding: 16px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}`;
document.head.appendChild(popupStyle);