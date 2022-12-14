'use strict';


const express = require('express');
const {Post} = require('../models/index');
const {Models, User} = require('../models/index'); 
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const router = express.Router();

//get all posts
//read with comments
router.get('/post',bearerAuth(User),acl('read'),getAllPosts);
//get one post
router.get('/post/:id', getOnePost);
//add post
router.post('/post',bearerAuth(User),acl('create'), addPost);
//update post
router.put('/post/:id',bearerAuth(User), acl('update'), updatePost);
// delete post
router.delete('/post/:id',bearerAuth(User), acl('delete'), deletePost);


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
    console.log(newData);
    await Post.update(newData,id);
   res.status(202).end();
}

async function deletePost(req, res) {
    let id = req.params.id;
    await Post.delete(id);
    res.status(204).end();
}

module.exports = router;