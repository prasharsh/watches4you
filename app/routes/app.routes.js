module.exports = (app) => {
  const watches = require("../controllers/app.controller.js");
  const order = require("../controllers/order.controller.js");
  var router = require("express").Router();

  // Create a new record
  router.post("/", watches.create);
  router.post("/login", watches.findAll);

  // Retrieve all watches
  router.get("/", watches.findAll);
  // Create a new record
  router.post("/newOrder", order.create);
  app.use("/api/watches", router);
};
