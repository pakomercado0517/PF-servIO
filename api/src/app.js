const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const Strategy = require("passport-local").Strategy;
const flash = require('connect-flash');

require("./config/passport")(passport);
require("./config/googleConfig");
require("./config/githubConfig");
require("./config/facebookConfig");
require("./db.js");
const server = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(
  session({
    name: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7200000, //2 hours
      httpOnly: true,
    },
  })
);
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
