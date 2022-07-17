const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createquestionpoll')
        .setDescription('Creates a question poll for the students to answer')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask the students')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can create question polls.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        await interaction.channel.send(`<@&${studentRole.id}> ` + interaction.options.getString("question"));
        await interaction.reply({content: "Question Poll Created!", ephemeral: true});
    },
};