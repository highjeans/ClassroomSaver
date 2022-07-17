const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setclasstimes')
        .setDescription('Sets the days and times of the week that students have class')
        .addStringOption(option =>
            option.setName('day')
                .setDescription('Day of the week of class (Ex: Mondays, Tuesdays, etc.)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time of the class')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can set class times.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        await interaction.channel.send(`<@&${studentRole.id}> ` + "The professor has set class to be " + interaction.options.getString("day") + " at " + interaction.options.getString("time"));
        await interaction.reply({content: "Class has been set and has been announced to the students!", ephemeral: true});
    },
};