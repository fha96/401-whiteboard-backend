'use strict';


const server = require('./server');
const {db} = require('./models/index');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// below I used sync as built-in method from sequelize package then start running my server 
// because I can not run my server before checking the data base if it exists or not
// 
db.sync().then(() => {
    server.start(PORT);
});
