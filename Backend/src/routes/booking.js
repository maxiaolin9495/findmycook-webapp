const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.get('/bookings-for-chef/', bookingController.getBookingsForChefs);
router.get('/bookings-for-customer/', bookingController.getBookingsForCustomers);
router.post('/create', bookingController.createBooking);

module.exports = router;