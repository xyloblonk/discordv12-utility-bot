const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Shows information about the bot.',
    execute(message) {
        const bot = message.client;

        const botInfoEmbed = new MessageEmbed()
            .setTitle('Bot Information')
            .addField('Bot Name', bot.user.username, true)
            .addField('Bot ID', bot.user.id, true)
            .addField('Servers', bot.guilds.cache.size, true)
            .addField('Users', bot.users.cache.size, true)
            .addField('Uptime', formatUptime(bot.uptime), true)
            .addField('Bot Created At', bot.user.createdAt.toDateString(), true)
            .setColor('BLUE')
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`);

        message.channel.send(botInfoEmbed);
    },
};

function formatUptime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
