const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/addProfile', userController.addProfile);
router.post('/uploadProfile', userController.uploadProfile);
router.post('/userCalendar', userController.addCalendarBooking);
router.get('/profile', userController.getProfile);
router.get('/userCalendar', userController.getCalendarBookings);
router.get('/profile', userController.getProfile);
router.get('/photo', userController.getPhoto);

module.exports = router;