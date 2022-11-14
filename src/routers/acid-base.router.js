const { getDisorder } = require("../controller/acid-base.controller");
const disorderRouter = require("express").Router();

disorderRouter.post("/predit", getDisorder);
module.exports = disorderRouter;
