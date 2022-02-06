const path= require("path");
const { readDirSync } = require("../utils/readdir");
const userRoutes = require("./user.routes");

module.exports = (app) => { 
    const routes = readDirSync(__dirname,'index.routes.js');
    for (const route of routes) {
        (require(path.join(__dirname,route))(app));
    }
    // userRoutes(app);  
}