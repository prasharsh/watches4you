const db = require("../models");
const User = db.Users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(
    { username: { [Op.like]: `%${username}%` } } +
      "___________" +
      { password: { [Op.like]: `%${password}%` } }
  );
  User.findAll({
    where: {
      [Op.and]: [
        { username: { [Op.like]: `%${username}%` } },
        { password: { [Op.like]: `%${password}%` } },
      ],
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
