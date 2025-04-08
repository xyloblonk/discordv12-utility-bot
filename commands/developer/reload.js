const fs = require('fs');
const path = require('path');
const { yourUserID } = require('../../config/config.json');

module.exports = {
    name: 'reload',
    description: 'Reloads all commands without restarting the bot.',
    async execute(message, args, client) {
        if (message.author.id !== yourUserID) {
            return message.reply("You do not have permission to use this command.");
        }

        message.reply("Reloading all commands... Please wait.");

        client.commands.clear();

        const commandFolders = fs.readdirSync(path.join(__dirname, '../../commands'));

        for (const folder of commandFolders) {
            const folderPath = path.join(__dirname, '../../commands', folder);
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);

                delete require.cache[require.resolve(filePath)];

                try {
                    const command = require(filePath);

                    if (command.name && command.description && command.execute) {
                        client.commands.set(command.name, command);
                        console.log(`Reloaded command: ${command.name}`);
                    } else {
                        console.warn(`Skipping invalid command file: ${file}`);
                    }
                } catch (error) {
                    console.error(`Error loading command ${file}:`, error);
                }
            }
        }

        message.channel.send('All commands have been successfully reloaded!');
    },
};
