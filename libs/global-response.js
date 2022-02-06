module.exports = (res,data) =>{
    let responseData = {};
    responseData.data = data;
    statusCode = data.statusCode || 200;
    res.status(statusCode).json(responseData);
}