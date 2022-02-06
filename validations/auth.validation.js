const Joi = require('Joi');
const { authlogin } = require('./validations.schema/auth.validation.schema');

const authValidation = {};
authValidation.login = authlogin(Joi);

module.exports = authValidation;