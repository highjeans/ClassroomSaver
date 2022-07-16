const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprofessor')
        .setDescription('Gives one person the professor role and the rest of the members ' +
            'the student roles')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The @username of the professor on discord')
                .setRequired(true)),
    async execute(interaction) {
        const guild = interaction.guild;
        const professorRole = await guild.roles.create({
            name: "Professor",
            reason: "professor role"
        });
        const studentRole = await guild.roles.create({
            name: "Student",
            reason: "student role"
        });

        guild.members.cache.forEach((member) => {
            if (interaction.options.getString("username").includes(member.id)) {
                member.roles.add(professorRole);
            }
            else {
                member.roles.add(studentRole);
            }
        });

        await interaction.reply({content: "Professor role given!", ephemeral: true});
    },
};
