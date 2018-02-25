const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../database/models/user');

router
    .post('/login', async function (req, res) {
    let username;
    let password;

    if(req.body.username && req.body.password){
        username = req.body.username;
        password = req.body.password;
    }

    const user = await User.findOne({username});

    if(!user){
        res.status(401).json({message:"no such user found"});
    }

    if(user.password === req.body.password) {
        const payload = {id: user.id};
        const token = jwt.sign(payload, config.jwt.secret);
        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message:"passwords did not match"});
    }
});

module.exports = router;