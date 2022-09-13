'use strict';


const comment  = (sequelize, DataTypes) => sequelize.define('comment',{
    description: {
    type: DataTypes.STRING,
    allowNull: false
},name:{
    type: DataTypes.STRING,
    default: 'Anonymous'
},postID:{
    type:DataTypes.INTEGER,
    allowNull:false
}
});


module.exports = comment;