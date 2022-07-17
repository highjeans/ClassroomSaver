const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uploadnotes')
        .setDescription('Pings all students and sends your notes to the channel you specify.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send notes in')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('notes')
                .setDescription('The notes you want to send')
                .setRequired(true)),
    async execute(interaction) {
        interaction.options.getChannel("channel").send("@everyone A new pack of notes has been uploaded!")
        interaction.options.getChannel("channel").send(interaction.options.getAttachment("notes").proxyURL)

        await interaction.reply({content: "Notes Sent!", ephemeral: true});
    },
};
