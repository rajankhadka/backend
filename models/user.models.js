const userSchema = require("./models.schema/user.schema");

module.exports = (inventorydb,DataTypes) => inventorydb.define('users',{
    ...userSchema(DataTypes),
});