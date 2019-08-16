'use strict';
module.exports = (sequelize, DataTypes) => {
    const Partner = sequelize.define('Partner', {
    }, {});
    Partner.associate = function(models) {
        models.Partner.belongsTo(models.User,{
            foreignKey: {name: 'UserFromId',allowNull: false}
        });        
        models.Partner.belongsTo(models.User,{
            foreignKey: {name: 'UserToId',allowNull: false}
        });        
    };
    return Partner;
};
