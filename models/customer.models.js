const customerSchema = require("./models.schema/customer.schema");

module.exports= (inventorydb,DataTypes) => inventorydb.define('customers',{
    ...customerSchema(DataTypes),
});
