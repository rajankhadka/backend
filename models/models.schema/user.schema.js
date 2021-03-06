module.exports = (DataTypes) =>{
    return {
        id:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
        },
        firstname:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        lastname:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true,
        },
        email:{
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        phonenumber:{
            type:DataTypes.STRING(14),
            allowNull:false,
            unique:true,
        },
        
    }
}