const ErrorResponse = require('../utils/errorResponse'); 

const devError = (error, res)=> {
    res.status(error.statusCode).json({
        status: error.statusCode, 
        message: error.message || 'Server Error', 
        stack: error.stack
    })
}

const prodError = (error, res)=> {
    res.status(error.statusCode).json({
        status: error.statusCode, 
        message: error.message || 'Server Error'
    })
}

const errorHandler = (err, req, res, next)=> {

    let error = {...err}; 
    error.message = err.message; 
    console.log(err); 

    if(err.name==='Cast Error') {
        const message = `Resource not found with id ${err.value}`; 
        error = new ErrorResponse(message, 404); 
    }

    if(err.name==='Validation Error') {
        error = new ErrorResponse(err.message, 400); 
    }

    process.env.NODE_ENV==='moviesApp' ? devError(error, res) : prodError(error, res); 

}

module.exports = errorHandler; 