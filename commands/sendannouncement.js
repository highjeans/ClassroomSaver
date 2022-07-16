const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendannouncement')
        .setDescription('Pings everyone with your custom message.')
        .addStringOption(option =>
            option.setName('announcement')
                .setDescription('The announcement to send everyone.')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.channel.send("@everyone " + interaction.options.getString("announcement"));
        await interaction.reply({content: "Done!", ephemeral: true});
    },
};
