module.exports = (req,res,next) =>{
    const error = new Error('Page Not Found');
    error.statusCode = 404;
    next(error);
}