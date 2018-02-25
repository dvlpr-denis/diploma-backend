const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const dbConnect = require('./database/mongodb');


const routes = require('./router')(passport);
const api = express();
const db = dbConnect();

api
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use('/', routes)
    .listen(config.api.port, () => {
        console.log('Api starting in http://localhost:' + config.api.port);
    });

