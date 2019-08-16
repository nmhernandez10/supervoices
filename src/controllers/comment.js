const Post = require('../models').Post;
const User = require('../models').User;
const Comment = require('../models').Comment;

module.exports = {
    getAll(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Post.findById(req.params.post_id)
            .then((post) => {
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return Comment.findAll({
                    where: {PostId: req.params.post_id},
                    order: [['createdAt', 'DESC'],],
                }).then((Comment) => res.status(200).send(Comment))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
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
            return Post.findById(req.params.post_id)
            .then((post) => {
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return Comment.findById(req.params.id)
                .then((comment) =>{
                    if(!comment){
                        return res.status(404).send({
                            message: 'Comment not found',
                        });
                    }
                    return res.status(200).send(comment);
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error)); 
        
    },
    post(req,res){
        return User.findById(req.params.user_id)
        .then((User) => {
            if(!User){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Post.findById(req.params.post_id)
            .then((post) => {
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return Comment.create({
                    comment_date: req.body.comment_date,
                    comment_content: req.body.comment_content,
                    comment_media: req.body.comment_media || 0,
                    PostId: req.params.post_id,
                    UserId: req.params.user_id
                }).then((comment) => res.status(201).send(comment))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));      
    },
    put(req,res){
        return User.findById(req.params.user_id)
        .then((User) => {
            if(!User){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Post.findById(req.params.post_id)
            .then((post) => {
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return Comment.findById(req.params.id)
                .then((comment) =>{
                    if(!comment){
                        return res.status(404).send({
                            message: 'Comment not found',
                        });
                    }
                    return comment.update({
                        comment_date: req.body.comment_date || post.comment_date,
                        comment_content: req.body.comment_content ||post.comment_content,
                        comment_media: req.body.comment_media || post.comment_media,
                        PostId: req.params.post_id || post.PostId,
                        UserId: req.params.user_id || post.UserId
                    }).then((comment) => res.status(201).send(comment))
                    .catch((error) => res.status(400).send(error));
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));       
    },
    delete(req,res){
        return User.findById(req.params.user_id)
        .then((User) => {
            if(!User){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return Post.findById(req.params.post_id)
            .then((post) => {
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return Comment.findById(req.params.id)
                .then((comment) =>{
                    if(!comment){
                        return res.status(404).send({
                            message: 'Comment not found',
                        });
                    }
                    return comment.destroy()            
                    .then((comment) => res.status(200).send(comment))
                    .catch((error) => res.status(400).send(error));
                }).catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
};