'use strict';

const router = require('express').Router();
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const basicAuth = require('../middlewares/basicAuth');
const bearerAuth = require('../middlewares/bearerAuth');



router.post('/signup',handleSignUp);
router.post('/signin', basicAuth(User), handleSignIn);
router.get('/user',bearerAuth(User), getAllUsers);



async function handleSignUp(req, res) {
    let data = req.body;
    try{
       data.password= await bcrypt.hash(data.password,5);
       console.log(data);
       let user =  await User.create(data);
        if(user) {
            res.status(200).end();
        }
    }catch (error){
        res.status(409).send('User already exist');
    }
}

async function handleSignIn (req, res) {
    res.status(200).json(req.user);
}

async function getAllUsers(req, res) {
    let allUsers = await User.findAll();
    res.status(200).send(allUsers);
}

module.exports = router;