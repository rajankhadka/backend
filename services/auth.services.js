const { userModels } = require("../libs/db-connection");
const generaterefreshToken = require("../utils/generate-refresh-token");
const { generateAccesstoken } = require("../utils/generate-token");
const { verifypassword } = require("../utils/password");
const refreshTokenServices = require("./refreshToken.services");

class AuthServices{
    async login(data){
        try {
            const foundUser = await userModels.findOne({
                where:{
                    username:data.username
                },
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            });
            if(!foundUser) throw new Error("Cannot Found User");
            const passwordMatched = await verifypassword(data.password,foundUser.password);
            if(!passwordMatched) throw new Error('Cannot Authenticated to the system');
            const accessToken = await generateAccesstoken({username:data.username});
            const refreshToken = generaterefreshToken();
            const refreshTokenCreated = await refreshTokenServices.createrefreshToken({
                username:data.username,
                refreshToken:refreshToken,
            });
            if(!refreshTokenCreated) throw new Error('Cannot Authenticated refresh token');

            //encrypt access token
            return {accessToken:accessToken,refreshToken:refreshToken};
        } catch (error) {
            throw error;
        }
    }

    //generate new refresh token when access token expires
    //checking the refresh token is valid or not
    async newTokens({uuid}){
        try {
            const foundrefreshToken = await refreshTokenServices.getspecificrefreshToken({uuid:uuid});
            if(!foundrefreshToken) throw new Error('Enter the Credentials');
            if(!foundrefreshToken.authorization){
                await refreshTokenServices.removeallrefreshTokenOfSpecificUser({
                    username: foundrefreshToken.username,
                });
                throw new Error('Authorization failed, Login Again');
            }
            await refreshTokenServices.updateoldrefreshToken({uuid:foundrefreshToken.refreshToken});

            //create new refresh token
            const newrefreshToken = generaterefreshToken();
            const newaccessToken = await generateAccesstoken({username:foundrefreshToken.username});

            //save new refresh token to db
            await refreshTokenServices.createrefreshToken({
                username:foundrefreshToken.username,
                refreshToken:newrefreshToken
            });
            return {accessToken:newaccessToken,refreshToken:newrefreshToken};    
        } catch (error) {
            throw error;
        }
    }

    async logout(data){
        try {
            await refreshTokenServices.removeallrefreshTokenOfSpecificUser({username:data.username});
            return {message:'Logout Sccuessfully'};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthServices();