const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: joi.string().required(),
        designation: joi.string().required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;