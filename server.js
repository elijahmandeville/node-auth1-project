const express = require("express");

const restricted = require("../auth/restricted-middleware");
const userRouter = require("./user/user-router");
const authRouter = require("./auth/auth-router");
const server = express();
const session = require("express-session");
const knexSessionStore = require("connect-session-knex");

const sessionConfig = {
  name: "oreo",
  secret: "MyCoolSecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, //should be true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: knexSessionStore,
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/users", restricted, userRouter);
server.use("/auth", authRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

server.get("/", (req, res) => {
  res.json({
    welcome: "Here's Johnny",
  });
});

module.exports = server;
