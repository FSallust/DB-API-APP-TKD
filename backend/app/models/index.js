const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.login = require("./login.model.js")(mongoose);
db.role = require("./role.model.js")(mongoose);
db.grade = require("./grade.model.js")(mongoose);
db.question = require("./question.model.js")(mongoose);
db.theory = require("./theory.model.js")(mongoose);
db.exam = require("./exam.model.js")(mongoose);
db.event = require("./event.model.js")(mongoose);

module.exports = db;