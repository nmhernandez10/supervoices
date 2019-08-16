'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Artists", deps: []
 * createTable "Chatrooms", deps: [Users]
 * createTable "Posts", deps: [Users]
 * createTable "Messages", deps: [Chatrooms, Users]
 * createTable "Albums", deps: [Artists]
 * createTable "Playlists", deps: [Users]
 * createTable "Songs", deps: [Albums]
 * createTable "Comments", deps: [Posts, Users]
 * createTable "PlaylistSongs", deps: [Playlists, Songs]
 * createTable "Partners", deps: [Users, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-03-22T19:43:34.129Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_names": {
                    "type": Sequelize.STRING,
                    "field": "user_names"
                },
                "user_lastnames": {
                    "type": Sequelize.STRING,
                    "field": "user_lastnames"
                },
                "user_email": {
                    "type": Sequelize.STRING,
                    "field": "user_email",
                    "unique": true
                },
                "user_password": {
                    "type": Sequelize.STRING,
                    "field": "user_password"
                },
                "user_image": {
                    "type": Sequelize.STRING,
                    "field": "user_image"
                },
                "user_banner": {
                    "type": Sequelize.STRING,
                    "field": "user_banner"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Artists",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "artist_name": {
                    "type": Sequelize.STRING,
                    "field": "artist_name"
                },
                "artist_genre": {
                    "type": Sequelize.STRING,
                    "field": "artist_genre"
                },
                "artist_likes": {
                    "type": Sequelize.INTEGER,
                    "field": "artist_likes"
                },
                "artist_image": {
                    "type": Sequelize.STRING,
                    "field": "artist_image"
                },
                "artist_identifier": {
                    "type": Sequelize.STRING,
                    "field": "artist_identifier",
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Chatrooms",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "chatroom_name": {
                    "type": Sequelize.STRING,
                    "field": "chatroom_name"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Posts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "post_content": {
                    "type": Sequelize.TEXT,
                    "field": "post_content"
                },
                "post_media": {
                    "type": Sequelize.STRING,
                    "field": "post_media"
                },
                "post_likes": {
                    "type": Sequelize.INTEGER,
                    "field": "post_likes"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Messages",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "message_text": {
                    "type": Sequelize.STRING,
                    "field": "message_text"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ChatroomId": {
                    "type": Sequelize.INTEGER,
                    "field": "ChatroomId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Chatrooms",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Albums",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "album_name": {
                    "type": Sequelize.STRING,
                    "field": "album_name"
                },
                "album_likes": {
                    "type": Sequelize.INTEGER,
                    "field": "album_likes"
                },
                "album_releasedate": {
                    "type": Sequelize.DATE,
                    "field": "album_releasedate"
                },
                "album_image": {
                    "type": Sequelize.STRING,
                    "field": "album_image"
                },
                "album_identifier": {
                    "type": Sequelize.STRING,
                    "field": "album_identifier",
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ArtistId": {
                    "type": Sequelize.INTEGER,
                    "field": "ArtistId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Artists",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Playlists",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "playlist_name": {
                    "type": Sequelize.STRING,
                    "field": "playlist_name"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Songs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "song_name": {
                    "type": Sequelize.STRING,
                    "field": "song_name"
                },
                "song_duration": {
                    "type": Sequelize.INTEGER,
                    "field": "song_duration"
                },
                "song_likes": {
                    "type": Sequelize.INTEGER,
                    "field": "song_likes"
                },
                "song_identifier": {
                    "type": Sequelize.STRING,
                    "field": "song_identifier",
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "AlbumId": {
                    "type": Sequelize.INTEGER,
                    "field": "AlbumId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Albums",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Comments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "comment_content": {
                    "type": Sequelize.TEXT,
                    "field": "comment_content"
                },
                "comment_media": {
                    "type": Sequelize.STRING,
                    "field": "comment_media"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Posts",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "PlaylistSongs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "PlaylistId": {
                    "type": Sequelize.INTEGER,
                    "field": "PlaylistId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Playlists",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "SongId": {
                    "type": Sequelize.INTEGER,
                    "field": "SongId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Songs",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Partners",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserFromId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserFromId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false,
                    "name": "UserFromId"
                },
                "UserToId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserToId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false,
                    "name": "UserToId"
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
