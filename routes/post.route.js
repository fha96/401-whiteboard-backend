'use strict';


const express = require('express');
const {Post} = require('../models/index');
const router = express.Router();

//get all posts
router.get('/post',getAllPosts);
//get one post
router.get('/post/:id',getOnePost);
//add post
router.post('/post',addPost)
//update post
router.put('/post/:id',updatePost);
// delete post
router.delete('/post/:id',deletePost);

// when you use sequelize don't forget about promises because its promise based
async function getAllPosts(req, res) {
    
    const allPosts = await Post.findAll();
    res.status(200).send(allPosts);
}

async function getOnePost(req, res) {
let id = req.params.id;
let post = await Post.findOne({where:{id:id}});
res.status(200).send(post);
}

async function addPost(req, res) {
    let data = req.body;
    console.log("data",data);
    await Post.create(data);
    let posts = await Post.findAll();
    res.status(201).send(posts);
}

async function updatePost(req, res) {
    let id = req.params.id;
    let newData = req.body;
    await Post.update(newData,{where:{id:id}});
    let newPost = await Post.findOne({where:{id:id}});
    res.status(202).send(newPost);
}

async function deletePost(req, res) {
    let id = req.params.id;
    await Post.destroy({where:{id:id}});
    res.status(204).end();
}

module.exports = router;