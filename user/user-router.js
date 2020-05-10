const db = require("../data/config");

const express = require("express");
const usersDb = require("./user-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await usersDb.get();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
