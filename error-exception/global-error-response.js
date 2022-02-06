exports.globalErrorResponse = (error,req,res,next) =>{
    if(error){
        const response = {};
        response.message = error.message;
        response.statusCode = error.statusCode || 500;
        res.status(response.statusCode).json(response);
    }
    next();
}