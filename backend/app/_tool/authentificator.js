const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'}) //30m
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if(!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err)  return res.sendStatus(401);
  
      User.findOne({Email: user.Email}).then((data) => {
        if(user.lastname !== data.lastname) return res.sendStatus(401)
        if(user.firstname !== data.firstname) return res.sendStatus(401)
        if(user.password !== data.password) return res.sendStatus(401)
        if(user.birthdate !== data.birthdate) return res.sendStatus(401)
        if(user.email !== data.email) return res.sendStatus(401)
        if(user.photo !== data.photo) return res.sendStatus(401)
        if(user.qr !== data.qr) return res.sendStatus(401)
        if(user.id_role !== data.id_role) return res.sendStatus(401)
        if(user.id_grade !== data.id_grade) return res.sendStatus(401)
        
        req.user = user;
        next();
      })
    })
}