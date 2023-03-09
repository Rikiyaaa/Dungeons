const { ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder,} = require("discord.js");


module.exports = {
    name: ["topup"],
    description: "Topup to get money",
    category: "General",
    run: async (client, interaction) => { 

      const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("topup_button")
                .setLabel("เติมเงิน")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("wall_right")
                .setLabel("ดูของที่จะได้รับ")
                .setStyle(ButtonStyle.Secondary),
            )

      const embed = new EmbedBuilder()
          .setImage("attachment://select.png")
          .setDescription(`**Select Menu**\n\nPlease select category to see.`)
          .setColor(client.color)

          

      await interaction.reply({ content: " ", embeds: [embed], components: [button], ephemeral: true });
    }
}

