const fetch = require("node-fetch");
const db = require("../models");
const Order = db.Orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, response) => {
  // Validate request
  if (!req.body.product_name) {
    res.status(400).send({
      message: "Ordername can not be empty!",
    });
    return;
  }
  var uniqid = Date.now() + "";

  // Create a Order
  const order = {
    productId: req.body.id,
    product_name: req.body.product_name,
    qty: req.body.qty,
    bill: req.body.bill,
    order_date: req.body.order_date,
    ordered_by: req.body.ordered_by,
  };

  console.log(order);

  const creditPayload = {
    username: req.body.ordered_by,
    xid: uniqid + "",
    transactionamount: req.body.bill,
    transactiondate: req.body.order_date,
  };
  const newOrder = {
    watch_id: req.body.id,
    quantity: req.body.qty,
    by: req.body.ordered_by,
  };
  const orderTrans = {
    watch_id: req.body.id,
    quantity: req.body.qtyOrdered,
    by: req.body.ordered_by,
  };

  console.log(newOrder);
  const orderUpdate = {
    id: req.body.id,
    xid: uniqid,
    operation: "update",
    quantity: req.body.qty,
  };
  const orderPrepare = {
    xid: uniqid,
    operation: "prepare",
  };

  const orderCommit = {
    xid: uniqid,
    operation: "commit",
  };

  const orderRollback = {
    xid: uniqid,
    operation: "rollback",
  };

  const creditStart = {
    username: req.body.ordered_by,
    xid: "" + uniqid,
    action: "start",
    credit: parseInt(req.body.creditsUsed),
  };
  console.log(creditStart);

  const creditPrepare = {
    xid: uniqid + "",
    action: "prepare",
  };

  const creditCommit = {
    xid: uniqid + "",
    action: "commit",
  };

  const creditRollback = {
    xid: uniqid + "",
    action: "rollback",
  };

  //credit reduction
  //xa start

  //order update
  //xa start
  let orderResponse = "";
  let creditResponse = "";

  //calling Order update/ start
  fetch(
    "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo",
    {
      method: "put",
      body: JSON.stringify(orderUpdate),
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    console.log("update" + res.status);
    //calling credit start
    fetch("http://129.173.67.174:1337/userCredits", {
      method: "put",
      body: JSON.stringify(creditStart),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log("creditStart" + res.status);
      //calling credit prepare
      fetch("http://129.173.67.174:1337/userCredits", {
        method: "put",
        body: JSON.stringify(creditPrepare),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log("creditPrepare" + res.status);
        creditResponse = res.status;
        //calling order prepare
        fetch(
          "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo",
          {
            method: "put",
            body: JSON.stringify(orderPrepare),
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          orderResponse = res.status;
          console.log(orderResponse + "=========" + creditResponse);
          //comparing responses
          if (orderResponse === creditResponse) {
            //commit order
            fetch(
              "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo",
              {
                method: "put",
                body: JSON.stringify(orderCommit),
                headers: { "Content-Type": "application/json" },
              }
            ).then((res) => console.log("orderCommit" + res.status));
            //credit commit call
            fetch("http://129.173.67.174:1337/userCredits", {
              method: "put",
              body: JSON.stringify(creditCommit),
              headers: { "Content-Type": "application/json" },
            }).then((res) => {
              console.log("creditCommit" + res.status);
              //update transaction - wallet
              fetch("http://129.173.67.174:1337/transactions", {
                method: "post",
                body: JSON.stringify(creditPayload),
                headers: { "Content-Type": "application/json" },
              }).then((res) => {
                console.log("credit payload update" + res.status);
              });
            });
            //placing order
            fetch(
              "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/watchorders",
              {
                method: "post",
                body: JSON.stringify(orderTrans),
                headers: { "Content-Type": "application/json" },
              }
            ).then((res) => {
              console.log("newOrder" + res.status);
              //inserting order record in watches4you db
              Order.create(order)
                .then((data) => {
                  console.log("data inserted");
                  return response.json({ success: true });
                })
                .catch((err) => {
                  return response.json({ success: false });
                });
            });
          } else {
            //rollback order
            fetch(
              "https://se2gktifxk.execute-api.us-east-1.amazonaws.com/dev/getallwatchinfo",
              {
                method: "put",
                body: orderRollback,
                headers: { "Content-Type": "application/json" },
              }
            ).then((res) => console.log("orderRollback" + res.status));
            //rollback credit
            fetch("http://129.173.67.174:1337/userCredits", {
              method: "put",
              body: creditRollback,
              headers: { "Content-Type": "application/json" },
            }).then((res) => console.log("rollback"));
          }
        });
        return response.json({ success: true });
      });
    });
  });
};
