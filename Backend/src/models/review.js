"use strict";

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    time: {
        type: String,
        required: false
    },
    reviewerName: String,
    chefName: String,
    title: {
        type: String,
        required: true
    },
    qualityRating: {
        type: Number,
        required: true
    },
    punctualityRating: {
        type: Number,
        required: true
    },
    creativityRating: { 
        type: Number, 
        required: true 
    },
    socialSkillsRating: { 
        type: Number, 
        required: true 
    },
    overallRating: { 
        type: Number, 
        required: true 
    },
    text: {
        type: String,
        required: true
    },
});

ReviewSchema.set('versionKey', false);
ReviewSchema.set('timestamps', true);

module.exports = mongoose.model('Review', ReviewSchema);