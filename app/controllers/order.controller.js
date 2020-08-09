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
  var uniqid = Date.now();

  // Create a Order
  const order = {
    productId: req.body.id,
    product_name: req.body.product_name,
    qty: req.body.qty,
    bill: req.body.bill,
    order_date: req.body.order_date,
    ordered_by: req.body.ordered_by,
  };

  const orderUpdate = {
    id: req.body.id,
    xid: uniqid,
    operation: "update",
    quantity: req.body.qty,
  };
  //credit reduction
  //xa start

  //order update
  //xa start

  fetch(
    "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo",
    {
      method: "put",
      body: orderUpdate,
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => console.log("Called company x xa start" + res.status));

  //credit reduction
  //xa prepare

  //order update
  //xa prepare

  //credit reduction
  //xa commit/ rollback

  //order update
  //xa commit/ rollback

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
