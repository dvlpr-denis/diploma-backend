const router = require('express').Router();
const authRoutes = require('./auth');

router.get('/', function (req, res) {
    res.send('ok');
});

module.exports = function (api) {
    api
        .use('/', authRoutes)
        .use('/api', router)
};