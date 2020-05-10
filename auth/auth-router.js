const bcrypt = require("bcryptjs");

const router = require("express").Router();

const usersDb = require("../user/user-model");

router.post("/register", (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  usersDb
    .add(userInfo)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.send(err));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  usersDb
    .getByUsername({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username;
        res.status(200).json({ message: `successfully logged in!` });
      } else {
        res.status(401).json({ message: "invalid username or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "couldn't log in",
      });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("unable to logout");
    } else {
      res.send("logged out");
    }
  });
});

module.exports = router;
