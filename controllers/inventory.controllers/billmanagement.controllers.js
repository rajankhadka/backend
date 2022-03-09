const globalResponse = require("../../libs/global-response");
const billmanagementServices = require("../../services/inventory.services/billmanagement.services");

class BillManagementControllers{
    //new entry
    async newbill(req,res,next){
        try {
            const returnData = await billmanagementServices.newbill(req.body);
            return globalResponse(res,returnData)
        } catch (error) {
            next(error);
        }
    }

    //get all bills
    async getAllBills(req,res,next){
        try {
            const returnData = await billmanagementServices.getAllBill();
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //item sell to customer
    async sellItems(req,res,next){
        try {
            const returnData = await billmanagementServices.sellItems(req.body.items);
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BillManagementControllers();