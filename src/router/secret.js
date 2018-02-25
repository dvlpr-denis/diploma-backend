const router = require('express').Router();

module.exports = function (passport) {
    router
        .get('/secret', passport.authenticate('jwt', {session: false}), function (req, res) {
            res.send('secret')
        });

    return router;
};