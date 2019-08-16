'use strict';
module.exports = (sequelize, DataTypes) => {
    const PlaylistSong = sequelize.define('PlaylistSong', {
    }, {});
    PlaylistSong.associate = function(models) {
        models.PlaylistSong.belongsTo(models.Song,{
            foreignKey: {allowNull: false}
            });        
        models.PlaylistSong.belongsTo(models.Playlist,{
            foreignKey: {allowNull: false}
            });        
    };
    return PlaylistSong;
};
