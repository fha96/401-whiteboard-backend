'use strict';

module.exports = (userModel) => async(req, res, next) => {
    if(req.headers.authorization){
    let bearerHeader = req.headers.authorization.split(' '); // [ 'Bearer', 'token']
    let token = bearerHeader.pop(); // 'token'
    console.log('token >>>>>>', token);
    userModel.validateToken(token).then(resolve => {
         req.user = resolve;
         next();
    }).catch(error => next(`Invalid Login ${error}`))
    
} else {
    console.error(error.message);
}

}
