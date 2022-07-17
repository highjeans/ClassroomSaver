const { SlashCommandBuilder } = require('@discordjs/builders');
let _ = require("underscore")

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

        const size = interaction.options.getInteger("size");

        let groups = [];
        let group = [];

        let i = 0;
        students.forEach((student) => {
            if (i === size) {
                i = 0;
                groups.push(group);
                group = [];
            }
            group.push(student);
            i += 1;
        });
        groups.push(group);

        let message = "Here are the randomized student groups: \n\n";
        console.log(groups)

        let groupNum = 1;
        for (const groupIndex in groups) {
            message += "Group " + groupNum + ": ";
            for (let i = 0; i < groups[groupIndex].length; i++){
                message += `${groups[groupIndex][i]} `;
            }
            message += "\n";
            groupNum += 1;
        }

        await interaction.channel.send(message);

        await interaction.reply({content: "Student Groups Created!", ephemeral: true});
    },
};
