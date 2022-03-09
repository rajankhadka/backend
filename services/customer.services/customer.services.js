const { customerModels } = require("../../libs/db-connection");

class CustomerServices{
    //new customer entry
    async newCustomer(data){
        try {
            await customerModels.create(data);
            return {
                data:{
                    message:"New Customer entry Success!!!"
                },
                statusCode:201
            }
        } catch (error) {
           throw error; 
        }
    }
}

module.exports = new CustomerServices();