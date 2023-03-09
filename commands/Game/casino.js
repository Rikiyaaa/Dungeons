const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, StringSelectMenuBuilder,TextInputStyle, TextInputBuilder, ModalBuilder} = require("discord.js");
const delay = require("delay");

module.exports = { 
    name: ["เสือมังกร"],
    description: "Play the casino game.",
    run: async (client, interaction) => {

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const modal = new ModalBuilder()
        .setTitle('เสือมังกร')
        .setCustomId('dragon_tiger')
        .setComponents(
          new ActionRowBuilder().setComponents(
            new TextInputBuilder()
              .setLabel('ใส่จำนวนเงิน')
              .setCustomId('bet_amount')
              .setPlaceholder('10-1000000')
              .setStyle(TextInputStyle.Short)
          ),
        );
    
        // fix showModal  is not defined
        await interaction.showModal(modal, interaction);

    }, error: async (client, interaction, error) => {
        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`An error occurred: ${error.message}`)
            .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
}
    

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}