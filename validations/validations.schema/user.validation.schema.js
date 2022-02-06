exports.userCreate =(Joi) => Joi.object({
    firstname:Joi.string().required().min(3).max(20),
    lastname:Joi.string().required().min(3).max(20),
    username:Joi.string().required().min(5).max(20).alphanum(),
    email:Joi.string().required().max(30),
    password:Joi.string().required().min(5).max(10),
    repassword:Joi.string().required().min(5).max(10),
    phonenumber:Joi.string().required().min(10).max(13),
});