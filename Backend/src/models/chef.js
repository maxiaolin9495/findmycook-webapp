const mongoose = require('mongoose');
// Define the chef schema

const ChefSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    rating: Number,
    introduction: String,
    price: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    time: String,
    photo: {
        type: String,
        required: true,
    },
    languages: Array
});

ChefSchema.set('versionKey', false);
ChefSchema.set('timestamps', true);

// Export the chef model
module.exports = mongoose.model('chef', ChefSchema);
