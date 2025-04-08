const {
    MessageEmbed,
    client
} = require('discord.js');
const {
    yourUserID
} = require('../../config/config.json');

module.exports = {
    name: 'devinfo',
    description: 'Shows detailed information about the bot developer.',
    async execute(message) {
        if (message.author.id !== yourUserID) {
            return message.reply("Sorry, you don't have permission to use this command.");
        }

        const developer = message.client.users.cache.get(yourUserID);

        const totalServers = message.client.guilds.cache.size;

        let developerStatus = developer.presence.status.charAt(0).toUpperCase() + developer.presence.status.slice(1);
        if (developerStatus === 'Offline') {
            developerStatus = 'Invisible';
        }

        const devInfoEmbed = new MessageEmbed()
            .setTitle('Bot Developer Information')
            .setDescription(`<@${yourUserID}> is the owner of **Hopper Technologies**, a well-known SMB in the tech industry. They are also the owner of **Xylo Social**, **The Society** (a community for highly intelligent individuals), a former employee of **Amazon Web Services**, and hold over 10 respected certifications spanning business, technology, and even psychology.`)
            .addField('Developer Name', developer.username, true)
            .addField('Developer ID', developer.id, true)
            .addField('Joined Discord On', developer.createdAt.toDateString(), true)
            .addField('Developer Status', developerStatus, true)
            .addField('Developer Country', `:flag_us: **United States of America**`, true)
            .setColor('GREEN')
            .setThumbnail(developer.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`);

        message.channel.send(devInfoEmbed);
    },
};
