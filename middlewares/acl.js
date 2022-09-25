'use strict';


module.exports = (capabilities) => (req, res, next) => {
    
    if(!req.user.capabilities.includes(capabilities)){
        next('Unauthorized !');
    } 
    next();
}