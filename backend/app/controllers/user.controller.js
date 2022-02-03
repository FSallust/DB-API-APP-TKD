require('dotenv').config();
const db = require("../models");
const User = db.user;

//#region CREATE and add new user
exports.add = async (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    //role and grade for a basic user
    const roleNewUser = await db.role.findOne().where('label').eq('USER');
    const gradeNewUser = await db.grade.findOne().where('level').eq(9); //TODO: modifier la valeur à 0

    const dbUser = await User.findOne({ email: req.body.email })
        .then(data => {
            //console.log(data);
            emailAlredyUsed = new User({
                _id: data._id,
                lastname: data.lastname,
                firstname: data.firstname,
                password: data.password,
                birthdate: data.birthdate,
                email: data.email,
                photo: data.photo,
                qr: data.qr,
                id_role: data.id_role,
                id_grade: data.id_grade,
            });
            return emailAlredyUsed;
        })
        .catch(e => {
            return null;
        })

    const user = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: req.body.password,
        birthdate: req.body.birthdate,
        email: req.body.email,
        photo: req.body.photo,
        qr: req.body.qr,
        id_role: roleNewUser,
        id_grade: gradeNewUser,
    });

    //Save User in the database
    if (dbUser === null) {
        user.save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
            });
    } else {
        res.status(500).send({ message: "Email already used!" });
    }
};
//#endregion CREATE

//#region GET
//Retrieve all User from the database.
exports.getAll = (req, res) => {
    if (req.user.role == "USER") {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving user." });
        });
};

//Get a single User with an id
exports.getOne = (req, res) => {
    if (req.user.role == "USER") {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const id = req.params.id;

    User.findById({ _id: id })
        .populate('id_role')
        .populate('id_grade')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id: " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving User with id=" + id });
        });
};
//#endregion GET

//#region UPDATE a User by its id
exports.update = (req, res) => {
    if (req.user.id !== req.params.id && req.user.role !== 'ADMIN') {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    User.find({ _id: id })
        .then(data => {
            data.forEach(element => {
                if (!element) {
                    res.status(404).send({ message: `Cannot update User with id: ${id}` });
                } else {
                    let toUpdate = {
                        //lastname: req.body.lastname,
                        //firstname: req.body.firstname,
                        password: req.body.password,
                        //birthdate: req.body.birthdate,
                        email: req.body.email,
                        photo: req.body.photo,
                        //qr: req.body.qr,
                        //id_role: req.body.id_role,
                        //id_grade: req.body.id_grade,
                    }
                    if(req.user.role === 'ADMIN') {
                        toUpdate = {
                            ...toUpdate, 
                            qr: req.body.qr,
                            id_role: req.body.id_role,
                            id_grade: req.body.id_grade,
                        };
                    }
                    element.updateOne(toUpdate).then(data => {
                        res.status(200).send(data)
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating User with id=" + id });
        });
};
//#endregion UPDATE

//#region DELETE
//Delete a User with a specified id
exports.delete = (req, res) => {
    if (req.user.role == "USER" || req.user.role == "MODERATOR") {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const id = req.params.id;

    User.findByIdAndRemove({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete User with id: ${id}` });
            } else {
                res.send({ message: "User was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete User with id: " + id });
        });
};

// Delete all User from the database
exports.deleteAll = (req, res) => {
    if (req.user.role == "USER" || req.user.role == "MODERATOR") {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    User.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while deleting all users!" });
        });
}
//#endregion DELETE