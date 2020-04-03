const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("vous n'avez pas la permission !");

    let toMute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]));

    if(!toMute) return msg.channel.send("mention ou id ! (valide)");

    let role = msg.guild.roles.cache.find(r => r.name === "Muted");
    
    if(!role){
        try{
            role = await msg.guild.roles.create({data:{
                name:"Muted",
                color: "#000000",
                hoist: true,
                permissions: []
            }});

            msg.guild.channels.cache.forEach(async echannel => {
                await channel.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });

        }catch{
            //rien
        }
    }

    if(!toMute.roles.cache.has(role.id)) return msg.channel.send(`le gars n'est pas mute !`);

    if(bot.mutes[toMute.id]){
        delete bot.mutes[toMute.id];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err =>{
            if(err) throw err;
            console.log("unmute");
        });
    }

    toMute.roles.remove(role);
    msg.channel.send(`le gars a bien été unmute !`);
}

module.exports.help = {
    name: "unmute",
    desc: "`pour unmute qqun !`"
}