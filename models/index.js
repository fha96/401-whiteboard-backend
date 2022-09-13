'use strict';
// I am going to use this file to prepare the connection between my API server and SQL DB (postgresql)
// Here I am going to use ORM (object relational mapper) 
//using sequelize package (library) to communicate with my DB (manipulate data)
// First require sequelize and npm i pg sequelize : pg==> driver for postgres
const {Sequelize, DataTypes} = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const CommentRoutes = require('../collections/user-comment-routes');

// prepare database url (locally and remotely)
const DATA_BASE_URL = process.env.DATABASE_URL || 'postgres://fahadzidan1@localhost:5432/news';

// below I used SSL (secure socket layer) 

/*SSL enables client and server applications to communicate in a way that is designed
 to prevent eavesdropping, tampering, and message forgery. */

//  let sequelizeOptions = {

//     dialectOptions : {
//         ssl : {
//             require : true,
//             rejectUnauthorized: false
//         }
//     }

// };

// create instance from Sequelize to prepare the connection
const sequelize = new Sequelize(DATA_BASE_URL);

const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);

postModel.hasMany(commentModel,{foreignKey: 'postID', sourceKey:'id'});
commentModel.belongsTo(postModel,{foreignKey: 'postID', targetKey: 'id'});


const postCollection = new CommentRoutes(postModel);
const commentCollection = new CommentRoutes(commentModel);


// export
module.exports = {
    db:sequelize,
    Post:postCollection,
    Comment:commentCollection,
    Models:{postModel,commentModel}
}