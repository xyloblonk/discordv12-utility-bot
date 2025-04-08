const { MessageEmbed } = require('discord.js');
const { yourUserID } = require('../../config/config.json');

module.exports = {
    name: 'eval',
    description: 'Executes JavaScript code.',
    async execute(message, args) {
        if (message.author.id !== yourUserID) {
            return message.reply('You do not have permission to use this command.');
        }

        const code = args.join(' ');

        try {
            let result = eval(code);

            if (result instanceof Promise) {
                result = await result;
            }

            if (typeof result !== 'string') {
                result = require('util').inspect(result, { depth: 1 });
            }

            const embed = new MessageEmbed()
                .setTitle('Eval Result')
                .setDescription(`\`\`\`js\n${result}\n\`\`\``)
                .setColor('GREEN')
                .setFooter('Executed by ' + message.author.tag)
                .setTimestamp();

            message.channel.send(embed);

        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('Eval Error')
                .setDescription(`\`\`\`js\n${error}\n\`\`\``)
                .setColor('RED')
                .setFooter('Executed by ' + message.author.tag)
                .setTimestamp();

            message.channel.send(embed);
        }
    },
};
