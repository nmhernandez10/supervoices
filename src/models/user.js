'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_names: DataTypes.STRING,
    user_lastnames: DataTypes.STRING,
    user_email: {type:DataTypes.STRING, unique: true},
    user_password: DataTypes.STRING,
    user_image: DataTypes.STRING,
    user_banner: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Partner, {foreignKey:'UserFromId', as:'Partners'});
    models.User.hasMany(models.Post);
    models.User.hasMany(models.Message);
    models.User.hasMany(models.Playlist);
    models.User.hasMany(models.Chatroom);
  };
  return User;
};