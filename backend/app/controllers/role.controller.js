require('dotenv').config();
const db = require("../models");
const Role = db.role;

//#region GET
exports.getAll = (req, res) => {
    if(req.user.role == "USER") {

        res.status(401).send({message: "Unauthorized"});
        return;
    }
    
    Role.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting roles"});
        });
};

exports.getOne = (req, res) => {
    if(req.user.role == 'USER') {
        res.status(401).send({message: "Unauthorized"});
        return;
    }

    const id = req.params.id;

    Role.findOne({_id: id})
        .then(data => {
            if(!data)
                res.status(404).send({message: "Role not found with this id: " + id});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting the role with id: " + id});
        });
};
//#endregion