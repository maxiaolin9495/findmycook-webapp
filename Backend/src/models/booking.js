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
    time: String,
    city: String,
    price: String,
    status:{
        type: String,
        required: true,
        enum: ['closed', 'canceled', 'inProgress'],
    }
});

ChefSchema.set('versionKey', false);
ChefSchema.set('timestamps', true);

// Export the chef model
module.exports = mongoose.model('chef', ChefSchema);