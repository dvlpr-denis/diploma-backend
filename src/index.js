const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const dbConnect = require('./database/mongodb');


const router = require('./router');
const api = express();
const db = dbConnect();

api
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json());

router(api);

api.use(passport.initialize())
    .get('/secret', passport.authenticate('jwt', {session: false}), function (req, res) {
        res.json("Success! You can not see this without a token");
    })
    .listen(config.api.port, () => {
        console.log('Api starting in http://localhost:' + config.api.port);
    });

