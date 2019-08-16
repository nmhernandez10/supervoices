const Artist = require('../models').Artist;
const Album = require('../models').Album;

module.exports = {
    
    getAll(req,res){
        return Artist.findAll({
            order: [['createdAt', 'DESC'],],
        }).then((artists) => res.status(200).send(artists))
        .catch((error) => res.status(400).send(error));
    },
    getByIdentifier(req,res){
        return Artist.findAll({
            where: {artist_identifier: req.params.artist_identifier},
            order: [['createdAt', 'DESC'],],
        }).then((artists) => {
            if(artists.length < 1){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            res.status(200).send(artists[0]);})
        .catch((error) => res.status(400).send(error));
    },
    getByName(req,res){
        return Artist.findAll({
            include:[Album],
            where:{artist_name:{$iLike:'%'+req.params.artist_name+'%'}},
            limit: 10
        }).then((artists) => res.status(200).send(artists))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return res.status(200).send(artist);
        })
        .catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return Artist.create({
            artist_name: req.body.artist_name,
            artist_genre: req.body.artist_genre,
            artist_likes: req.body.artist_likes || 0,
            artist_description: req.body.artist_description,            
            artist_identifier : req.body.artist_identifier,
            artist_image: req.body.artist_image
        }).then((artist) => res.status(201).send(artist))
        .catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if (!artist) {
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return artist.update({
                artist_name: req.body.artist_name || artist.artist_name,
                artist_genre: req.body.artist_genre || artist.artist_genre,
                artist_likes: req.body.artist_likes || artist.artist_likes,
                artist_description: req.body.artist_description || artist.artist_description,
                artist_image: req.body.artist_image || artist.artist_image,
                artist_identifier : req.body.artist_identifier || artist.artist_identifier
            })
            .then((artist) => res.status(200).send(artist))
            .catch((error) => res.status(400).send(error));
        })
    },
    delete(req,res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if (!artist) {
                return res.status(400).send({
                    message: 'Artist not found.',
                });
            }
            return artist.destroy()            
            .then((artist) => res.status(200).send(artist))
            .catch((error) => res.status(400).send(error));
        })
    },
};