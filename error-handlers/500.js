'use strict'; 


const errorHandler = (error, req, res, next) => {
    res.send({
        code:500,
        message:`Internal server error: ${error}`
    });
}

module.exports = errorHandler;