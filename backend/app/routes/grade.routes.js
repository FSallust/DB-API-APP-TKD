const { authenticateToken } = require("../_tool/authentificator.js");

module.exports = app => {
    const grade = require("../controllers/grade.controller.js");

    var secured = require("express").Router();

    secured.get("/", grade.getAll);
    secured.get("/:id", grade.getOne);

    app.use('/api/grade', authenticateToken, secured);
}