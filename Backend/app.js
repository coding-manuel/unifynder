if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors')
var morgan = require('morgan')
var categories = require('./filter')

const { user, validate, uni} = require('./schemas/data');
const port = 8000;

//const createSchema = require('./data/create')
//const bodyParser = require("body-parser");
//var multer = require('multer');
//const { storage } = require('./cloudinary');
//const upload = multer({ storage });
//const csvtojson = require('csvtojson');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: 3000, credentials:true}))
app.use(morgan('tiny'))

const mongoose = require('mongoose');
const dbUrl= process.env.DB_URL

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

app.post('/api/register', async (req, res) => {
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

const schematwo = Joi.object({
    email:Joi.string().min(4).required().email(),
    password:Joi.string().min(6).required()
});

app.post('/api/auth', async (req, res) => {
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

app.get('/api/getUser', async (req, res) =>{
    let User = await user.findOne({ _id: req.query.user });
    res.send(User)
})

app.post('/api/enterMarks', async(req, res) =>{
    console.log()
    let User = await user.findOne({ _id: req.body.user });
    User.marks = req.body.marks
    User.save();
    res.send(User);
})

app.get('/api/getUni', async(req, res) =>{
    const page = req.query.page
    const filters = JSON.parse(req.query.filters)
    const limit = 50
    const skip = (page - 1) * limit

    if(filters["University"].length === 0){
        filters["University"] = categories.University
    }
    if(filters["State"].length === 0){
        filters["State"] = categories.State
    }

    let query = {
        State : {$in: filters["State"]},
        University : {$in: filters["University"]}
    };
    //let term = req.body.searchTerm;
    try {
        const count = await uni.count(query)

        const items = await uni.find(query).limit(limit).skip(skip)

        const pageCount = count / limit
        res.send({
            pagination:{
                count,
                pageCount,
                skip,
            },
            items,
        })
    } catch (error) {
        console.error(error)
        return error
    }
})

app.post('/wishlist', async function (req, res) {
    const { wishlist } = req.body
    const { name, username } = req.body
    let User = await user.findOne({ email: req.body.email });
    User.wishlist = wishlist
    User.save();
    res.send("wishlist updated");
})

//this route has issues
app.get('/wishlist/:id', function (req, res) {
    const id  = req.params.id;
    const User = user.findOne({ email: req.params.id });
    let college = User.wishlist;
    let coll = uni.findOne({ _id: college })
    res.send(coll.College_Name)
    res.send("hello")

})

app.get('/register', function (req, res) {
    res.render('register.ejs');
})


app.listen(port, function (req, res) {
    console.log(`app listening on port ${port}`);
})