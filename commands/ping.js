const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    msg.channel.send("pong");
}

module.exports.help = {
    name : "ping",
    desc : "renvoie pong"
}