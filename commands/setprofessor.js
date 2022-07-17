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
        const professorRole = await guild.roles.create({
            name: "Professor",
            reason: "professor role"
        });
        const studentRole = await guild.roles.create({
            name: "Student",
            reason: "student role"
        });

        guild.members.cache.forEach((member) => {
            if (!member.roles.cache.some(role => role.name === interaction.client.user.username)) {
                member.roles.add(studentRole);
            }
        });

        professor.roles
            .add(professorRole)
            .remove(studentRole);

        await interaction.reply({content: "Professor role given!", ephemeral: true});
    },
};
