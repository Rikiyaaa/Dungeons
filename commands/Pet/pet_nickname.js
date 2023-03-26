const { EmbedBuilder, ActionRowBuilder,  ButtonBuilder, ButtonStyle ,ApplicationCommandOptionType } = require("discord.js");
const GPet = require("../../settings/models/pet.js");
module.exports = {
    name: ["pet", "nickname"],
    description: "change your pet nickname",
    category: "Pet",
    options: [
        {
            name: "nickname",
            description: "Change your pet nickname.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {

        await interaction.reply({ content: "Loading please wait...", ephemeral: true });

        const pet = await GPet.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        if(!pet) return interaction.editReply("You don't have a pet yet.");

        const nickname = interaction.options.getString("nickname");

        // create button 
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("confirm_nickname")
                .setLabel("Confirm")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel_nickname")
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger),
            )

        const embed = new EmbedBuilder()
        .setDescription(`Are you sure you want to change your pet nickname to ${nickname}?`)
        .setColor(client.color)

        await interaction.editReply({ content: " ", embeds: [embed], components: [button], ephemeral: true });
        
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
                await menu.deferUpdate();
    
                if(menu.customId === "confirm_nickname") {

                    pet.nickname = nickname;
    
                    const change_s = new EmbedBuilder()
                    .setDescription(`Nickname has been changed to ${nickname}`)
                    .setColor(client.color)
    
                await interaction.editReply({ embeds: [change_s], components: [], files: [] , ephemeral: true });
                await pet.save();
                collector.stop();
                } else if (menu.customId === "cancel_nickname") {
    
                    const change_f = new EmbedBuilder()
                    .setDescription(`Canceled!`)
                    .setColor(client.color)
    
                await interaction.editReply({ embeds: [change_f], components: [], files: [] , ephemeral: true });
                await delay(3000);
                await interaction.deleteReply();
                collector.stop();
                }
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)
    
                await interaction.editReply({ embeds: [timed], components: [], files: [] , ephemeral: true });
                await delay(3000);
                await interaction.deleteReply();
            }
        });

    }
}
