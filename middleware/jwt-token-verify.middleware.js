const passport = require('passport');
const { userModels } = require('../libs/db-connection');
const { decryptmsg } = require('../utils/rsa-algorithm');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

const ACCESSTOKEN_SECRET = process.env.JWT_ACCESS_SECRET;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = ACCESSTOKEN_SECRET;


passport.use(new JwtStrategy(opts,async function(payload,done){
    try {
        let decryptusername = decryptmsg(payload.username);
        
        const foundUser = await userModels.findOne({
            where:{
                username:JSON.parse(decryptusername)
            },
            attributes:{
                exclude:["updatedAt","createdAt","password"]
            }
        });
        if(foundUser) return done(false,foundUser.dataValues);
        return done(false,null);
    } catch (error) {
        return done(error,false);
    }
}));
