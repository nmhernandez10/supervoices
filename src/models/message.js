'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message_text: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    models.Message.belongsTo(models.Chatroom,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
    models.Message.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Message;
};