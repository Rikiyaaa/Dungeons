const Member = require("../../settings/models/profile.js");
const Coinflip = require("../../settings/models/coinflip.js")
const { betSave, revMoney, getResult, payoutWinners, sendMsg } = require("../../structures/Coinflip.js")
const { EmbedBuilder, ApplicationCommandOptionType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle,} = require("discord.js");
const config = require("../../settings/defaults.js");
const delay = require("delay");

module.exports = { 
    name: ["slot"],
    description: "Play the slot game.",
    run: async (client, interaction) => {


        const modal = new ModalBuilder()
        .setTitle('Slot')
        .setCustomId('slot_game')
        .setComponents(
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel('ใส่จำนวนเงิน')
              .setCustomId('bet_slot')
              .setPlaceholder('10-1000000')
              .setStyle(TextInputStyle.Short)
          ),
        );
    
        // fix showModal  is not defined
        await interaction.showModal(modal, interaction);
} , error: async (client, interaction, error) => {
  const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setDescription(`An error occurred: ${error.message}`)
      .setTimestamp();

  return interaction.reply({ embeds: [embed], ephemeral: true });
},
}