'use strict';

const refreshTokenSchema = require("../models/models.schema/refreshToken.schema");
const timestampSchema = require("../models/models.schema/timestamp.schema");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('refreshtokens',{
      ...refreshTokenSchema(Sequelize.DataTypes),
      ...timestampSchema(Sequelize.DataTypes)
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('refreshtokens');
  }
};
