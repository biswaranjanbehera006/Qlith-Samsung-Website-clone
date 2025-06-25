// 🌐 Shop dropdown toggle
const shopToggle = document.getElementById("shopToggle");
const shopPanel = document.getElementById("shopPanel");

if (shopToggle && shopPanel) {
  shopToggle.addEventListener("click", (e) => {
    e.preventDefault();
    shopPanel.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!shopPanel.contains(e.target) && !shopToggle.contains(e.target)) {
      shopPanel.classList.remove("open");
    }
  });
}

// 🛒 Show "Buy" button inside a product card on hover/click
function showBuy(card) {
  document.querySelectorAll('.card .buy').forEach(el => el.classList.add('hidden'));
  const buy = card.querySelector('.buy');
  if (buy) buy.classList.remove('hidden');
}

// 👤 Toggle profile dropdown menu
function toggleProfileMenu() {
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

// 🔐 Log out user and redirect to login
function logout() {
  localStorage.removeItem("loggedInUser"); // Only remove the user session
  window.location.href = "login.html";     // Redirect without alert
}

// 👋 Display logged-in username
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  const profileName = document.getElementById("profileName");

  if (user && profileName) {
    profileName.innerText = user;
  }
});

// ✖️ Close profile dropdown if clicked outside
document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("profileDropdown");
  const button = document.querySelector("button[onclick='toggleProfileMenu()']");

  if (dropdown && button && !dropdown.contains(e.target) && !button.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});
