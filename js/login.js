import { userData } from "../data/data.js";

function onLogin() {
  const usernameElm = document.querySelector("#username").value;
  const passwordElm = document.querySelector("#password").value;

  const users = userData.find((user) => user.username == usernameElm && user.password == passwordElm);

  if (users) {
    localStorage.setItem("user", JSON.stringify(users));
    window.location.href = "index.html";
  } else {
    alert("Username dan Password Tidak Sesuai");
  }
}

const formElm = document.getElementById("myForm");

formElm.addEventListener("submit", function (event) {
  event.preventDefault();
  onLogin();
});

const togglePasswordButton = document.querySelector("#togglePassword");
const closedEyeButton = document.querySelector("#closed-eye");
const openEyeButton = document.querySelector("#open-eye");
const passwordElm = document.querySelector("#password");
let isPasswordShown = false;

togglePasswordButton.addEventListener("click", function () {
  if (!isPasswordShown) {
    // make password visible
    passwordElm.type = "text";
    closedEyeButton.classList.add("hidden");
    openEyeButton.classList.remove("hidden");
  } else {
    // make password invisible
    passwordElm.type = "password";
    closedEyeButton.classList.remove("hidden");
    openEyeButton.classList.add("hidden");
  }
  isPasswordShown = !isPasswordShown;
});
