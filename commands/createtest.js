const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtest')
        .setDescription('Creates a test and announces the date of the test')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date of the test')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time of the class')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('study')
                .setDescription('Topics to Study')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can create tests.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        const message = await interaction.channel.send(`<@&${studentRole.id}> ` + "The professor has created a test that will be on " + interaction.options.getString("date") + " at " + interaction.options.getString("time") + ". The professor suggests to study " + interaction.options.getString("study"))
        await message.pin();
        await interaction.reply({content: "The test has been created and has been announced to the students!", ephemeral: true});
    },
};