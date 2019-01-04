//the require stufff
const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');



// bot bot bot?
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// bot settings (data)
const prefix = settings.prefix;
const token = settings.token;
const owner = settings.owner;

//read commands file 
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.command.set(props.help.name, props);
    })
})



bot.on('ready', async () => {
    console.log("Hello, im ready");
});


bot.on("message",msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;

    let msg_array = msg.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);

    if (!command.startsWith(prefix)) return;

    if(bot.commands.get(command.slice(prefix.length))){
        let cmd = bot.commands.get(command.slice(prefix.length));
        if (cmd) {
            cmd.run(bot,msg,args);
        }
    }
    
});



bot.login(token);

client.login(process.env.B0T_T0KEN);
