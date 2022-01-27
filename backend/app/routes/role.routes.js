const { authenticateToken } = require("../_tool/authentificator.js");

module.exports = app => {
    const role = require("../controllers/role.controller.js");

    var secured = require("express").Router();

    secured.get("/", role.getAll);
    secured.get("/:id", role.getOne);

    app.use('/api/role', authenticateToken, secured);
}