const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    console.log(chalk.green(`Logged in as ${client.user.tag}!`));
    const getAllCommandFiles = (dir) => {
        let commandFiles = [];
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                commandFiles = commandFiles.concat(getAllCommandFiles(filePath));
            } else if (file.endsWith('.js')) {
                commandFiles.push(filePath);
            }
        });

        return commandFiles;
    };

    const commandsDir = path.join(__dirname, '..', 'commands');
    const commandFiles = getAllCommandFiles(commandsDir);
    console.log(chalk.green(`Loaded ${commandFiles.length} commands`));

    const statuses = [{
            text: 'XyloBlonk',
            duration: 7000
        },
        {
            text: 'discord.xyloblonk.xyz',
            duration: 7000
        },
        {
            text: 'Xylo Social Bot',
            duration: 1000
        }
    ];

    let currentStatusIndex = 0;

    const changeStatus = () => {
        const status = statuses[currentStatusIndex];
        client.user.setActivity(status.text, {
            type: 'WATCHING'
        });

        currentStatusIndex = (currentStatusIndex + 1) % statuses.length;

        setTimeout(changeStatus, status.duration);
    };

    changeStatus();
};
