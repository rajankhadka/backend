const { userModels } = require('../libs/db-connection');
const { hashpassword } = require('../utils/password');

class UserServices{
   
    //register user
    async registerUser(data){
        try {
            if(!data.repassword) throw new Error("re-password is required!!!");
            if(!data.password) throw new Error("password is required!!!")
            if((data.password !== data.repassword) ) throw new Error('Password/rePassword doesnot match');
            //password hashing
            data.password = await hashpassword(data.password);
            //saving user info to db
            await userModels.create({
                firstname:data.firstname,
                lastname:data.lastname,
                username:data.username,
                email:data.email,
                password:data.password,
                phonenumber:data.phonenumber,
            });
            return {message:"created!!!"};
            
        } catch (error) {
            throw error;
        }
    }


    //get user specific info
    async getSpecificUser(data){
        try {
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports= new UserServices();