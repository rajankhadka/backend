const inventoryitemsSchema = require("./models.schema/inventoryitems.schema");

module.exports = (inventorydb,DataTypes) => inventorydb.define('inventoryitems',{
    ...inventoryitemsSchema(DataTypes),
});