const db = require("../models");
const Order = db.Orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.product_name) {
    res.status(400).send({
      message: "Ordername can not be empty!",
    });
    return;
  }

  // Create a Order
  const order = {
    product_name: req.body.product_name,
    qty: req.body.qty,
    order_date: req.body.order_date,
    ordered_by: req.body.ordered_by,
  };

  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};
