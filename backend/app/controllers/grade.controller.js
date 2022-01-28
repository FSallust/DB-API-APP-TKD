require('dotenv').config();
const db = require("../models");
const Grade = db.grade;

//#region GET
exports.getAll = (req, res) => {
    if(req.user.role == "USER") {
        res.status(401).send({message: "Unauthorized"});
        return;
    }
    
    Grade.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting grades"});
        });
};

exports.getOne = (req, res) => {
    if(req.user.role == 'USER') {
        res.status(401).send({message: "Unauthorized"});
        return;
    }

    const id = req.params.id;

    Grade.findOne({_id: id})
        .then(data => {
            if(!data)
                res.status(404).send({message: "Grade not found with this id: " + id});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting the grade with id: " + id});
        });
};
//#endregion GET