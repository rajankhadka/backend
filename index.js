const express = require('express');
const passport = require('passport');
const {globalErrorResponse} = require('./error-exception/global-error-response');
const pagenotfound = require('./error-exception/pagenotfound');
const db = require('./libs/db-connection');
const cors = require('cors');
require("dotenv").config();
require('./middleware/jwt-token-verify.middleware');

//import routes
const initRoutes = require('./routes/index.routes');

const PORT=process.env.PORT;
const app=express();

//db connection
(async()=>{
    try {
        await db.inventorydb.authenticate();
        console.log("database connection established successfully");
    } catch (error) {
        console.error("Unable to connect!!!");
    }
})();

//middleware
app.use(express.json());
// app.use(passport.initialize());
app.use(cors({
    origin:"http://localhost:3000",
    methods:["PATCH",'GET', 'PUT', 'POST','DELETE'],
}))

// routes
initRoutes(app);
app.get('/test',(req,res)=>{
    res.status(200).json({message:'working'});
});

//page not found
app.use(pagenotfound);

//error middleware
app.use(globalErrorResponse);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});