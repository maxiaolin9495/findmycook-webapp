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
    address:{
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
    status:{
        type: String,
        required: true,
        enum: ['closed', 'canceled', 'inProgress', 'confirmed'],
    },
    payment:{
        type: String,
        required: true,
        enum: ['returned', 'inProgress', 'paid'],
    }
});

// Export the chef model
module.exports = mongoose.model('booking', BookingSchema);