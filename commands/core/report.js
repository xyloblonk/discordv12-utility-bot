const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { REPORT_WEBHOOK_URL, yourUserID } = require('../../config/config.json');

module.exports = {
    name: 'report',
    description: 'Allows users to send a report to the server administrators via a webhook.',
    async execute(message, args) {
        if (!args.length) {
            return message.reply('Please provide a report message.');
        }

        const reportMessage = args.join(' ');

        const reportEmbed = new MessageEmbed()
            .setTitle('New Report')
            .setDescription(reportMessage)
            .addField('Reported by', message.author.tag, true)
            .addField('User ID', message.author.id, true)
            .setColor('RED')
            .setTimestamp()
            .setFooter('Report System');

        try {
            const response = await fetch(REPORT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [reportEmbed],
                }),
            });

            if (response.ok) {
                message.reply('Your report has been successfully sent.');
            } else {
                message.reply('There was an error sending your report. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while sending the report. Please try again later.');
        }
    },
};
