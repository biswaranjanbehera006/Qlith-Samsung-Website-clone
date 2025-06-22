document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const mobile = document.getElementById("regMobile").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const user = { name, mobile, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  document.getElementById("registerMsg").classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
