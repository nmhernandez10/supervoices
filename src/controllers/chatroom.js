const Chatroom = require('../models').Chatroom;
const User = require('../models').User;

module.exports = {
    getAll(req, res) {
        return Chatroom.findAll({
                where: {
                    UserId: req.params.user_id
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then((chatrooms) => res.status(200).send(chatrooms))
            .catch((error) => res.status(400).send(error));
    },
    get(req, res) {
        return User.findById(req.params.user_id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return Chatroom.findById(req.params.id)
                    .then((chatroom) => {
                        if (!chatroom) {
                            return res.status(404).send({
                                message: 'Chatroom not found',
                            });
                        }
                        return res.status(200).send(chatroom);
                    })
                    .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },
    post(req, res) {
        return User.findById(req.params.user_id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return Chatroom.create({
                        chatroom_name: req.body.chatroom_name,
                        chatroom_mediaidentifier: req.body.chatroom_mediaidentifier,
                        UserId: req.params.user_id
                    }).then((chatroom) => res.status(201).send(chatroom))
                    .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },
    put(req, res) {
        return User.findById(req.params.user_id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return Chatroom.findById(req.params.id)
                    .then((chatroom) => {
                        if (!chatroom) {
                            return res.status(404).send({
                                message: 'Chatroom not found',
                            });
                        }
                        return chatroom.update({
                                chatroom_name: req.body.chatroom_name || chatroom.chatroom_name,
                                chatroom_mediaidentifier: req.body.chatroom_mediaidentifier || chatroom.chatroom_mediaidentifier,
                                UserId: req.params.user_id || chatroom.UserId
                            })
                            .then((chatroom) => res.status(201).send(chatroom))
                            .catch((error) => res.status(400).send(error));
                    }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },
    delete(req, res) {
        return User.findById(req.params.user_id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return Chatroom.findById(req.params.id)
                    .then((chatroom) => {
                        if (!chatroom) {
                            return res.status(400).send({
                                message: 'Chatroom not found',
                            });
                        }
                        return chatroom.destroy()
                            .then((chatroom) => res.status(200).send(chatroom))
                            .catch((error) => res.status(400).send(error));
                    }).catch((error) => res.sttus(400).send(error));
            }).catch((error) => res.status(400).send(error));
    },
};