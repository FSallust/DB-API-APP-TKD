require('dotenv').config();
const db = require("../models");
const Theory = db.theory;

//#region GET
exports.getAll = (req, res) => {
    // if(req.user.role == "USER") {
    //     res.status(401).send({message: "Unauthorized"});
    //     return;
    // }
    
    Theory.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting theories"});
        });
};

exports.getOne = (req, res) => {
    // if(req.user.role == 'USER') {
    //     res.status(401).send({message: "Unauthorized"});
    //     return;
    // }

    const id = req.params.id;

    Theory.findOne({_id: id})
        .then(data => {
            if(!data)
                res.status(404).send({message: "Theory not found with this id: " + id});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error while getting theory with id: " + id});
        });
};
//#endregion GET