"use strict";

const ChefModel = require('../models/chef');

const search = async (req, res) => {
    const name = req.query.name;
    const nameRegex = new RegExp(name, 'g');
    const chefs = await ChefModel.find({
        $or: [
            {name: nameRegex},
            {type: nameRegex}
        ]
    }, {name: 1, foodtype: 1, city: 1, rating: 1, introduction: 1, price: 1, time: 1, photo: 1});
    res.status(200).json(chefs);
};

const getChefbyname = async (req, res) => {
    const {
        chefname,
    } = req.params;
    const chef = await AttractionModel.findOne({name: chefname});
    res.status(200).json(chef);
};


module.exports = {
    search,
    getChefbyname,
};
