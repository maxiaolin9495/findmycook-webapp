"use strict";

const express = require('express');
const router = express.Router();

const ChefController = require('../controllers/chef');
const ChefController = require('../controllers/login');


router.get('/search', ChefController.search); // List all chefs
router.post('/filter', ChefController.filterchef);
router.get('/name/:chefname', ChefController.getChefbyname);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
