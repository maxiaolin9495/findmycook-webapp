const jwt = require('jsonwebtoken');
const userModel = require('../models/loginPassword');
const customerModel = require('../models/customer');
const chefModel = require('../models/chef');
const config = require('../config');


const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    userModel.findOne({email: req.body.email}).exec()//UseModel schema
        .then(user => {//user object

            // check if the password is valid
            if (! (req.body.password === user.password)) return res.status(401).send({token: null});
            if(user.withProfile==='No') {
                const token = jwt.sign({id: user._id, email: user.email}, config.JwtSecret, {
                    expiresIn: 999999,
                });
                return res.status(200).json({token: token, userType: user.userType, withProfile: user.withProfile})
            }
            if(user.userType === 'Customer'){
                chefModel.findOne({email: req.body.email}).exec().then(chef =>{
                    const token = jwt.sign({id: user._id, email: user.email, firstName: chef.firstName, lastName: chef.lastName}, config.JwtSecret, {
                        expiresIn: 999999 // time in seconds until it expires
                    });
                    return res.status(200).json({token: token, chef});
                })
            }else {
                customerModel.findOne({email: req.body.email}).exec().then(customer =>{
                    const token = jwt.sign({id: user._id, email: user.email, firstName: customer.firstName, lastName: customer.lastName}, config.JwtSecret, {
                        expiresIn: 999999 // time in seconds until it expires
                    });
                    return res.status(200).json({token: token, customer});
                })
            }

        })
        .catch(error => {
            console.log('error by searching user')
            res.status(404).json({

            error: 'User Not Found',
            message: error.message
        })});

};

const register = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'userType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a userType property'
    });

    const user = Object.assign(req.body, {withProfile: 'No'});
    userModel.create(user)
        .then(user => {

            // if user is registered without errors
            // create a token
            const token = jwt.sign({id: user._id, username: user.username, userType: user.userType}, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });

            res.status(200).json({token: token});

        })
        .catch(error => {
            console.log('error by creating a User' + req.body.userType);
            if (error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};

module.exports = {
    login,
    register,
};