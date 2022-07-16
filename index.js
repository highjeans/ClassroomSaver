const fs = require('node:fs');
const path = require('node:path');
const {Client, Intents, Collection} = require("discord.js");
const {token} = require("./config.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const commandFile of commands) {
    const filePath = path.join(commandsPath, commandFile);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
})

client.login(token);
