const globalResponse = require("../../../libs/global-response");
const customerServices = require("../../../services/customer.services/customer.services");

class CustomerController{
    //add new customer
    async newCustomer(req,res,next){
        try {
            const returnData = await customerServices.newCustomer(req.body);
            globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CustomerController();