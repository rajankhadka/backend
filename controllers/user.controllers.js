const globalResponse = require("../libs/global-response");
const userServices = require("../services/user.services");

class UserController{
    //register user
    async registeruser(req,res,next){
        try {
            let {message} = await userServices.registerUser(req.body);
            
            globalResponse(res,{data:message,statusCode:201});
        } catch (error) {
            next(error);
        }
    }

    //get user specific info
    async getSpecificUser(req,res,next){
        try {
            console.log(req.user);
            res.json({user:req.user});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();