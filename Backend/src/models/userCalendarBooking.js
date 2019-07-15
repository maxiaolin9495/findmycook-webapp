const mongoose = require('mongoose');

const UserCalendarBookingSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: false
    },
    chefName: {
        type: String,
        required: false
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    }

});

UserCalendarBookingSchema.set('versionKey', false);
UserCalendarBookingSchema.set('timestamps', true);

module.exports = mongoose.model('UserCalendarBooking', UserCalendarBookingSchema);