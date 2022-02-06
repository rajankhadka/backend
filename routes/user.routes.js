const passport = require('passport');
const userControllers = require("../controllers/user.controllers");
const userMiddleware = require('../middleware/validations.middleware/user.middleware');

module.exports = (app) =>{
    app.route('/register')
        .post(userMiddleware.registerUser, userControllers.registeruser);
    app.route('/user')
        .get( passport.authenticate('jwt',{session:false}),
            userControllers.getSpecificUser
        );
}
