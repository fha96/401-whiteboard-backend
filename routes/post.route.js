'use strict';


const express = require('express');
const {Post} = require('../models/index');
const {Models, User} = require('../models/index'); 
const bearerAuth = require('../middlewares/bearerAuth');
const router = express.Router();

//get all posts
//read with comments
router.get('/post',bearerAuth(User),getAllPosts);
//get one post
router.get('/post/:id',getOnePost);
//add post
router.post('/post',bearerAuth(User),addPost)
//update post
router.put('/post/:id',updatePost);
// delete post
router.delete('/post/:id',deletePost);


// when you use sequelize don't forget about promises because its promise based
async function getAllPosts(req, res) {
    let allPosts = await Post.readWithComments(Models.commentModel);
    res.status(200).send(allPosts);
}

async function getOnePost(req, res) {
let id = req.params.id;
let post = await Post.read(id);
res.status(200).send(post);
}

async function addPost(req, res) {
    let data = req.body;
    console.log(data);  
    console.log("data",data);
    await Post.create(data);
    let posts = await Post.read();
    res.status(201).send(posts);
}

async function updatePost(req, res) {
    let id = req.params.id;
    let newData = req.body;
    await Post.update(newData,id);
    let newPost = await Post.read(id);
    res.status(202).send(newPost);
}

async function deletePost(req, res) {
    let id = req.params.id;
    await Post.delete(id);
    res.status(204).end();
}

module.exports = router;