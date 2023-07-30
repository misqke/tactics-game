export const loginFromStorage = async () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username == null || password == null) {
    window.location.href = "/login.html";
  } else {
    const res = await login({ username, password });
    if (res.error === true) {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.href = "/login.html";
    } else {
      return res.user.username;
    }
  }
};

export const login = async (creds) => {
  const res = await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const checkGame = () => {
  const gameName = sessionStorage.getItem("gameName");
  return gameName === null ? false : gameName;
};
