const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');

router.get('/booking-for-chef', bookingController.getBookingsForChefs());
router.get('/booking-for-customer', bookingController.getBookingsForCustomers());
router.post('/create', bookingController.createBooking());