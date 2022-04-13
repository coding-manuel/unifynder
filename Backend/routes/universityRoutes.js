const express = require("express");
const router = express.Router();

const {user, uni, comment} = require('../schemas/data');

var categories = require('../filter')

router.get('/getUni', async(req, res) =>{
    const page = req.query.page
    const filters = JSON.parse(req.query.filters)
    const search = filters["Search"];
    const limit = 50
    const skip = (page - 1) * limit
    let sort = filters['Sort'];
    let marks

    if(filters["University"].length === 0){
        filters["University"] = categories.University
    }
    if(filters["State"].length === 0){
        filters["State"] = categories.State
    }
    let User = await user.findOne({ _id: filters["user"] });

    if(User) marks = User.marks

    if(!filters["eligible"]){
        marks = 100
    }

    try {
        let items, count, query
        if(search !== ''){
            query = {
                $text: {$search: search},
                Cutoff_Round_Two: {$lte : marks},
                State : {$in: filters["State"]},
                University : {$in: filters["University"]}
            }

            count = await uni.count(query)
            switch (sort) {
                case 1:
                    items = await uni.find(query).sort({score: {$meta: 'textScore'}, Average_Fees: -1}).limit(limit).skip(skip)
                    break;
                case 2:
                    items = await uni.find(query).sort({score: {$meta: 'textScore'}, Average_Fees: 1}).limit(limit).skip(skip)
                    break;
                case 3:
                    items = await uni.find(query).sort({score: {$meta: 'textScore'}, Rating: -1}).limit(limit).skip(skip)
                    break;
                case 4:
                    items = await uni.find(query).sort({score: {$meta: 'textScore'}, Rating: 1}).limit(limit).skip(skip)
                    break;
                default:
                    items = await uni.find(query).sort({score: {$meta: 'textScore'}}).limit(limit).skip(skip)
            }
        }else{
            query = {
                Cutoff_Round_Two: {$lte : marks},
                State : {$in: filters["State"]},
                University : {$in: filters["University"]}
            }

            count = await uni.count(query)

            switch (sort) {
                case 1:
                    items = await uni.find(query).sort({Average_Fees: -1}).limit(limit).skip(skip)
                    break;
                case 2:
                    items = await uni.find(query).sort({Average_Fees: 1}).limit(limit).skip(skip)
                    break;
                case 3:
                    items = await uni.find(query).sort({Rating: -1}).limit(limit).skip(skip)
                    break;
                case 4:
                    items = await uni.find(query).sort({Rating: 1}).limit(limit).skip(skip)
                    break;
                default:
                    items = await uni.find(query).limit(limit).skip(skip)
            }
        }

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

router.post('/getOneUni',async function (req,res){
    var college = await uni.findById(req.body.id)
    res.send(college);
})

router.post('/getTrending', async function (req, res){
    const colleges = await uni.find({Rating: {$gte : 4}}).limit(4)

    res.send(colleges)
})

router.post('/getSearch', async function (req, res){
    const query = {$text: {$search: req.body.search}}

    const colleges = await uni.find(query).sort({score: {$meta: 'textScore'}}).limit(4)

    res.send(colleges)
})

router.post('/comment', async function (req, res) {
    let college = await uni.findOneAndUpdate({ College_Name: req.body.collegeName }, {$push: {comments: req.body.commentbody }});
    res.send(college);
})

router.post('/updateUni', async function (req, res) {
    let college = await uni.findOneAndUpdate({ College_Name: req.body.College_Name },
        {
            College_Name: req.body.College_Name,
            Campus_Size: req.body.Campus_Size,
            Total_Students: req.body.Total_Students,
            Total_Faculty: req.body.Total_Faculty,
            Established_Year: req.body.Established_Year,
            Rating: req.body.Rating,
            University: req.body.University,
            Courses: req.body.Courses,
            Facilities: req.body.Facilities,
            City: req.body.City,
            State: req.body.State,
            Average_Fees: req.body.Average_Fees,
            Cutoff_Round_One: req.body.Cutoff_Round_One,
            Cutoff_Round_Two: req.body.Cutoff_Round_Two,
            Images: req.body.Images
        });
    res.send("updated");
})

router.post('/addUni', async function (req, res) {

    let Uni = await uni.findOne({ College_Name: req.body.College_Name });
    if (Uni) {
        // Check if this uni already exisits
        return res.status(400).send('Uni already exisits!');
    }else{
        // Insert the new Uni if it does not exist yet
        var Univ = new uni({
                College_Name: req.body.College_Name,
                Campus_Size: req.body.Campus_Size,
                Total_Students: req.body.Total_Students,
                Total_Faculty: req.body.Total_Faculty,
                Established_Year: req.body.Established_Year,
                Rating: req.body.Rating,
                University: req.body.University,
                Courses: req.body.Courses,
                Facilities: req.body.Facilities,
                City: req.body.City,
                State: req.body.State,
                Average_Fees: req.body.Average_Fees,
                Cutoff_Round_One: req.body.Cutoff_Round_One,
                Cutoff_Round_Two: req.body.Cutoff_Round_Two,
                Images: req.body.Images
            });

        await Univ.save();
        res.send(Univ);
    }
})

module.exports = router