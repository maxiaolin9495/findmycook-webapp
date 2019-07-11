const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.get('/bookings-for-chef', bookingController.getBookingsForChefs);
router.get('/bookings-for-customer', bookingController.getBookingsForCustomers);
router.post('/create', bookingController.createBooking);
router.get('/get-chef-name', bookingController.getChefName);
router.get('/get-customer-name', bookingController.getCustomerName);

module.exports = router;