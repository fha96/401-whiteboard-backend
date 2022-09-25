'use strict';

const router = require('express').Router();
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const basicAuth = require('../middlewares/basicAuth');
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');



router.post('/signup',handleSignUp);
router.post('/signin', basicAuth(User), handleSignIn);
router.get('/user',bearerAuth(User),acl('read'), getAllUsers);


router.get('/he', async(req, res) => {
let users = await User.findAll();
})


async function handleSignUp(req, res) {
    let data = req.body;
    if(data.role){
        try{
           data.password= await bcrypt.hash(data.password,5);
           console.log(data);
           let user =  await User.create(data);
            if(user) {
                res.status(200).send('Account has been created successfully');
            }
        }catch (error){
            res.status(409).send('User already exist');
        }
    } else{
        res.status(500).send('Please select a role !');
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