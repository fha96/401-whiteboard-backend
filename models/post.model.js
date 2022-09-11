'use strict';
// this file is for create a table to use in routes file


const Post = (sequelize, DataTypes) =>sequelize.define('post',{ // naming table and create it with schema of my data
        title:{ // column header
            type: DataTypes.STRING,
            allowNull:false
        },
            description:{ // column header
            type:DataTypes.STRING,
            allowNull:true
        }
    });

module.exports = Post;