const express = require("express");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {user, validate} = require('../schemas/data');

Joi.objectId = require('joi-objectid')(Joi);
const router = express.Router();

const schema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

const schematwo = Joi.object({
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

router.post('/register', async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let User = await user.findOne({ email: req.body.email });
    if (User) {
        return res.status(400).send('User already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        User = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
         const salt = await bcrypt.genSalt(10);
        User.password = await bcrypt.hash(User.password, salt);
        await User.save();

        res.send(User);
    }
});

router.post('/login', async (req, res) => {
    const { error } = schematwo.validate(req.body);
    if (error) {
        return res.status(400).send('Email must be valid');
    }

    //  find the user by their email id
    let User = await user.findOne({ email: req.body.email });
    if (!User) {
        return res.status(401).send('No account with this Email');
    }

    // Then validate the Credentials in MongoDB match
    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword) {
        return res.status(401).send('Incorrect email or password.');
    }

    res.send(User._id);
});

module.exports = router