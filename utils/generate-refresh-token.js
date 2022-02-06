const {v4:uuidv4} = require('uuid');

const generaterefreshToken = () =>{
    return uuidv4();
}

module.exports = generaterefreshToken;