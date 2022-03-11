'use strict';

const billmanagementSchema = require("../models/models.schema/billmanagement.schema");
const timestampSchema = require("../models/models.schema/timestamp.schema");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('bills', {
      ...billmanagementSchema(Sequelize.DataTypes),
      ...timestampSchema(Sequelize.DataTypes),
    });
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('bills');

  }
};
