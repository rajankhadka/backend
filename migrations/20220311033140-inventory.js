'use strict';

const inventoryitemsSchema = require("../models/models.schema/inventoryitems.schema");
const timeStamp = require("../models/models.schema/timestamp.schema");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('inventoryitems', {
      ...inventoryitemsSchema(Sequelize.DataTypes),
      ...timeStamp(Sequelize.DataTypes),
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('inventoryitems');
  }
};
