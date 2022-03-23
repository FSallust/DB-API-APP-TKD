module.exports = app => {
    const theory = require("../controllers/theory.controller");

    var unsecured = require("express").Router();

    // Retrieve all Theories
    unsecured.get("/", theory.getAll);

    // Retrieve a single Theory by id
    unsecured.get("/:id", theory.getOne);

    app.use('/api/theory', unsecured);
};