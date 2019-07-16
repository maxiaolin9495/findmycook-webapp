const bookingModel = require('../models/booking');
const chefModel = require('../models/chef');
const customerModel = require('../models/customer');


const getBookingsForChefs = (req, res) =>{
    const email = req.query.email;
    bookingModel.find({chefEmail: email})
        .then(bookings =>{
            return res.status(200).json(bookings)})
        .catch(error => {
            console.log('internal error by searching')
            return req.status(400).json({error: error.message})
        })

};


const getBookingsForCustomers = (req, res) =>{
    const email = req.query.email;
    bookingModel.find({customerEmail: email})
        .then(bookings =>{
            return res.status(200).json(bookings)})
        .catch(error => {
            console.log('internal error by searching')
            return req.status(400).json({error: error.message})
        })
}

const getCustomerName = (req, res) =>{
    const email = req.query.email;

    customerModel.findOne({email: email}).exec().then(customer => {
        return res.status(200).json({firstName: customer.firstName, lastName: customer.lastName});
    }).catch(error => {
        console.log('error by searching user')
        return res.status(404).json({
            error: 'User Not Found',
            message: error.message
        })
    });

}

const getChefNameAndImg = (req, res) =>{
    const email = req.query.email;

    chefModel.findOne({email: email}).exec().then(chef => {
        return res.status(200).json({firstName: chef.firstName, lastName: chef.lastName, photo: chef.photo});
    }).catch(error => {
        console.log('error by searching user')
        return res.status(404).json({
            error: 'User Not Found',
            message: error.message
        })
    });
}

const createBooking = async (req, res) =>{
    if (!Object.prototype.hasOwnProperty.call(req.body, 'chefEmail')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a chefEmail property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'customerEmail')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a customerEmail property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'startTime')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a startTime property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'endTime')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a endTime property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a city property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'address')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a address property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'price')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a price property'
    });

    const booking = Object.assign(req.body, {status: 'inProgress', payment: 'inProgress'});
    bookingModel.create(booking)
        .then(booking => {
            return res.status(200).json(
                {
                    chefEmail: booking.chefEmail,
                    customerEmail: booking.customerEmail,
                    startTime: booking.startTime,
                    endTime: booking.endTime,
                    city: booking.city,
                    address: booking.address,
                    price: booking.price,
                    status: booking.status,
                    payment: booking.payment
                }
                );

        })
        .catch(error => {
            console.log('error by creating a booking');
            return res.status(500).json({
                    error: 'Internal error',
                    message: error.message
                })
        });
}

const confirmBooking = async (req, res) =>{
    console.log('received request')
    if (!Object.prototype.hasOwnProperty.call(req.body, '_id')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a _id property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'status')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a status property'
    });

    if(req.body.status === 'confirmed'){
        bookingModel.updateOne({_id: req.body._id}, {status: req.body.status}).then(booking => {
            return res.status(200).json({
                booking: booking,
            })
        }) .catch(error => {
            console.log('error by creating a booking');
            return res.status(500).json({
                error: 'Internal error',
                message: error.message
            })
        });
    }

}

const cancelBooking = async (req, res) =>{
    if (!Object.prototype.hasOwnProperty.call(req.body, '_id')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a _id property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'status')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a status property'
    });

    if(req.body.status === 'canceled'){
        bookingModel.updateOne({_id: req.body._id}, {status: req.body.status}).then(booking => {
            return res.status(200).json({
                booking: booking,
            })
        }) .catch(error => {
            console.log('error by creating a booking');
            return res.status(500).json({
                error: 'Internal error',
                message: error.message
            })
        });
    }

}

module.exports = {
    getBookingsForCustomers,
    getBookingsForChefs,
    createBooking,
    getChefNameAndImg,
    getCustomerName,
    confirmBooking,
    cancelBooking,
}