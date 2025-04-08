/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix, databaseFilePath } = require('./config/config.json');
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
client.commands = new Discord.Collection();
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
function loadCommandsFromDir(dir) {
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
    const files = fs.readdirSync(dir);
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            loadCommandsFromDir(fullPath);
        } else if (file.endsWith('.js')) {
            const command = require(fullPath);
            client.commands.set(command.name, command);
        }
    });
}
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
loadCommandsFromDir(path.join(__dirname, 'commands/'));
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
}
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
function loadDatabase() {
    if (!fs.existsSync(databaseFilePath)) {
        fs.writeFileSync(databaseFilePath, JSON.stringify({ submissions: [] }));
    }
    return JSON.parse(fs.readFileSync(databaseFilePath));
}
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
function saveDatabase(data) {
    fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2));
}
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
    if (client.commands.has(commandName)) {
        try {
            await client.commands.get(commandName).execute(message, args, client, loadDatabase, saveDatabase);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    }
});
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
client.login(token);
/*
  MADE BY XYLOBLONK
  https://discord.xyloblonk.xyz
  https://github.com/xyloblonk/discordv12-utility-bot
*/
