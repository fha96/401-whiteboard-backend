'use strict';

const router = require('express').Router();
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');



router.post('/signup',handleSignUp);



async function handleSignUp(req, res) {
    let data = req.body;
    try{
       data.password= await bcrypt.hash(data.password,5);
       let user =  await User.create(data);
        if(user) {
            res.status(201).json(user);
        }
    }catch (error){
        console.error(error.message);
    }
}


module.exports = router;