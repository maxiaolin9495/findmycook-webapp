const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.get('/bookings-for-chef', bookingController.getBookingsForChefs);
router.get('/bookings-for-customer', bookingController.getBookingsForCustomers);
router.post('/create', bookingController.createBooking);
router.get('/get-chef-name-and-image', bookingController.getChefNameAndImg);
router.get('/get-customer-name', bookingController.getCustomerName);
router.post('/confirm-booking', bookingController.confirmBooking);
router.post('/cancel-booking', bookingController.cancelBooking);
router.post('/close-booking', bookingController.closeBooking);
router.post('/review-booking', bookingController.reviewBooking);
module.exports = router;