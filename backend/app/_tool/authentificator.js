const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' }) //30m
}

exports.authenticateToken = (req, res, next) => {
  //console.log("test");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }
  //console.log("jwt");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);

    //verify user and dbData
    User.findOne({ email: user.email }).populate('id_role').then((data) => {
      //console.log(data);
      if (user.email !== data.email) return res.sendStatus(401);
      if (user.role !== data.id_role.label) return res.sendStatus(401);

      req.user = user;
      //Permission verification
      // if(req.user.role == "USER") {
      //   res.status(401).send({message: "Unauthorized"});
      //   return;
      // }
      next();
    })
  })
}