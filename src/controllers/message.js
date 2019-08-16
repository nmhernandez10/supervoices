const Message = require('../models').Message;
const Chatroom = require('../models').Chatroom;
const User = require('../models').User;

module.exports = {
    getAll(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Chatroom.findById(req.params.chatroom_id)
            .then((chatroom) => {
                if(!chatroom){
                    return res.status(404).send({
                        message: 'Chatroom not found',
                    });
                }
                return Message.findAll({
                    where: {ChatroomId: req.params.chatroom_id},
                    order: [['createdAt', 'DESC'],],
                }).then((messages) => res.status(200).send(messages))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));         
        }).catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Chatroom.findById(req.params.chatroom_id)
            .then((chatroom) => {
                if(!chatroom){
                    return res.status(404).send({
                        message: 'Chatroom not found',
                    });
                }
                return Message.findById(req.params.id)
                .then((message) =>{
                    if(!message){
                        return res.status(404).send({
                            message: 'Message not found',
                        });
                    }
                    return res.status(200).send(message);
                })
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));        
        }).catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Chatroom.findById(req.params.chatroom_id)
            .then((chatroom) => {
                if(!chatroom){
                    return res.status(404).send({
                        message: 'Chatroom not found',
                    });
                }
                return Message.create({
                    message_text: req.body.message_text,
                    message_date: req.body.message_date,
                    ChatroomId: req.params.chatroom_id,
                    UserId : req.params.user_id
                }).then((message) => res.status(201).send(message))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));        
        }).catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
          if(!user) {
              return res.status(404).send({
                  message: 'User not found',
              });
          }  
          return Chatroom.findById(req.params.chatroom_id)
          .then((chatroom) => {
              if(!chatroom){
                  return res.status(404).send({
                      message: 'Chatroom not found',
                  });
              }
  
              return Message.findById(req.params.id)
              .then((message)=>{
                  if(!message){
                      return res.status(404).send({
                          message: 'Message not found',
                      });
                  }
                  return message.update({
                      message_text: req.body.message_text || message.message_text,
                      message_date: req.body.message_date || message.message_date,
                      ChatroomId: req.params.chatroom_id || message.ChatroomId,
                      UserId : req.params.user_id || message.UserId
                  }).then((message) => res.status(201).send(message))
                  .catch((error) => res.status(400).send(error));
              }).catch((error) => res.status(400).send(error));          
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
            return Chatroom.findById(req.params.chatroom_id)
            .then((chatroom)=>{
                if(!chatroom){
                    return res.status(404).send({
                        message: 'Chatroom not found',
                    });
                }
                return Message.findById(req.params.id)
                .then((message) =>{
                    if(!message){
                        return res.status(404).send({
                            message: 'Message not found',
                        });
                    }
                    return message.destroy()            
                    .then((message) => res.status(200).send(message))
                    .catch((error) => res.status(400).send(error));
                }).catch((error) => res.status(400).send(error));               
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
};