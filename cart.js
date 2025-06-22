let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const container = document.getElementById('cartContainer');
const emptyMsg = document.getElementById('emptyMessage');
const summary = document.getElementById('summarySection');
const subtotalSpan = document.getElementById('subtotal');
const totalSpan = document.getElementById('total');
const discountSpan = document.getElementById('discount');
const gstSpan = document.getElementById('gst');
const deliveryFee = 90;
let appliedDiscount = 0;

function updateCartView() {
  container.innerHTML = '';
  let subtotal = 0;

  if (cartItems.length === 0) {
    emptyMsg.style.display = 'block';
    summary.style.display = 'none';
    return;
  }

  emptyMsg.style.display = 'none';
  summary.style.display = 'block';

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const card = document.createElement('div');
    card.className = 'cart-card';
    card.innerHTML = `
      <img src="${item.image}" class="cart-img">
      <div class="cart-info">
        <div class="cart-title">${item.name}</div>
        <div class="cart-price">₹${item.price.toLocaleString()} x ${item.quantity} = ₹${itemTotal.toLocaleString()}</div>
        <div class="quantity-control">
          <button class="quantity-btn ${item.quantity <= 1 ? 'red' : 'green'}" ${item.quantity <= 1 ? 'disabled' : ''} onclick="updateQuantity(${index}, -1)">−</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn green" onclick="updateQuantity(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  const gst = subtotal * 0.05;
  const finalTotal = subtotal - appliedDiscount + gst + deliveryFee;

  subtotalSpan.textContent = `₹${subtotal.toLocaleString()}`;
  gstSpan.textContent = `+ ₹${gst.toFixed(2)}`;
  discountSpan.textContent = `- ₹${appliedDiscount.toLocaleString()}`;
  totalSpan.textContent = `₹${finalTotal.toFixed(2)}`;
}

function updateQuantity(index, change) {
  cartItems[index].quantity += change;
  if (cartItems[index].quantity < 1) return;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartView();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartView();
}

function applyCoupon() {
  const selectedValue = parseInt(document.getElementById('couponSelect').value);
  appliedDiscount = selectedValue;
  updateCartView();
}

updateCartView();
