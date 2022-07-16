const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendannouncement')
        .setDescription('Pings all students with your custom message.')
        .addStringOption(option =>
            option.setName('announcement')
                .setDescription('The announcement to send everyone.')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can send announcements.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        await interaction.channel.send(`<@&${studentRole.id}> ` + interaction.options.getString("announcement"));
        await interaction.reply({content: "Announcement Sent!", ephemeral: true});
    },
};
