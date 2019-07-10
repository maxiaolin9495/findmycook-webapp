"use strict";


const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const chef = require('./routes/chef.js');
const user = require('./routes/user.js');
const contact = require('./routes/contact.js');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'FindMyCook Backend'
    });
});

// API routes
api.use('/chef', chef);
api.use('/user', user);
api.use('/contact', contact);

module.exports = api;
