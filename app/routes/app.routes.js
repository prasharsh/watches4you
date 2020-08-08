module.exports = (app) => {
  const watches = require("../controllers/app.controller.js");
  const order = require("../controllers/order.controller.js");
  var router = require("express").Router();

  // Create a new record
  router.post("/", watches.create);

  // Retrieve all watches
  router.get("/", watches.findAll);
  // Create a new record
  router.post("/newOrder", order.create);

  // // Retrieve all published watches
  // router.get("/published", watches.findAllPublished);

  // // Retrieve a single record with id
  // router.get("/:id", watches.findOne);

  // // Update a record with id
  // router.put("/:id", watches.update);

  // // Delete a record with id
  // router.delete("/:id", watches.delete);

  // // Delete all watches
  // router.delete("/", watches.deleteAll);

  app.use("/api/watches", router);
};
