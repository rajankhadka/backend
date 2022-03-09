const { billmanagementModels, inventorydb } = require("../../libs/db-connection");
const inventoryitemsServices = require("./inventoryitems.services");

class BillManagementServices{
    
    //new entry
    async newbill(data){
        try {
            // console.log(data);
            await inventorydb.transaction(async(t) =>{
                if(data.items.length <= 0) throw new Error("no items present on bill");
                const billDueAmount = data.billTotalAmount - data.billpaidAmount;
                await billmanagementModels.create({
                    billType:data.billType,
                    billPaymantType:data.billPaymantType,
                    billName:data.billName,
                    billAddress:data.billAddress,
                    billContact:data.billContact,
                    billregistration:data.billregistration,
                    billTotalAmount:data.billTotalAmount,
                    billpaidAmount:data.billpaidAmount,
                    billDueAmount:billDueAmount,
                },{transaction:t});

                for (let i = 0; i < data.items.length; i++) {
                    await inventoryitemsServices.newItemAdd(data.items[i],t);
                }
                
            });
            
            return {
                data:{},
                message:"new bill added",
                statusCode:201,
            }
        } catch (error) {
            throw error;
        }
        
    }

    //get all bill
    async getAllBill(){
        try {
            const foundData = await billmanagementModels.findAll();
            return {
                data:{
                    bills:foundData,
                    totalBill: foundData.length,
                    message:'Get all bills',
                    statusCode:200
                }
            }
        } catch (error) {
            throw error;
        }
    }

    //sell items
    async sellItems(data){
        try {
            let totalPrice = 0;
            await inventorydb.transaction(async(t) =>{
                for (let i = 0; i < data.length; i++) {
                    totalPrice = await inventoryitemsServices.sellItemsToCustomer(data[i],totalPrice,t);
                }
            });

            return{
                data:{
                    totalPrice,
                },
                message:'Item sold',
                statusCode:200,
            }
            
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new BillManagementServices();