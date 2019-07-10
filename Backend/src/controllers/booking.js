const bookingModel = require('../models/booking');

const getBookingsForChefs = async (req, res) =>{
    console.log('received message');
    const email = req.query.email;
    const bookings = await bookingModel.find({
        $or: [
            {chefEmail: email}
        ]
    })
    res.status(200).json(bookings);
};


const getBookingsForCustomers = async (req, res) =>{
    const email = req.query.email;
    const bookings = await bookingModel.find({
        $or: [
            {customerEmail: email}
        ]
    })
    res.status(200).json(bookings);
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

    if (!Object.prototype.hasOwnProperty.call(req.body, 'time')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a time property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a city property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'price')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a price property'
    });

    const booking = Object.assign(req.body, {status: 'inProgress'});

    bookingModel.create(booking)
        .then(booking => {
            return res.status(200).json(
                {chefEmail: booking.chefEmail,
                customerEmail: booking.customerEmail,
                time: booking.time,
                city: booking.city,
                price: booking.price,
                status: booking.status}
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


module.exports = {
    getBookingsForCustomers,
    getBookingsForChefs,
    createBooking,
}