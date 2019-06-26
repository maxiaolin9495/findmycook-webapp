"use strict";

const mongoose = require('mongoose');
// Define the chef schema

const ChefSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    foodtype: String,
    city: String,
    rating: Number,
    introduction: String,
    price: {
        type: Number,
        required: true
    },
    time: String,
    photo: String,
    languages: Array
});

ChefSchema.set('versionKey', false);
ChefSchema.set('timestamps', true);

// Export the chef model
module.exports = mongoose.model('chef', ChefSchema);
