'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    album_name: DataTypes.STRING,
    album_likes: DataTypes.INTEGER,
    album_releasedate: DataTypes.DATE,
    album_image: DataTypes.STRING,
    album_identifier: {type: DataTypes.STRING, unique: true}
  }, {});
  Album.associate = function(models) {
    models.Album.hasMany(models.Song);
    models.Album.belongsTo(models.Artist,{
      onDelete: "CASCADE",      
      foreignKey:{
        allowNull: false
      }
    });    
  };
  return Album;
};