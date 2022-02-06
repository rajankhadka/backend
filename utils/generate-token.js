const jwt = require('jsonwebtoken');
const { encryptmsg } = require('./rsa-algorithm');
require('dotenv').config();

const ACCESSTOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const algorithm = 'HS256';
const expiresTime = '20s';

//access token promise
const accesstokenPromise = (data) =>{
    let username = JSON.stringify(data.username);
    username = encryptmsg(username);
    return new Promise((resolve,reject) =>{
        jwt.sign({username},ACCESSTOKEN_SECRET,{
            algorithm:algorithm,expiresIn:expiresTime
        },(error,token)=>{
            if(error) return reject(error);
            return resolve(token);
        });
    });
}

//generate access token
exports.generateAccesstoken = async(data) =>{
    try {
        const accessToken = await accesstokenPromise(data);
        return accessToken;
    } catch (error) {
       throw error; 
    }
}