const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createquiz')
        .setDescription('Creates a quiz and announces the date of the quiz')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date of the quiz')
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
            await interaction.reply({content: "Only Professors can create quizzes.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        const message = await interaction.channel.send(`<@&${studentRole.id}> ` + "The professor has created a quiz that will be on " + interaction.options.getString("date") + " at " + interaction.options.getString("time") + ". The professor suggests to study " + interaction.options.getString("study"));
        await message.pin();
        await interaction.reply({content: "The quiz has been created and has been announced to the students!", ephemeral: true});
    },
};