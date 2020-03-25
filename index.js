const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
bot.config = require('./config.json');
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files)=>{
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log('pas de commandes a charger !');
        return;
    }

    console.log(`... chargement de ${jsfiles.length} commandes ...`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1} : chargement de => "${props.help.name}"`);
        bot.commands.set(f.split(".")[0], props);
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} est prêt !`);

    bot.user.setActivity('salut', {type : 'WATCHING'});

    try{
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(`lien d'invitaion : ${link}`);
    }catch(e){
        console.log(e.stack);
    }
});

bot.on("message" ,async (msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;

    let messageArray = msg.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(bot.config.prefix)) return;

    let cmd = bot.commands.get(args[0]);
    if(cmd) cmd.run(bot, msg, args);
});

bot.login(bot.config.token);