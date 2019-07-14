const mongoose = require('mongoose');

const CalendarBookingSchema = new mongoose.Schema({

    reviewerName: {
        type: String,
        required: false
    },
    chefName: {
        type: String,
        required: false
    },
    selectedDay: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }

});

CalendarBookingSchema.set('versionKey', false);
CalendarBookingSchema.set('timestamps', true);

module.exports = mongoose.model('CalendarBooking', CalendarBookingSchema);