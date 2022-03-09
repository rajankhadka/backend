const { inventoryitemsModels } = require("../../libs/db-connection");

class InventoryItemsServices{
   

    //get specific items by item name
    async getSpecificItems({itemName,t}){
        try {
            const item = await inventoryitemsModels.findOne({
                where:{
                    itemName
                },
                attributes:{
                    exclude:["updatedAt","createdAt"],
                }
            },{transaction:t});
            return item;
        } catch (error) {
            throw error;
        }
    }
    
    //update specific items by name
    async updateSpecificItems(data,foundItem,t){
        try {
            const itemQuantity = data.itemQuantity + foundItem.itemQuantity;
            await inventoryitemsModels.update({
                itemQuantity,
                itemBuyPrice:data.itemBuyPrice,
                itemSellPrice:data.itemSellPrice,
                itemCatagory:data.itemCatagory,
                itemRemaining:itemQuantity
            },{
                where:{
                    itemName:data.itemName
                }
            },{transaction:t});
            return true;
        } catch (error) {
            throw error;
        }
    }

    //price update boilerplate
    async updateSpecificItemPrice({itemName,price,type}){
        try {
            const foundItem = await this.getSpecificItems({itemName:itemName});
            if(!foundItem) throw new Error('No Such Item Present');
            if(type === 'itemBuyPrice'){
                await inventoryitemsModels.update({
                    itemBuyPrice:price
                },{
                    where:{
                        itemName:itemName
                    }
                });
            }else{
                await inventoryitemsModels.update({
                    itemSellPrice:price
                },{
                    where:{
                        itemName:itemName
                    }
                });
            }
            
            
            return{
                data:{
                    type:type,
                    price:price,
                    itemName
                },
                message:`${itemName} price update`,
                statusCode:200
            }
        } catch (error) {
            throw error;
        }
    }

    //buy price update
    async updateSpecificItemBuyPrice({itemName,price}){
        try {
            const returnData = await this.updateSpecificItemPrice({
                itemName:itemName,
                price:price,
                type:"itemBuyPrice"
            });
            return returnData;
        } catch (error) {
            throw error;
        }
    }

    //sell price update
    async updateSpecificItemSellPrice({itemName,price}){
        try {
            const returnData = await this.updateSpecificItemPrice({
                itemName:itemName,
                price:price,
                type:"itemSellPrice"
            });
            return returnData;
        } catch (error) {
            throw error;
        }
    }

    //add items
    async newItemAdd(data,t){
        try {
            const foundItem = await this.getSpecificItems({itemName:data.itemName,t:t});
            if(!foundItem){
                await inventoryitemsModels.create({
                    itemName:data.itemName,
                    itemQuantity:data.itemQuantity,
                    itemBuyPrice:data.itemBuyPrice,
                    itemSellPrice:data.itemSellPrice,
                    itemCatagory:data.itemCatagory,
                    itemRemaining:data.itemQuantity,
                    itemSold:0,
                },{transaction:t});
            }else{
                await this.updateSpecificItems(data,foundItem,t);
            }
            return {
                data:{},
                message:'new Item added to inventory',
                status:201,
            }
        } catch (error) {
            throw error;
        }
    }

    //get all items
    async getItemAll(){
        try {
            const foundData = await inventoryitemsModels.findAll();
            return {
                data:{
                    items:foundData,
                    totalItems:foundData.length,
                },
                message:"get all Items",
                statusCode:200
            }
        } catch (error) {
            throw error
        }
    }

    async getSpecificItemOnly({itemName}){
        try {
            const foundData = await this.getSpecificItems({
                itemName:itemName
            });
            if(!foundData) throw new Error(`Such ${itemName} doesnot exists`);
            return{
                item:foundData,
                message:"get specific items",
                statusCode:200,
            }
        } catch (error) {
            throw error;
        }
    }

    //update itemName,quantity, sold and remaining
    async updateItemInfo({oldItemName,newItemName,itemQuantity,itemSold,itemCatagory}){
        try {
            
            const foundData = await this.getSpecificItems({itemName:oldItemName});
            if(!foundData) throw new Error(`No Such ${oldItemName} exists`);
            const itemRemaining = itemQuantity - itemSold;

            await inventoryitemsModels.update({
                itemName:newItemName,
                itemCatagory,
                itemQuantity,
                itemSold,
                itemRemaining
            },{
                where:{
                    itemName:oldItemName
                }
            });

            return {
                data:{
                    item:`${newItemName} updated`
                },
                message:'update successfully',
                statusCode:200,
            }
        } catch (error) {
            throw error;
        }
    }

    //delete item
    async deleteItem({itemName}){
        try {
            const foundData = await this.getSpecificItems({
                itemName
            });
            if(!foundData) throw new Error(`No Such ${itemName} exists`);
            await inventoryitemsModels.destroy({
                where:{
                    itemName
                }
            });
            return {
                data:{
                    item: `${itemName} delete`
                },
                message:'delete successfully',
                statusCode:200
            }
        } catch (error) {
            throw error;
        }
    }


    //sell items
    async sellItemsToCustomer(data,totalPrice,t){
        try {
            const foundData = await this.getSpecificItems({
                itemName:data.itemName,
            });
            if(!foundData) throw new Error(`No Such ${data.itemName} exists`);

            if(data.itemQuantity > foundData.itemRemaining) throw new Error('Quantity exceeds, Cannot Sell Items');
            
            const itemSold = foundData.itemSold + data.itemQuantity;
            const itemRemaining = foundData.itemQuantity - itemSold;
            
            await inventoryitemsModels.update({
                itemRemaining,
                itemSold,
            },{
                where:{
                    itemName:data.itemName
                }
            },{transaction:t});
            return totalPrice += (foundData.itemSellPrice * data.itemQuantity);
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new InventoryItemsServices();