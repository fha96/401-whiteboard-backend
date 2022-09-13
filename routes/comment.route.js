'use strict';

const express = require('express');
const { Models } = require('../models/index');
const {Comment} = require('../models/index');
const router = express.Router();


// Add a comment 
// router.post('/comment/:postID',addComment);

//test route
router.get('/comment',async(req, res) => {
    let data = await Comment.read();
    res.status(200).send(data);
});

router.post('/comment/:postID',async(req, res) => {
    const id = req.params.postID;
    let obj = req.body;
    let comments = await Comment.CreateAndReadAllComments(Models.postModel,obj,id);
    res.status(201).send(comments);
});


module.exports = router;