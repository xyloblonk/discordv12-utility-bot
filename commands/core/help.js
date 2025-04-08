const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all available commands.',
    async execute(message, args, client) {
        const commandsDir = path.join(__dirname, '..', '..', 'commands');

        const categories = fs.readdirSync(commandsDir).filter(file => fs.statSync(path.join(commandsDir, file)).isDirectory());

        const helpList = [];

        const uncategorizedCommands = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js') && !fs.statSync(path.join(commandsDir, file)).isDirectory());

        if (uncategorizedCommands.length > 0) {
            const uncategorizedCommandsList = uncategorizedCommands.map(file => {
                const command = require(path.join(commandsDir, file));
                return `${command.name} • ${command.description}`;
            });
            helpList.push(`**Uncategorized:**\n${uncategorizedCommandsList.join('\n')}`);
        }

        for (const category of categories) {
            const categoryFolder = path.join(commandsDir, category);
            const commandFiles = fs.readdirSync(categoryFolder).filter(file => file.endsWith('.js'));

            const commandsInCategory = commandFiles.map(file => {
                const command = require(path.join(categoryFolder, file));
                return `${command.name} • ${command.description}`;
            });

            helpList.push(`**${category.charAt(0).toUpperCase() + category.slice(1)}:**\n${commandsInCategory.join('\n')}`);
        }

        const helpEmbed = new MessageEmbed()
            .setTitle('__**Available Commands**__')
            .setDescription(helpList.join('\n\n'))
            .setColor('BLUE')
            .setFooter('Use !<command_name> to execute a command')
            .setTimestamp();

        message.channel.send(helpEmbed);
    },
};
