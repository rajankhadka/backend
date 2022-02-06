const { Sequelize,DataTypes } = require('sequelize');
const refreshToken = require('../models/refreshToken.models');
const user = require('../models/user.models');
require('dotenv').config();

const db = {};
const inventorydb = new Sequelize({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASENAME,
    dialect:process.env.DB_DATABASE,
});

db.inventorydb = inventorydb;

//tables
const userModels = user(inventorydb,DataTypes);
const refreshTokenModels = refreshToken(inventorydb,DataTypes);

//synchronizing models
(async()=>{
    try {
        // await userModels.sync({force:true});
        // await refreshTokenModels.sync({force:true});
    } catch (error) {
        console.error("cannot created table in db");
    }
})();

//exporting models
db.userModels = userModels;
db.refreshTokenModels = refreshTokenModels;

module.exports = db;

