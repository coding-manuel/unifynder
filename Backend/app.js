const express = require('express');
const cors = require('cors')
var morgan = require('morgan')

require('dotenv').config();

var authRoutes = require('./routes/authRoutes')
var universityRoutes = require('./routes/universityRoutes')
var userRoutes = require('./routes/userRoutes')

const { user, uni,comment} = require('./schemas/data');

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

// Routes ---------------------------------------------------------

app.use('/api/auth', authRoutes)
app.use('/api/university', universityRoutes)
app.use('/api/user', userRoutes)

app.listen(port, function (req, res) {
    console.log(`app listening on port ${port}`);
})