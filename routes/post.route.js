'use strict';


const express = require('express');
const {Post} = require('../models/index');
const router = express.Router();


router.get('/post',getAllPosts);

// when you use sequelize don't forget about promises because its promise based
async function getAllPosts(req, res) {
    
    const allPosts = await Post.findAll();
    res.status(200).send(allPosts);
}

module.exports = router;