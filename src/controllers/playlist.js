const Playlist = require('../models').Playlist;
const User = require('../models').User;
const PlaylistSong = require('../models').PlaylistSong;

module.exports = {
    getAll(req,res){
        return User.findById(req.params.user_id,{include:[PlaylistSong]})
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.findAll({
                where: {UserId: req.params.user_id},
                order: [['createdAt', 'DESC'],],
            }).then((playlists) => res.status(200).send(playlists))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));         
    },
    get(req, res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.findById(req.params.id)
            .then((playlist) =>{
                if(!playlist){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return res.status(200).send(playlist);
            })
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    post(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Playlist.create({
                playlist_name: req.body.playlist_name,               
                UserId: req.params.user_id
            }).then((playlist) => res.status(201).send(playlist))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    put(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }

            return Playlist.findById(req.params.id)
            .then((playlist)=>{
                if(!playlist){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return playlist.update({
                    playlist_name: req.body.playlist_name || playlist.playlist_name,                    
                    UserId: req.params.user_id || playlist.UserId
                }).then((playlist) => res.status(201).send(playlist))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
    delete(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }

            return Playlist.findById(req.params.id)
            .then((playlist)=>{
                if(!playlist){
                    return res.status(404).send({
                        message: 'Playlist not found',
                    });
                }
                return playlist.destroy()            
                .then((playlist) => res.status(200).send(playlist))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
};