const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createquestionpoll')
        .setDescription('Creates a question poll for the students to answer')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask the students')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('answer')
                .setDescription('The answer to the question')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can create question polls.", ephemeral: true});
            return;
        }

        const studentRole = await interaction.guild.roles.cache.find(role => role.name === "Student");
        const thread = await interaction.channel.threads.create({
            name: "Question Poll"
        });
        await thread.send(`<@&${studentRole.id}> ` + interaction.options.getString("question"));
        await interaction.reply({content: "Question Poll Created!", ephemeral: true});
    },
};