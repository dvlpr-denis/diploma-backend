const router = require('express').Router();
const authRoutes = require('./auth');

module.exports = function (passport) {
    router
        .use('/api', authRoutes());

    return router;
};