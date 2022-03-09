module.exports = (res,data) =>{
    // console.log(data.statusCode);
    // let responseData = {};
    // responseData.data = data.data;
    // responseData.statusCode = data.statusCode || 200;
    res.status(data.statusCode || 200 ).json(data);
}