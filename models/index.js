'use strict';
// I am going to use this file to prepare the connection between my API server and SQL DB (postgresql)
// Here I am going to use ORM (object relational mapper) 
//using sequelize package (library) to communicate with my DB (manipulate data)
// First require sequelize and npm i pg sequelize : pg==> driver for postgres
const post = require('./post.model');
const {Sequelize, DataTypes} = require('sequelize');

// prepare database url (locally and remotely)
const DATA_BASE_URL = process.env.DATA_BASE_SERVER || 'postgres://fahadzidan1@localhost:5432/news';

// below I used SSL (secure socket layer) 

/*SSL enables client and server applications to communicate in a way that is designed
 to prevent eavesdropping, tampering, and message forgery. */



// create instance from Sequelize to prepare the connection
const sequelize = new Sequelize(DATA_BASE_URL);


// export
module.exports = {
    db:sequelize,
    Post:post(sequelize, DataTypes)   
}