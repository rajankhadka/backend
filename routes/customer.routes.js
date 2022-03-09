const customerController = require("../controllers/inventory.controllers/customer.controller/customer.controller")

module.exports = (app) =>{
    app.route('/customer/add')
        .post(customerController.newCustomer);
};

