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

/*router.post('/addToWatchlist', async function (req, res) {
    const col = req.body.collegeid;
    const em = req.body.email;
    const colname = req.body.collegename
    const id = req.body._id;
    //let College = await uni.find({ $or: [{ _id: col }, { College_Name: colname }] })
    let College = await uni.find({ College_Name: colname })
    const x = College._id
    let use = await user.findById(id)
    const xx = use._id
    //const update = { wishlist: x };
    //let us = await user.findByIdAndUpdate(id , { wishlist: College.id });
    let watchl = 
    res.send("updated")
}) */

router.post('/addToWatchlist', async(req, res) =>{
    console.log()
    let college = await uni.findOne({ College_Name: req.body.collegename })
    let collegeid = college.id
     let User = await user.findOneAndUpdate({ _id: req.body.user }, { wishlist:collegeid });

   // User.wishlist = college._id
   // User.save();
   // let x = new watchlist({ 
   //     userid: User._id,
    //    collegeid: college.College_Name
   // })
   // x.save();
    res.send("updated")
})

router.get('/watchlist', async function (req, res) {
    
    let User = await user.findOne({ _id: req.query.user });
    res.send(User)
})

module.exports = router
