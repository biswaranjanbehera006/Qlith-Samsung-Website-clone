// 🚀 Login Form Submit Handler
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.name === name && storedUser.password === password) {
    // ✅ Store logged-in user session
    localStorage.setItem("loggedInUser", name);
    

    
    // ✅ Show success and redirect
    document.getElementById("loginMsg").classList.remove("hidden");
    setTimeout(() => {
      window.location.href = "index.html"; // Or your homepage
    }, 1000);
  } else {
    alert("Invalid credentials");
  }
});

// 🔁 Forgot Password Flow
function openResetPopup() {
  document.getElementById("resetPopup").classList.remove("hidden");
  document.getElementById("resetMobile").value = "";
  document.getElementById("newPassword").classList.add("hidden");
  document.getElementById("resetSuccess").classList.add("hidden");
}

function verifyMobile() {
  const inputMobile = document.getElementById("resetMobile").value;
  const newPasswordInput = document.getElementById("newPassword");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Second step: Reset password
  if (!newPasswordInput.classList.contains("hidden")) {
    storedUser.password = newPasswordInput.value;
    localStorage.setItem("user", JSON.stringify(storedUser));
    document.getElementById("resetSuccess").classList.remove("hidden");

    // Close popup and redirect after 2s
    setTimeout(() => {
      document.getElementById("resetPopup").classList.add("hidden");
      window.location.href = "login.html";
    }, 2000);
  } else {
    // First step: Match mobile number
    if (storedUser && storedUser.mobile === inputMobile) {
      newPasswordInput.classList.remove("hidden");
    } else {
      alert("Mobile number not found!");
    }
  }
}


