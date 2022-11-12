const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Antons-UIA Server!");
});

module.exports = Router;

// Router.use("/events",events);
// Router.use("/auth",auth);
