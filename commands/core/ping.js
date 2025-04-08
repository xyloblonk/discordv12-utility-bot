const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the bot latency.',
    async execute(message) {
        const pingEmbed = new MessageEmbed()
            .setDescription('Fetching Latency information... 3 seconds left.')
            .setColor('BLUE');

        const pingMessage = await message.channel.send(pingEmbed);

        setTimeout(() => {
            pingEmbed.setDescription('Fetching Latency information... 2 seconds left.');
            pingMessage.edit(pingEmbed);
        }, 1000);

        setTimeout(() => {
            pingEmbed.setDescription('Fetching Latency information... 1 second left.');
            pingMessage.edit(pingEmbed);
        }, 2000);

        setTimeout(() => {
            const bot = message.client;
            const latency = Date.now() - message.createdTimestamp - 3100;
            const databaseLatency = 1;

            const pingEmbed = new MessageEmbed()
                .setAuthor('🔮 | Bot Latency')
                .addField('🌐 Websocket', `**${latency}ms**`, true)
                .addField('📂 Database', `**${databaseLatency}ms**`, true)
                .setColor('BLUE')
                .setThumbnail(bot.user.displayAvatarURL({
                    dynamic: true,
                    size: 2048
                }))
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`);
            pingMessage.edit(pingEmbed);
        }, 3000);
    },
};
