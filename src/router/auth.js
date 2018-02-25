const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../database/models/user');

module.exports = function (passport) {
    router
        .post('/login', async function (req, res) {
            let username;
            let password;

            if (req.body.username && req.body.password) {
                username = req.body.username;
                password = req.body.password;
            }

            const user = await User.findOne({username});

            if (!user) {
                res.status(401).json({message: "no such user found"});
            }

            if (user.checkPassword(password)) {
                const payload = {id: user.id};
                const token = jwt.sign(payload, config.jwt.secret);
                res.json({
                    user: {
                        username: user.username
                    }, token: token
                });
            } else {
                res.status(401).json({message: "passwords did not match"});
            }
        })
        .post('/signin', async function (req, res) {
            try {
                await User.create(req.body);
                res.send({msg: 'Created'});
            } catch (e) {
                console.log(e);
                res.send({msg: 'Error'});
            }
        });

    return router;
};