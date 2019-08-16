'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_content: DataTypes.TEXT,
    comment_media: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
    models.Comment.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Comment;
};