module.exports = (DataTypes) => {
    return {
        id:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
        },
        itemName:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        pieces:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    }
};
