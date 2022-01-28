const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//DB
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch(err => {
        console.log("Cannot connect to MongoDB!", err);
        process.exit();
    });

//Simple route
app.get("/", (req, res) => {
    res.send("Welcome on your API NodeJS");
});

//Routes
require("./app/routes/user.routes")(app);
require("./app/routes/login.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/grade.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});