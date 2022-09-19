'use strict';


const user = (sequelize, DataTypes) => sequelize.define('user', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});


module.exports = user;
