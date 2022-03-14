const Joi = require('joi');

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const registerschema = new schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 300
    }



})

const user = mongoose.model('user', registerschema);

function validateUser(User) {
    const Schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Schema.validate(User);
}

exports.user = user;
exports.validate = validateUser;
