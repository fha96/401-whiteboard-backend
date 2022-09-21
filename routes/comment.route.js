'use strict';

const express = require('express');
const { Models } = require('../models/index');
const {Comment, User} = require('../models/index');
const router = express.Router();


// Add a comment 
// router.post('/comment/:postID',addComment);

//test route
router.get('/comment',async(req, res) => {
    let data = await Comment.read();
    res.status(200).send(data);
});

// router.post('/comment/:postID',async(req, res) => {
//     const id = req.params.postID;
//     let obj = req.body;
//     console.log(obj);
//     let comments = await Comment.CreateAndReadAllComments(Models.postModel,obj,id);
//     res.status(201).send(comments);
// });


router.post('/comment/:postID/:userID',async(req, res) => {
    const id = req.params.postID;
    const userID = req.params.userID;
    let obj = req.body;
    try {
        let user = await User.findOne({where:{id:userID}});
        if(user){
            obj.name= user.userName;
            obj.postID = id;
            obj.userID = userID;
            console.log(obj);
            let comments = await Comment.CreateAndReadAllComments2(Models.postModel,Models.userModel,obj,id,userID);
            
            console.log("Comments. name>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", comments.name);
            res.status(201).send(comments);
    
        } else {
            res.status(500).send('User not found')
        }
        
    } catch (error) {
        res.send(error.message);
    }
})


module.exports = router;