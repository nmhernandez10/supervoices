'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    artist_genre: DataTypes.STRING,
    artist_likes: DataTypes.INTEGER,
    artist_image: DataTypes.STRING,
    artist_identifier: {type: DataTypes.STRING, unique: true}
  }, {});
  Artist.associate = function(models) {
    models.Artist.hasMany(models.Album);
  };
  return Artist;
};