const authValidation = require("../../validations/auth.validation");

class AuthMiddleware{
    login(req,res,next){
        try {
            const {error,value} = authValidation.login.validate(req.body);
            if(error) throw error;
            next();
        } catch (error) {
            error.statusCode = 406;
            next(error);
        }
    }
}

module.exports = new AuthMiddleware();