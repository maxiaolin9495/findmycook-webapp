"use strict";

const express = require('express');
const router = express.Router();

const ChefController = require('../controllers/chef');


router.get('/search', ChefController.search); // List all chefs
router.post('/filter', ChefController.filterchef);
router.get('/name/:chefname', ChefController.getChefbyname);

module.exports = router;
