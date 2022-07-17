const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprofessor')
        .setDescription('Gives one person the professor role and the rest of the members ' +
            'the student roles')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('The @username of the professor on discord')
                .setRequired(true)),
    async execute(interaction) {
        const guild = interaction.guild;
        const professor = interaction.options.getMember("username");
        const professorRole = guild.roles.cache.filter(role => role.name === "Professor");
        const studentRole = guild.roles.cache.filter(role => role.name === "Student");

        professor.roles.add(professorRole);
        professor.roles.remove(studentRole);

        await interaction.reply({content: "Professor role given!", ephemeral: true});
    },
};
