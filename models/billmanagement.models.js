const billmanagementSchema = require("./models.schema/billmanagement.schema");

module.exports = (inventorydb,DataTypes) => inventorydb.define('bills',{
    ...billmanagementSchema(DataTypes),
});
