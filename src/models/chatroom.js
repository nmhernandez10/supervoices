'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chatroom = sequelize.define('Chatroom', {
    chatroom_name: DataTypes.STRING,
    chatroom_mediaidentifier : DataTypes.STRING
  }, {});
  Chatroom.associate = function(models) { 
    models.Chatroom.hasMany(models.Message);
    models.Chatroom.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Chatroom;
};