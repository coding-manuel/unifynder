const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

const { user, uni, watchlist } = require('../schemas/data');
router.use(methodOverride('_method'))


router.get('/getUser', async (req, res) =>{
    let User = await user.findOne({ _id: req.query.user });
    res.send(User)
})

router.post('/enterMarks', async(req, res) =>{
    console.log()
    let User = await user.findOne({ _id: req.body.user });
    User.marks = req.body.marks
    User.save();
    res.send(User);
})

router.post('/wishlist', async function (req, res) {
    const { wishlist } = req.body
    const { name, username } = req.body
    let User = await user.findOne({ email: req.body.email });
    User.wishlist = wishlist
    User.save();
    res.send("wishlist updated");
})

//this route has issues && old route
router.get('/wishlist/:id', function (req, res) {
    const id  = req.params.id;
    const User = user.findOne({ email: req.params.id });
    let college = User.wishlist;
    let coll = uni.findOne({ _id: college })
    res.send(coll.College_Name)
    res.send("hello")
})

//new watchlist routes

router.post('/addToWatchlist', async(req, res) =>{
    let college = await uni.findOne({ College_Name: req.body.collegename })
    let collegeid = college.id
    let User = await user.findOneAndUpdate({ _id: req.body.user }, {$push: {wishlist:collegeid }});

    res.send(true)
})

router.post('/removeWatchlist', async(req, res) =>{
    let college = await uni.findOne({ College_Name: req.body.collegename })
    let collegeid = college.id
    let User = await user.findOneAndUpdate({ _id: req.body.user }, {$pull: {wishlist:collegeid }});

    res.send(false)
})

router.get('/getWatchlist', async function (req, res) {

    let User = await user.findOne({ _id: req.query.user });
    let Unis = await uni.find({_id: {$in: User.wishlist}})
    res.send(Unis)
})

router.get('/inWatchlist', async function (req, res) {
    let User = await user.findOne({ _id: req.query.user });
    let x = User.wishlist.includes(req.query.college)
    res.send(x)
})

module.exports = router
