const userValidation = require("../../validations/user.validations");

class userMiddleware{
    //register user
    registerUser(req,res,next){
        try {
            const {error,value}  = userValidation.userCreate.validate(req.body);
            if(error) throw error;
            if(req.body.password !== req.body.repassword) throw new Error('Password misMatch')
            next();
        } catch (error) {
            error.statusCode = 406;
            next(error);
        }
    }
}

module.exports = new userMiddleware();