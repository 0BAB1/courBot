const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("aide sur les commands")
        .setColor("#ff6d1e")
        .setThumbnail("https://lambda.sx/Elp.gif")
        .setFooter('help, pour plus d\'info me contacter');
        bot.commands.forEach(cmd => {
            embed.addField(`${bot.config.prefix} ${cmd.help.name}` , `${cmd.help.desc} \n--------------------------------------------------`);
        });

    msg.channel.send(embed);
}

module.exports.help = {
    name : "help",
    desc : "ici pour aider ex : `!bot help`"
}