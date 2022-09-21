'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = (sequelize, DataTypes) => {
    
   const User =  sequelize.define('user', {
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
        },
        token: {
            type: DataTypes.VIRTUAL   
        }
    });
    User.authenticateBasic = async function(email, password) {
         
    try {
        // 'this' because of this model
        const user = await this.findOne({where:{email}});
        if(user) {
            const sameOne = await bcrypt.compare(password, user.password);
            console.log(sameOne);
            if(sameOne) {
                let newToken = jwt.sign({email:user.email},process.env.SECRET);
                user.token = newToken;
                return user;
            } else {
                return 'Invalid Login';
                // throw new Error('Invalid Login');
            }
        } else {
            return 'Invalid Login'
        }   
    } catch (error) {
        console.error(error.message);
        return 'Invalid Login';
    }
    }

    User.validateToken = async function (token) {
        let parsedToken = jwt.verify(token,process.env.SECRET); // this verify will get you back the email
        console.log('valid >>>>>>>', parsedToken);
        const user = await this.findOne({where:{email:parsedToken.email}});
        if(user) {
            return user;
        } else {
            return 'Invalid Token';
        }
    }

    return User;
    
} 


module.exports = UserModel;
