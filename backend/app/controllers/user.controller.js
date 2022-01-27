require('dotenv').config();
const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    password: req.body.password,
    birthdate: req.body.birthdate,
    email: req.body.email,
    photo: req.body.photo,
    qr: req.body.qr,
    id_role: req.body.id_role,
    id_grade: req.body.id_grade,
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized")
  //   return;
  // }
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized")
  //   return;
  // }
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized")
  //   return;
  // }
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    password: req.body.password,
    birthdate: req.body.birthdate,
    email: req.body.email,
    photo: req.body.photo,
    qr: req.body.qr,
    id_role: req.body.id_role,
    id_grade: req.body.id_grade,
  });

  User.find({ Email: id })
    .then(data => {
      data.forEach(element => {
        if (!element) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else {
          element.updateOne({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: req.body.password,
            birthdate: req.body.birthdate,
            email: req.body.email,
            photo: req.body.photo,
            qr: req.body.qr,
            id_role: req.body.id_role,
            id_grade: req.body.id_grade,
          }).then(data => {
            res.status(200).send(data)
          });
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized")
  //   return;
  // }
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe Property was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized")
  //   return;
  // }
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} User were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user."
      });
    });
};