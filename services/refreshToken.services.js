const { refreshTokenModels } = require("../libs/db-connection");

class RefreshTokenService{
    //new entry of refresh token to db
    async createrefreshToken(data){
        try {
            await refreshTokenModels.create({
                username:data.username,
                authorization:true,
                refreshToken:data.refreshToken
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    //fetching specific refresh token
    async getspecificrefreshToken({uuid}){
        try {
            const foundrefreshToken = await refreshTokenModels.findOne({
                where:{
                    refreshToken:uuid,
                },
                attributes:{
                    exclude:["createdAt","updatedAt","id"]
                }
            });
            return foundrefreshToken;
        } catch (error) {
            throw error;
        }
    }

    //update refresh token
    async updateoldrefreshToken({uuid}){
        try {
            await refreshTokenModels.update({
                authorization:false,
            },{
                where:{
                    refreshToken:uuid
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    //remove all refresh token of that username
    //when old refresh token is used again to create new refresh token
    async removeallrefreshTokenOfSpecificUser({username}){
        try {
            await refreshTokenModels.destroy({
                where:{
                    username:username
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RefreshTokenService();