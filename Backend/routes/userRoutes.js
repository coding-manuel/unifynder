const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
var multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { user, uni, watchlist } = require('../schemas/data');
router.use(methodOverride('_method'))


router.get('/getUser', async (req, res) =>{
    let User = await user.findOne({ _id: req.query.user });
    res.send(User)
})

router.post('/enterMarks', async(req, res) =>{
    let User = await user.findOne({ _id: req.body.user });
    User.marks = req.body.marks
    User.save();
    res.status(200).send(User);
})

// router.post('/wishlist', async function (req, res) {
//     const { wishlist } = req.body
//     const { name, username } = req.body
//     let User = await user.findOne({ email: req.body.email });
//     User.wishlist = wishlist
//     User.save();
//     res.send("wishlist updated");
// })

//this route has issues && old route
// router.get('/wishlist/:id', function (req, res) {
//     const id  = req.params.id;
//     const User = user.findOne({ email: req.params.id });
//     let college = User.wishlist;
//     let coll = uni.findOne({ _id: college })
//     res.send(coll.College_Name)
//     res.send("hello")
// })

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

router.post('/saveMarksheet', upload.array('docs'), async function (req, res) {
    const User = await user.findById(req.body.id)
    User.docs = req.files.map(f => ({ url: f.path, filename: f.filename, origname: f.originalname }))
    await User.save();

    res.status(200).send(User.docs[0]).end();

})

router.post('/removeMarksheet', async function (req, res) {
    const User = await user.findById(req.body.id)
    User.docs = []
    await User.save();

    res.status(200).send(User.docs[0]).end();

})

router.get('/getMarksheet', async function (req, res) {
    const User = await user.findById(req.query.id)
    res.status(200).send(User.docs);

})

module.exports = router
