const db = require("../models");
const auth = require("../_tool/authentificator");
const User = db.user;

exports.login = async (req, res) => {

    User.findOne({ email: req.body.email }).then((data) => {

        let user = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: req.body.password,
            birthdate: req.body.birthdate,
            email: req.body.email,
            photo: req.body.photo,
            qr: req.body.qr,
            id_role: req.body.id_role,
            id_grade: req.body.id_grade,
        }

        if (user !== null) {
            if (req.body.email !== user.email) {
                res.status(401).send('Invalid credentials')
                return;
            }
            if (req.body.password !== user.password) {
                res.status(401).send('Invalid credentials')
                return;
            }

            console.log("test");
            const accessToken = auth.generateToken(user);
            res.status(200).send({ accessToken });
        }
        else {
            res.status(404).send("Not found")
        }
    })
}