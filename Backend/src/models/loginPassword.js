"use strict";
const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum: ['Customer', 'Chef'],
        required: true
    },
    withProfile:{
        type: String,
        enum: ['Yes', 'No'],
        required: true
    }
});

module.exports = mongoose.model('loginPassword', LoginSchema);