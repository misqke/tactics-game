const express = require("express");
const router = express.Router();
const dbContext = require("../data/dbContext.js");

router.post("/login", (req, res) => {
  const dbRes = dbContext.login(req.body);
  res.json(dbRes);
});

router.post("/signup", (req, res) => {
  const dbRes = dbContext.signup(req.body);
  res.json(dbRes);
});

module.exports = router;
