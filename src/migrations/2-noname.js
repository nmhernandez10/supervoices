'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "chatroom_mediaidentifier" to table "Chatrooms"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2019-03-23T07:42:35.738Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Chatrooms",
        "chatroom_mediaidentifier",
        {
            "type": Sequelize.STRING,
            "field": "chatroom_mediaidentifier"
        }
    ]
}];

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
