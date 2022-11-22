const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('nameRecipes', {
       id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
     title: {
       type: DataTypes.STRING,
       allowNull: false,
        },
    }, {
        timestamps: false
      })
}