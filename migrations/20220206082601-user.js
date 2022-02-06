const userSchema = require('../models/models.schema/user.schema');
const timeStamp = require("../models/models.schema/timestamp.schema");
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      ...userSchema(Sequelize.DataTypes),
      ...timeStamp(Sequelize.DataTypes),
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
