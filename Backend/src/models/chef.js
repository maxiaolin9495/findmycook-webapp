"use strict";

const mongoose = require('mongoose');
// Define the chef schema

const ChefSchema = new mongoose.Schema({
    name: {
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
    photo: String
});

ChefSchema.set('versionKey', false);
ChefSchema.set('timestamps', true);

// Export the chef model
module.exports = mongoose.model('chef', ChefSchema);
