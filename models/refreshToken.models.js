const refreshTokenSchema = require("./models.schema/refreshToken.schema");

module.exports = (inventorydb,DataTypes) => inventorydb.define('refreshtoken',{
    ...refreshTokenSchema(DataTypes),
})