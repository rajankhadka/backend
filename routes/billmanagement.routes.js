const passport = require('passport');
const billmanagementControllers = require("../controllers/inventory.controllers/billmanagement.controllers");
const inventoryitemsControllers = require("../controllers/inventory.controllers/inventoryitems.controllers");

module.exports = (app) =>{
    app.route('/bills/new-entry')
        .post(passport.authenticate('jwt',{session:false}),billmanagementControllers.newbill);

    app.route('/bills/get/all')
        .get(passport.authenticate('jwt',{session:false}),billmanagementControllers.getAllBills);

    app.route('/bills/items/sell')
        .post(passport.authenticate('jwt',{session:false}),billmanagementControllers.sellItems);


    //inventory item
    app.route('/inventorys/update-price/buy')
        .put(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.buypriceUpdate);

    app.route('/inventorys/update-price/sell')
        .put(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.sellpriceUpdate);

    app.route('/inventorys/all')
        .get(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.getItemAll);

    app.route('/inventorys/update-item-info')
        .put(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.updateItemInfo);
    
    app.route('/inventorys/delete')
        .delete(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.deleteSpecificItem);

    app.route('/inventorys/:itemName')
        .get(passport.authenticate('jwt',{session:false}),inventoryitemsControllers.getSpecificItemOnly);
}