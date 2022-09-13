'use strict';

const express = require('express');
const {Comment} = require('../models/index');
const router = express.Router();


// Add a comment 
router.post('/comment/:postID',addComment);
