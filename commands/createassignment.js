const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createassignment')
        .setDescription('Sets the deadline for an assignment')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the assignment')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Due Date of the assignment')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time the assignment is due')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can create assignments.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        const message = await interaction.channel.send(`<@&${studentRole.id}> ` + "Your assignment " + interaction.options.getString("name") + " is due on " + interaction.options.getString("date") + " at " + interaction.options.getString("time"));
        await message.pin();
        await interaction.reply({content: "Professor role given!", ephemeral: true});
    },
};