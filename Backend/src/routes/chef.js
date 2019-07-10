const express = require('express');
const router = express.Router();

const chefController = require('../controllers/chef');


router.get('/search', chefController.search); // List all chefs
router.post('/filter', chefController.filterchef);
router.get('/name/:chefname', chefController.getChefbyname);


module.exports = router;
