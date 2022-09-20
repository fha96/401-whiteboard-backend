'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');

module.exports = (userModel) => async(req, res, next) => {
    let userData = req.headers.authorization.split(' ');
    let encodedValue = userData.pop();
    let [email, password] = base64.decode(encodedValue).split(':');
    
    userModel.authenticateBasic(email, password).then(resolve => {
         req.user = resolve;
         next();
    }).catch(error => next('Invalid Login'))
    
   

}