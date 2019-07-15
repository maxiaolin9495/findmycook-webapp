const ChefModel = require('../models/chef');
const WorkTimeModel = require('../models/chefCalendarWorkTime');

const search = async (req, res) => {
    const name = req.query.firstName;
    const nameRegex = new RegExp(name, 'g');
    const chefs = await chefModel.find({
        $or: [
            {firstName: nameRegex},
            {type: nameRegex}
        ]
    }, {firstName: 1, lastName:1, foodType: 1, city: 1, rating: 1, introduction: 1, price: 1, photo: 1});
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
        firstName: 1,
        lastName: 1,
        foodType: 1,
        city: 1,
        rating: 1,
        introduction: 1,
        price: 1,
        time: 1,
        photo: 1
    });

    res.status(200).json(chef);
};

const addWorkTimeEntry  = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    WorkTimeModel.create(req.body)
        .then(workTimeEntry => res.status(201).json(workTimeEntry))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const getWorkTimeEntries  = (req, res) => {
    WorkTimeModel.find({}).exec()
        .then(workTimeEntry => res.status(200).json(workTimeEntry))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
const readdetailinfo = async (req, res) => {
    const {
        chefid,
    } = req.params;
    const chef = await chefModel.findById(chefid);

    res.status(200).json(chef);
};

module.exports = {
    search,
    addWorkTimeEntry,
    getWorkTimeEntries
    readdetailinfo,
    filterChef,
    getChefByName,
};
