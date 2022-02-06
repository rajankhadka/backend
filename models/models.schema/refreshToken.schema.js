module.exports = (DataTypes) =>{
    return {
        id:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
        },
        username:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        authorization:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        refreshToken:{
            type:DataTypes.UUID,
            allowNull:false,
        }
    }
}