const router = require('express').Router();
const authRoutes = require('./auth');
const secretRoutes = require('./secret');

module.exports = function (passport) {
    router
        .use('/', authRoutes())
        .use('/', secretRoutes(passport))
        .get('/test', function (req, res) {
            res.send('ok');
        });

    return router;
};