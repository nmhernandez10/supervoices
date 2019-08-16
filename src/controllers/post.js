const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
    getAll(req,res){
        return Post.findAll({
            where: {UserId: req.params.user_id},
            order: [['createdAt', 'DESC'],],
        }).then((posts) => res.status(200).send(posts))
        .catch((error) => res.status(400).send(error));
    },
    getByQuantity(req,res){
        return Post.findAll({
            where: {UserId: req.params.user_id},
            order: [['createdAt', 'DESC'],],
            limit: req.params.limit
        }).then((posts) => res.status(200).send(posts))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found.',
                });
            }
            return Post.findById(req.params.id)
            .then((post) =>{
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found',
                    });
                }
                return res.status(200).send(post);
            })
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    post(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found.',
                });
            }
            return Post.create({
                post_content: req.body.post_content,
                post_media: req.body.post_media,
                post_likes: req.body.post_likes || 0,
                UserId: req.params.user_id
            }).then((post) => res.status(201).send(post))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    put(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found.',
                });
            }

            return Post.findById(req.params.id)
            .then((post)=>{
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found.',
                    });
                }
                return post.update({
                    post_content: req.body.post_content || post.post_content,
                    post_media: req.body.post_media || post.post_media,
                    post_likes: req.body.post_likes || post.post_likes,
                    UserId: req.params.user_id || post.UserId
                }).then((post) => res.status(201).send(post))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
    delete(req,res){
        return User.findById(req.params.user_id)
        .then((user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found.',
                });
            }

            return Post.findById(req.params.id)
            .then((post)=>{
                if(!post){
                    return res.status(404).send({
                        message: 'Post not found.',
                    });
                }
                return post.destroy()            
                .then((post) => res.status(200).send(post))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
};