const db = require("../models");
const auth = require("../_tool/authentificator");
const User = db.user;

exports.login = async (req, res) => {

    User.findOne({ email: req.body.email })
        .populate('id_role')
        .then((data) => {
        //get password and email from user
        let user = {
            password: req.body.password,
            email: req.body.email,
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
            //insert user relevant informations into token
            const accessToken = auth.generateToken({
                email: data.email,
                id: data._id,
                role: data.id_role.label
            });
            res.status(200).send({ accessToken });
        }
        else {
            res.status(404).send("Not found")
        }
    })
}