import { login } from "./storage.js";

const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const signupBtn = document.getElementById("signup-button");
const loginBtn = document.getElementById("login-button");
const toSignup = document.getElementById("switch-to-signup");
const toLogin = document.getElementById("switch-to-login");
const title = document.getElementById("title");

toSignup.onclick = () => {
  signupBtn.classList.remove("hidden");
  loginBtn.classList.add("hidden");
  toLogin.classList.remove("hidden");
  toSignup.classList.add("hidden");
  title.innerText = "Signup";
};

toLogin.onclick = () => {
  signupBtn.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  toLogin.classList.add("hidden");
  toSignup.classList.remove("hidden");
  title.innerText = "Login";
};

signupBtn.onclick = async () => {
  const username = usernameEl.value;
  const password = passwordEl.value;

  if (username.length < 2 || password.length < 6) {
    return;
  }

  const res = await fetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.error == true) {
    alert(data.msg);
  } else {
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("password", data.user.password);
    window.location.href = "/";
  }
};

loginBtn.onclick = async () => {
  const username = usernameEl.value;
  const password = passwordEl.value;
  if (username.length < 2 || password.length < 6) {
    return;
  }
  const data = await login({ username, password });
  if (data.error == true) {
    alert(data.msg);
  } else {
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("password", data.user.password);
    window.location.href = "/";
  }
};
