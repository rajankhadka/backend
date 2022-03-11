const passport = require('passport');
const authContollers = require("../controllers/auth.contollers");
const authMiddleware = require('../middleware/validations.middleware/auth.middleware');

module.exports = (app) =>{
    app.route('/login')
        .post(  authContollers.login);
    
    // app.route('/tokens')
    //     .post(authContollers.newaccessToken);

    app.route('/logout')
        .post(passport.authenticate('jwt',{session:false}),authContollers.logout);
}