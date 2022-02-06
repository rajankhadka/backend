const Joi = require('joi');
const { userCreate } = require('./validations.schema/user.validation.schema');


const userValidation = {};

userValidation.userCreate = userCreate(Joi);

module.exports = userValidation;