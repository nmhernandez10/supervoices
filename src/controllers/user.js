const User = require('../models').User;
const Partner = require('../models').Partner;
const Playlist = require('../models').Playlist;
const Chatroom = require('../models').Chatroom;
const Post = require('../models').Post;
const Message = require('../models').Message;
const PlaylistSong = require('../models').PlaylistSong;
const Song = require('../models').Song;
const Album = require('../models').Album;
const Artist = require('../models').Artist;

module.exports = {
    getAll(req,res){
        return User.findAll({
            order: [['createdAt', 'DESC'],],
        }).then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error));
    },
    getByName(req,res){
        return User.findAll({
            include:[Playlist, Chatroom],
            where: {$or:[{user_names:{$iLike:'%'+req.params.user_name+'%'}},{user_lastnames:{$iLike:'%'+req.params.user_name+'%'}}]},
            limit: 10
        }).then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return User.findById(req.params.id,{include:[{model: Playlist, include: [{model: PlaylistSong, include: [{model: Song, include: [{model: Album, include: [Artist]}]}]}]}, Chatroom, Post, Message, {model: Partner, as:'Partners', include: [{model: User, include: [Post]}]}]})
        .then((user) =>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return res.status(200).send(user);
        }).catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return User.create({
            user_names: req.body.user_names,
            user_lastnames: req.body.user_lastnames,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_image: req.body.user_image,
            user_banner: req.body.user_banner
        }).then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return User.findById(req.params.id)
        .then((user) =>{
            if (!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return user.update({
                user_names: req.body.user_names || user.user_names,
                user_lastnames: req.body.user_lastnames || user.user_lastnames,
                user_email: req.body.user_email || user.user_email,
                user_password: req.body.user_password || user.user_password,
                user_image: req.body.user_image || user.user_image,
                user_banner: req.body.user_banner || user.user_banner
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        })
    },
    delete(req,res){
        return User.findById(req.params.id)
        .then((user) =>{
            if (!user) {
                return res.status(400).send({
                    message: 'User not found',
                });
            }
            return user.destroy()            
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        })
    },
    postFriend(req,res){
        return Partner.findAll({
            where: {UserFromId: req.params.userfrom_id, UserToId: req.params.userto_id}
        }).then((partners) => {
            if(partners.length > 0){
                return res.status(400).send({
                    message: 'That friend already exists',
                });
            }
            return Partner.create({
                UserFromId: req.params.userfrom_id,
                UserToId: req.params.userto_id
            }).then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
    getFriends(req,res){
        return Partner.findAll({
            where: {UserFromId: req.params.userfrom_id}
        }).then((partners) => {
            if(partners.length < 1){
                return res.status(400).send({
                    message: 'That user does not have friends',
                });
            }
            return res.status(200).send(partners);
        }).catch((error) => res.status(400).send(error));
    },
    deleteFriend(req,res){
        return Partner.findAll({
            where: {UserFromId: req.params.userfrom_id, UserToId: req.params.userto_id}
        }).then((partners) => {
            if(partners.length < 1){
                return res.status(400).send({
                    message: 'That user does not have that friend',
                });
            }
            return partners[0].destroy()            
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
};