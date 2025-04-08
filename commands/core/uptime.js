const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Shows information about the bot\'s uptime.',
    execute(message) {
        const bot = message.client;

        const botUptimeEmbed = new MessageEmbed()
            .setAuthor('⏱️ | Bot Uptime')
            .addField('Uptime', formatUptime(bot.uptime), true)
            .setColor('BLUE')
            .setThumbnail(bot.user.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`);

        message.channel.send(botUptimeEmbed);
    },
};

function formatUptime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
