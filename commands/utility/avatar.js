const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Get a user\'s avatar.',
    async execute(message, args) {
        let user = message.mentions.users.first() || message.author;

        const avatarEmbed = new MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor('BLUE')
            .setFooter('Requested by ' + message.author.tag)
            .setTimestamp();

        message.channel.send(avatarEmbed);
    },
};
