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

    if(toMute.roles.cache.has(role.id)) return msg.channel.send(`le gars est déja mute !`);

    if(args[2]){
        bot.mutes[toMute.id] = {
            guild : msg.guild.id,
            time : Date.now() + parseInt(args[2]) * 1000
        };

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err=>{
            if(err) throw err;
            msg.channel.send(`a bien été mute pour ${args[2]}`);
            console.log("mute");
        });
    }

    toMute.roles.add(role);
    msg.channel.send(`le gars a bien été mute !`);
}

module.exports.help = {
    name: "mute",
    desc: "`pour mute qqun !`"
}