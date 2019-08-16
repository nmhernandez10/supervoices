'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    post_content: DataTypes.TEXT,
    post_media: DataTypes.STRING,
    post_likes: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    models.Post.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
    models.Post.hasMany(models.Comment);
  };
  return Post;
};
