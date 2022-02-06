const bcrypt = require('bcrypt');

exports.hashpassword = async (password) =>{
    try {
        return await bcrypt.hash(password,10);    
    } catch (error) {
        throw error;
    }
}

exports.verifypassword = async(plainpassword,hashpassword) =>{
    try {
        const matched = await bcrypt.compare(plainpassword,hashpassword);
        if(!matched) return false;
        return true;
    } catch (error) {
        throw error;
    }
}