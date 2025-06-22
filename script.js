const shopToggle = document.getElementById("shopToggle");
const shopPanel = document.getElementById("shopPanel");

// Toggle dropdown on click
shopToggle.addEventListener("click", (e) => {
  e.preventDefault();
  shopPanel.classList.toggle("open");
});

// Optional: Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!shopPanel.contains(e.target) && !shopToggle.contains(e.target)) {
    shopPanel.classList.remove("open");
  }
});


 function showBuy(card) {
    // Hide all Buy buttons
    document.querySelectorAll('.card .buy').forEach(el => el.classList.add('hidden'));
    
    // Show only the Buy button in clicked card
    const buy = card.querySelector('.buy');
    if (buy) buy.classList.remove('hidden');
  }
