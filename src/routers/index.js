const Router = require("express").Router();
const acid_base = require("./acid-base.router");
Router.get("", (req, res) => {
  res.send("Welcome to Antons-UIA Server!");
});
Router.use("/acid-base", acid_base);
module.exports = Router;

// Router.use("/events",events);
// Router.use("/auth",auth);
