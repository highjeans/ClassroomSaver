const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setofficehours')
        .setDescription('Sets the time and day of office hours.')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date of the office hours')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time of the office hours')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can set office hours.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        const message = await interaction.channel.send(`<@&${studentRole.id}> ` + "The professor has set Office Hours to be on " + interaction.options.getString("date") + " at " + interaction.options.getString("time"));
        await message.pin();
        await interaction.reply({content: "Office Hours has been set and has been announced to the students!", ephemeral: true});
    },
};