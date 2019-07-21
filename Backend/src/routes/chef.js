const express = require('express');
const router = express.Router();

const chefController = require('../controllers/chef');

router.get('/search', chefController.search); // List all chefs
router.post('/filter', chefController.filterChef);
router.get('/name/:chefname', chefController.getChefByName);
router.post('/searchCity', chefController.getChefByCity);
router.get('/readdetail/:chefid', chefController.readDetailInfo);
router.post('/chefCalendar', chefController.addWorkTimeEntry);
router.get('/chefCalendar', chefController.getWorkTimeEntries);
router.delete('/chefCalendar/:id', chefController.removeWorktime);
router.post('/searchCity', chefController.getChefByCity);

module.exports = router;
