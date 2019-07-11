const chefModel = require('../models/chef');

const search = async (req, res) => {
    const name = req.query.name;
    const nameRegex = new RegExp(name, 'g');
    const chefs = await chefModel.find({
        $or: [
            {name: nameRegex},
            {type: nameRegex}
        ]
    }, {name: 1, foodtype: 1, city: 1, rating: 1, introduction: 1, price: 1, time: 1, photo: 1});
    res.status(200).json(chefs);
};

const getChefByName = async (req, res) => {
    const {
        chefname,
    } = req.params;
    const chef = await AttractionModel.findOne({name: chefname});
    res.status(200).json(chef);
};

const filterChef = async (req, res) => {
    const {
      chefIds,
      city,
      foodtype,
      price
    } = req.body;

    const mapPriceRange = (price) => {
        if (price === '0') {
            return {price: {"$lte": 24, "$gte": 0}};
        } else if (price === '25') {
            return {price: {"$lte": 49, "$gte": 25}};
        } else if (price === '50') {
            return {price: {"$lte": 74, "$gte": 50}};
        } else if (price === '75') {
            return {price: {"$lte": 100, "$gte": 75}};
        }
    }

    const query = {};
    if (chefIds.length !== 0) query._id = {$in: chefIds};
    if (price.length !== 0) query.$or = price.map(mapPriceRange);
    if (city.length !== 0) query.city = {$in: city};
    if (foodtype.length !== 0) query.foodtype = {$in: foodtype};
    const chef = await chefModel.find(query, {
        name: 1,
        foodtype: 1,
        city: 1,
        rating: 1,
        introduction: 1,
        price: 1,
        time: 1,
        photo: 1
    });

    res.status(200).json(chef);
};

const readdetailinfo = async (req, res) => {
    const {
        chefId,
    } = req.params;
    const chef = await ChefModel.findById(chefId);

    res.status(200).json(chef);
};

module.exports = {

    filterChef,
    getChefByName
};
