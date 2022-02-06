const inventoryBillSchema = require("./models.schema/inventory-bill.schema");

module.exports = (inventorydb,DataTypes) => inventorydb.define('inventorybills',{
    ...inventoryBillSchema(DataTypes),
});