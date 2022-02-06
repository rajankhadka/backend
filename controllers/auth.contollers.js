const authServices = require("../services/auth.services");

class AuthController{
    async login(req,res,next){
        try {
            const returnData = await authServices.login(req.body);
            res.json(returnData);
        } catch (error) {
            next(error);
        }
    }

    async newaccessToken(req,res,next){
        try {
            const token = (req.headers.authorization).split(" ")[1];
            const returnnewTokens = await authServices.newTokens({uuid:token});
            res.json(returnnewTokens);
        } catch (error) {
            next(error);
        }
    }

    async logout(req,res,next){
        try {
            const returedData = await authServices.logout(req.user);
            res.json(returedData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();