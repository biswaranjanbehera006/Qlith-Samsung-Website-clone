function showPopup(id) {
  const popup = document.getElementById(id);
  popup.classList.remove("hidden");        // Show the popup
  popup.classList.add("flex");             // Use flex for layout (centered)
  setTimeout(() => {
    popup.classList.remove("flex");        // Hide again after 2 seconds
    popup.classList.add("hidden");
  }, 2000);
}

function confirmOrder() {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const house = document.getElementById("house").value;
  const landmark = document.getElementById("landmark").value;
  const locality = document.getElementById("locality").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pincode = document.getElementById("pincode").value;
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !mobile || !house || !locality || !city || !state || !pincode || !payment) {
    showPopup("popupWarning");
    return;
  }

  showPopup("popupMessage");
}

function viewSummary() {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const house = document.getElementById("house").value;
  const landmark = document.getElementById("landmark").value;
  const locality = document.getElementById("locality").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pincode = document.getElementById("pincode").value;
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !mobile || !house || !locality || !city || !state || !pincode || !payment) {
    showPopup("popupWarning");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = 0;
  let itemsHTML = '';

  if (cartItems.length > 0) {
    itemsHTML += '<h4>Products:</h4>';
    cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      itemsHTML += `
        <div class="order-item">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price.toLocaleString()} x ${item.quantity} = ₹${itemTotal.toLocaleString()}</p>
        </div>
      `;
    });
  }

  const summary = `
    <h3>Order Summary</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Address:</strong> ${house}, ${landmark}, ${locality}, ${city}, ${state} - ${pincode}</p>
    <p><strong>Payment Mode:</strong> ${payment.value}</p>
    ${itemsHTML}
    <p><strong>Total:</strong> ₹${total.toLocaleString()}</p>
    <p style="color: green; font-weight: bold;">🚚 Your order will be delivered soon!</p>
  `;

  const summaryBox = document.getElementById("orderSummary");
  summaryBox.innerHTML = summary;
  summaryBox.style.display = "block";
}
