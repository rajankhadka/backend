const globalResponse = require("../../libs/global-response");
const inventoryitemsServices = require("../../services/inventory.services/inventoryitems.services");

class InventoryItemController{
    //buy price update
    async buypriceUpdate(req,res,next){
        try {
            const returnData = await inventoryitemsServices.updateSpecificItemBuyPrice({
                itemName:req.body.itemName,
                price:req.body.price
            });
            console.log(returnData);
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //sell price update
    async sellpriceUpdate(req,res,next){
        try {
            const returnData = await inventoryitemsServices.updateSpecificItemSellPrice({
                itemName:req.body.itemName,
                price:req.body.price
            });
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //get all items
    async getItemAll(req,res,next){
        try {
            const returnData = await inventoryitemsServices.getItemAll();
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //get specific item only
    async getSpecificItemOnly(req,res,next){
        try {
            const returnData = await inventoryitemsServices.getSpecificItemOnly({
                itemName:req.params.itemName
            });
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //delete specific item
    async deleteSpecificItem(req,res,next){
        try {
            const returnData = await inventoryitemsServices.deleteItem({itemName:req.body.itemName});
            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }

    //update item info
    async updateItemInfo(req,res,next){
        try {
            // console.log(req.body);
            const returnData = await inventoryitemsServices.updateItemInfo({
                itemCatagory:req.body.itemCatagory,
                itemQuantity:req.body.itemQuantity,
                itemSold:req.body.itemSold,
                newItemName:req.body.newItemName,
                oldItemName:req.body.oldItemName
            });

            return globalResponse(res,returnData);
        } catch (error) {
            next(error);
        }
    }


    
}

module.exports = new InventoryItemController();