const { authenticateToken } = require("../_tool/authentificator.js");
module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var unsecured = require("express").Router();
  var secured = require("express").Router();

  // Create a new User
  unsecured.post("/", user.add);

  // Retrieve all Users
  secured.get("/", user.getAll);

  // Retrieve a single User with id
  secured.get("/:id", user.getOne);

  // Update a User with id
  secured.put("/:id", user.update);

  // Delete a User with id
  secured.delete("/:id", user.delete);

  // Delete all Users
  secured.delete("/", user.deleteAll);

  app.use('/api/user', unsecured);
  app.use('/api/user', authenticateToken, secured);
};