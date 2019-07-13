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
            if (!(req.body.password === user.password)) return res.status(401).send({token: null});
            if (user.withProfile === 'No') {
                const token = jwt.sign({
                    id: user._id, email: user.email, userType: user.userType, withProfile: user.withProfile
                }, config.JwtSecret, {
                    expiresIn: 999999,
                });
                return res.status(200).json({token: token})
            }
            if (user.userType === 'Chef') {
                chefModel.findOne({email: req.body.email}).exec().then(chef => {
                    const token = jwt.sign({
                        id: user._id, email: user.email, userType: user.userType, withProfile: user.withProfile,
                        firstName: chef.firstName,
                        lastName: chef.lastName
                    }, config.JwtSecret, {
                        expiresIn: 999999 // time in seconds until it expires
                    });
                    return res.status(200).json({token: token, chef});
                })
            } else {
                customerModel.findOne({email: req.body.email}).exec().then(customer => {
                    const token = jwt.sign({
                        id: user._id, email: user.email, userType: user.userType, withProfile: user.withProfile,
                        firstName: customer.firstName,
                        lastName: customer.lastName
                    }, config.JwtSecret, {
                        expiresIn: 999999 // time in seconds until it expires
                    });
                    return res.status(200).json({token: token, customer});
                })
            }

        })
        .catch(error => {
            console.log('error by searching user')
            return res.status(404).json({
                error: 'User Not Found',
                message: error.message
            })
        });

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
            const token = jwt.sign({id: user._id, email: user.email, userType: user.userType, withProfile: user.withProfile}, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });

            return res.status(200).json({token: token});

        })
        .catch(error => {
            console.log('error by creating a User' + req.body.userType);
            if (error.code == 11000) {
                return res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else {
                return res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};

const addProfile = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'firstName')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a firstName property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'lastName')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a lastName property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'userType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a userType property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'phoneNumber')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a phoneNumber property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (req.body.userType === 'Chef') {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a city property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'languages')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a languages property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'foodType')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a foodType property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'introduction')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a introduction property'
        });
    }
    userModel.findOne({email: req.body.email}).exec()//UseModel schema
        .then(user => {
            user.withProfile = 'Yes';
            userModel.updateOne({email: user.email},user).then(user => {
            }).catch(error => {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            });
        }).catch(error => {
        console.log('error by searching user')
        res.status(404).json({
            error: 'User Not Found',
            message: error.message
        })
    });

    if(req.body.userType === 'Chef') {
        const chef = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            foodType: req.body.foodType,
            city: req.body.city,
            rating: 5,
            introduction: req.body.introduction,
            price: 20,
            phoneNumber: req.body.phoneNumber,
            languages: req.body.languages,
        });
        chefModel.create(chef).then(chef=>{
            const token = jwt.sign({
                id: req.body._id,
                email: req.body.email,
                firstName: chef.firstName,
                lastName: chef.lastName,
                userType: req.body.userType,
                withProfile: 'Yes'
            }, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });
            return res.status(200).json({token: token});
        }).catch(error => {
            console.log('error by creating a User Profile');
            if (error.code == 11000) {
                return res.status(400).json({
                    error: 'Chef Profile exists',
                    message: error.message
                })
            }
            else {
                return res.status(500).json({
                    error: 'Internal server error happens by add Chef Profile',
                    message: error.message
                })
            }
        });
    }
    if(req.body.userType === 'Customer') {
        const customer = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        });
        customerModel.create(customer).then(customer=>{
            const token = jwt.sign({
                id: req.body._id,
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                userType: req.body.userType,
                withProfile: 'Yes'
            }, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });
            return res.status(200).json({token: token});
        }).catch(error => {
            console.log('error by creating a User Profile');
            if (error.code == 11000) {
                return res.status(400).json({
                    error: 'Chef Profile exists',
                    message: error.message
                })
            }
            else {
                return res.status(500).json({
                    error: 'Internal server error happens by add Chef Profile',
                    message: error.message
                })
            }
        });
    }

}

const uploadProfile = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'firstName')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a firstName property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'lastName')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a lastName property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'userType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a userType property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'phoneNumber')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a phoneNumber property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (req.body.userType === 'Chef') {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'city')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a city property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'languages')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a languages property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'foodType')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a foodType property'
        });
        if (!Object.prototype.hasOwnProperty.call(req.body, 'introduction')) return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a introduction property'
        });
        const chef = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            foodType: req.body.foodType,
            city: req.body.city,
            rating: req.body.rating,
            introduction: req.body.introduction,
            price: req.body.price,
            phoneNumber: req.body.phoneNumber,
            languages: req.body.languages,
        });
        chefModel.updateOne({email: chef.email}, chef).then(chef => {
            const token = jwt.sign({
                id: req.body._id,
                email: req.body.email,
                firstName: chef.firstName,
                lastName: chef.lastName,
                userType: req.body.userType,
                withProfile: 'Yes'
            }, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });
            return res.status(200).json({token: token});
        }).catch(error => {
            console.log('error by creating a User Profile');
            if (error.code == 11000) {
                return res.status(400).json({
                    error: 'Chef Profile exists',
                    message: error.message
                })
            }
            else {
                return res.status(500).json({
                    error: 'Internal server error happens by add Chef Profile',
                    message: error.message
                })
            }
        });
    }
    if (req.body.userType === 'Customer') {
        const customer = Object.assign({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        });
        customerModel.updateOne({email: customer.email}, customer).then(customer => {
            const token = jwt.sign({
                id: req.body._id,
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                userType: req.body.userType,
                withProfile: 'Yes'
            }, config.JwtSecret, {
                expiresIn: 999999 // time in seconds until it expires
            });
            return res.status(200).json({token: token});
        }).catch(error => {
            console.log('error by creating a User Profile');
            if (error.code == 11000) {
                return res.status(400).json({
                    error: 'Chef Profile exists',
                    message: error.message
                })
            }
            else {
                return res.status(500).json({
                    error: 'Internal server error happens by add Chef Profile',
                    message: error.message
                })
            }
        });
    }
}
const getProfile = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'withProfile')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a withProfile property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'userType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a withProfile property'
    });

    if (req.body.withProfile === 'No') {
        return res.status(404).json({
                error: 'Profile Not Found',
                message: 'The user hasnot upload his Profile'
            }
        )
    }

    if (req.body.userType === 'Chef') {
        chefModel.findOne({email: req.body.email}).exec()//UseModel schema
            .then(chef => {//user object

                // check if the password is valid
                return res.status(200).json({
                    email: chef.email,
                    firstName: chef.firstName,
                    lastName: chef.lastName,
                    foodType: chef.foodType,
                    city: chef.city,
                    rating: chef.rating,
                    introduction: chef.introduction,
                    price: chef.price,
                    phoneNumber: chef.phoneNumber,
                    languages: chef.languages,
                })

            })
            .catch(error => {
                console.log('error by searching user')
                return es.status(404).json({
                    error: 'User Not Found',
                    message: error.message
                })
            });
    }
    if (req.body.userType === 'Customer') {
        customerModel.findOne({email: req.body.email}).exec()//UseModel schema
            .then(customer => {//user object

                // check if the password is valid
                return res.status(200).json({
                    email: customer.email,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber,
                })

            })
            .catch(error => {
                console.log('error by searching user')
                return es.status(404).json({
                    error: 'User Not Found',
                    message: error.message
                })
            });
    }
}

module.exports = {
    login,
    register,
    addProfile,
    uploadProfile,
    getProfile,
};
