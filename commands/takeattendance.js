const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('takeattendance')
        .setDescription('Takes Attendance for professors by counting which students are online'),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Professor')) {
            await interaction.reply({content: "Only Professors can take attendance.", ephemeral: true});
            return;
        }

        await interaction.guild.members.fetch();

        const students = interaction.guild.roles.cache.find(role => role.name === "Student").members;

        const absentStudents = students.filter(member => member.presence === null || member.presence.status === "offline");

        for (const student of absentStudents) {
            console.log(student);
            student[1].createDM().then(dm => dm.send(`Class in ${interaction.guild.name} has started. Please show up ASAP.`));
        }

        await interaction.reply({content: "Absent students have been notified of class!", ephemeral: true});
    },
};
