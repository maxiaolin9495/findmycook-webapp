const mongoose = require('mongoose');

const chefCalendarWorkTimeSchema = new mongoose.Schema({

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
    }
});

chefCalendarWorkTimeSchema.set('versionKey', false);
chefCalendarWorkTimeSchema.set('timestamps', true);

module.exports = mongoose.model('ChefCalendarWorkTime', chefCalendarWorkTimeSchema);