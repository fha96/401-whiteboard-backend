'use strict';

const router = require('express').Router();
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');



router.post('/signup',handleSignUp);
router.post('/signin', handleSignIn);
router.get('/user', getAllUsers);



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
    let userData = req.headers.authorization.split(' ');
    let encodedValue = userData.pop();
    let [email, password] = base64.decode(encodedValue).split(':');
    console.log(password, email);
    const user = await User.findOne({where:{email}});

    if(user) {
        const sameOne = await bcrypt.compare(password, user.password);
        console.log(sameOne);
        if(sameOne) {
            return res.status(200).send('Welcome !');
        } else {
            return res.status(401).send('Invalid Login');
        }
    } else {
        return res.status(401).send('Invalid Login');
    }

    
    
}

async function getAllUsers(req, res) {
    let allUsers = await User.read();
    res.status(200).send(allUsers);
}

module.exports = router;