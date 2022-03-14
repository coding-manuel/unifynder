if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
    }


const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
//const createSchema = require('./data/create')
//const bodyParser = require("body-parser");
//var multer = require('multer');
//const { storage } = require('./cloudinary');
//const upload = multer({ storage });
const bcrypt = require('bcrypt');
//const csvtojson = require('csvtojson');
const { user, validate, uni} = require('./schemas/data');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const dbUrl= process.env.DB_URL

//mongodb://localhost:27017/universities
mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
    });

    const db = mongoose.connection;
db.once("open", function ()
{
    console.log("db connected")
});


const schema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

app.post('/register', async (req, res) => {
    //  Validate The Request
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let User = await user.findOne({ email: req.body.email });
    if (User) {
        return res.status(400).send('That user already exisits!');
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

const schematwo = Joi.object({
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

app.post('/auth', async (req, res) => {
    // Validate HTTP Request
    const { error } = schematwo.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  find the user by their email id
    let User = await user.findOne({ email: req.body.email });
    if (!User) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    res.send(true);
});

 


app.get('/register', function (req, res) {
    
    res.render('register.ejs');


})


app.listen(port, function (req, res) {
    console.log("app listening on port 3000");
})