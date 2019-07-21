const mongoose = require('mongoose');
// Define the chef schema

const BookingSchema = new mongoose.Schema({

    chefEmail: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    //inProgress is for new booking, which needs to be confirmed by the chef.
    //confirmed, canceled is easy to understand.
    //if the chef has provided the service, the booking status will be change to closed
    //once the booking is closed and the customer has reviewed the chef, then the status will be turned to reviewed
    status: {
        type: String,
        required: true,
        enum: ['closed', 'canceled', 'inProgress', 'confirmed', 'reviewed'],
    },
    //inProgress means the booking is canceled, the money needs to be sent back, returned means the money has been sent back.
    payment: {
        type: String,
        required: true,
        enum: ['returned', 'inProgress', 'paid'],
    }
});

// Export the chef model
module.exports = mongoose.model('booking', BookingSchema);