const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("auth.db"));

const dbFindUser = db.prepare("select * from users where username = @username");

const dbLogin = db.prepare(
  "select * from users where username = @username and password = @password"
);

const dbSignup = db.prepare(
  "insert into users(username, password) values(@username, @password)"
);

const login = (creds) => {
  const user = dbLogin.get(creds);
  if (user === undefined) {
    return { error: true, msg: "invalid username or password" };
  } else {
    return { error: false, user: user, msg: "login successful" };
  }
};

const signup = (creds) => {
  const exists = dbFindUser.get({ username: creds.username });
  if (exists === undefined) {
    dbSignup.run(creds);
    return { error: false, user: creds, msg: "signup successful" };
  } else {
    return { error: true, msg: "username already exists" };
  }
};

module.exports = {
  login,
  signup,
};
