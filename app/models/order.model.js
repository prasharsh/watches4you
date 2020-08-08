module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    product_name: {
      type: Sequelize.STRING,
    },
    qty: {
      type: Sequelize.INTEGER,
    },
    order_date: {
      type: Sequelize.STRING,
    },
    ordered_by: {
      type: Sequelize.STRING,
    },
  });

  return Order;
};
