const Album = require('../models').Album;
const Artist = require('../models').Artist;
const Song = require('../models').Song;
const User = require('../models').User;
const Playlist = require('../models').Playlist;
const PlaylistSong = require('../models').PlaylistSong;

module.exports = {
    getAll(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.album_id)
            .then((album) => {
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return Song.findAll({
                    where: {AlbumId: req.params.album_id},
                    order: [['createdAt', 'DESC'],],
                }).then((songs) => res.status(200).send(songs))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));               
    },
    getByIdentifier(req,res){        
        return Song.findAll({            
            where: {song_identifier: req.params.song_identifier},
            order: [['createdAt', 'DESC'],],
        }).then((songs) => {
            if(songs.length <1){
                return res.status(404).send({
                    message: 'Song not found',
                });
            }
            res.status(200).send(songs[0]);})
        .catch((error) => res.status(400).send(error));               
    },
    getByName(req,res){
        return Song.findAll({
            include: [{
                model: Album,
                include: [Artist]
              }],
            where:{song_name:{$iLike:'%'+req.params.song_name+'%'}},
            limit: 20
        }).then((songs) => res.status(200).send(songs))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.album_id)
            .then((album) => {
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return Song.findById(req.params.id)
                .then((song) =>{
                    if(!song){
                        return res.status(404).send({
                            message: 'Song not found',
                        });
                    }
                    return res.status(200).send(song);
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error)); 
        
    },
    post(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.album_id)
            .then((album) => {
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return Song.create({
                    song_name: req.body.song_name,
                    song_duration: req.body.song_duration,
                    song_likes: req.body.song_likes || 0,
                    song_identifier: req.body.song_identifier,
                    AlbumId: req.params.album_id
                }).then((song) => res.status(201).send(song))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));      
    },
    put(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.album_id)
            .then((album) => {
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return Song.findById(req.params.id)
                .then((song) =>{
                    if(!song){
                        return res.status(404).send({
                            message: 'Song not found',
                        });
                    }
                    return song.update({
                        song_name: req.body.song_name || song.song_name,
                        song_duration: req.body.song_duration || song.song_duration,
                        song_likes: req.body.song_likes || song.song_likes,
                        song_identifier: req.body.song_identifier || song.song_identifier,
                        AlbumId: req.params.album_id || song.AlbumId
                    }).then((song) => res.status(201).send(song))
                    .catch((error) => res.status(400).send(error));
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));       
    },
    delete(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.album_id)
            .then((album) => {
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return Song.findById(req.params.id)
                .then((song) =>{
                    if(!song){
                        return res.status(404).send({
                            message: 'Song not found',
                        });
                    }
                    return song.destroy()            
                    .then((song) => res.status(200).send(song))
                    .catch((error) => res.status(400).send(error));
                }).catch((error) => res.status(400).send(error));                
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    getAllFromPlaylist(req,res){
        return User.findById(req.params.user_id)
        .then((user)=>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.findAll({
                where:{UserId: req.params.user_id, id: req.params.playlist_id},
            }).then((playlist)=>{
                if(playlist.length < 1){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return PlaylistSong.findAll({
                    where:{PlaylistId:req.params.playlist_id},
                }).then((songs) => res.status(200).send(songs))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
    getFromPlaylist(req,res){
        return User.findById(req.params.user_id)
        .then((user)=>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.findAll({
                where:{UserId: req.params.user_id, id: req.params.playlist_id},
            }).then((playlist)=>{
                if(playlist.length < 1){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return PlaylistSong.findAll({
                    where:{PlaylistId:req.params.playlist_id, SongId: req.params.id},
                }).then((song) => {
                    if(song.length < 1){
                        return res.status(404).send({
                            message: 'Song not found in Playlist',
                        });
                    }
                    res.status(200).send(song);
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
    postOnPlaylist(req,res){
        return User.findById(req.params.user_id)
        .then((user)=>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.findAll({
                where:{UserId: req.params.user_id, id: req.params.playlist_id},
            }).then((playlist)=>{
                if(playlist.length < 1){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return Song.findById(req.params.id)
                .then((song) => {
                    if(!song){
                        return res.status(404).send({
                            message: 'Song not found',
                        });
                    }
                    return PlaylistSong.findAll({
                        where:{PlaylistId: req.params.playlist_id, SongId: req.params.id},                        
                    }).then((playlistsong) => {
                        if(playlistsong.length > 0){
                            return res.status(404).send({
                                message: 'That Song is already in that Playlist',
                            });
                        }
                        return PlaylistSong.create({
                            PlaylistId: req.params.playlist_id,                        
                            SongId: req.params.id
                        }).then((song) => res.status(201).send(song))
                        .catch((error) => res.status(400).send(error));
                    }).catch((error) => res.status(400).send(error));                    
                }).catch((error) => res.status(400).send(error));                
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
    deleteFromPlaylist(req,res){
        return User.findById(req.params.user_id)
        .then((user)=>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return PlaylistSong.findAll({
                where:{PlaylistId: req.params.playlist_id, SongId: req.params.id},                        
            }).then((playlistsong) => {
                if(playlistsong.length < 1){
                    return res.status(404).send({
                        message: 'Song not found in Playlist',
                    });
                }
                return playlistsong[0].destroy({
                    where:{PlaylistId: req.params.playlist_id, SongId: req.params.id},                        
                })
                .then((song) => res.status(200).send(song))
                .catch((error) => res.status(400).send(error));              
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
};

