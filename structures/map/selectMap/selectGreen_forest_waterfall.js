const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder , ButtonStyle, ButtonBuilder} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../../settings/models/profile.js");
const cradprofile = require("../../../settings/models/cradprofile.js");
const delay = require("delay");

const selectGreen_forest_waterfall = async (client, interaction, msg ) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');
    const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    // crate row button
    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("com_green_forest_waterfall")
            .setLabel("Complete")
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("can_green_forest_waterfall")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary)
        )

        const back_maploc_waterfall_main_id_b = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder() 
            .setCustomId("back_maploc_main_id_waterfall")
            .setLabel("Back")   
            .setStyle(ButtonStyle.Primary),
        )



    const embed = new EmbedBuilder()
    .setDescription(`Are you sure you want to complete this quest?`)
    .setColor(client.color)

    await interaction.followUp({ embeds: [embed], components: [button], files: [], ephemeral: true });



    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            if(menu.customId === "com_green_forest_waterfall") {
                await menu.deferUpdate();
                const Loading = new EmbedBuilder()
                .setDescription(`กำลังพาคุณไป`)
                .setColor(client.color)

                await menu.editReply({ embeds: [Loading], components: [], files: [] });
                //delay 5 sec 

                await delay(5000);
                    const embed = new EmbedBuilder()
                    .setDescription(`คุณได้เข้าสู่ **Green Forest waterfall**`)
                    .setColor(client.color)

                    profile.location = "ที่ราบสีเขียว";
                    profile.save();

                    await menu.editReply({ embeds: [embed], components: [back_maploc_waterfall_main_id_b], files: [] });
            
            } else if(menu.customId === "can_green_forest_waterfall") {
                await menu.deferUpdate();
                await menu.deleteReply();
            } else if(menu.customId === "back_maploc_main_id_waterfall") {
                await menu.deferUpdate();
                await menu.deleteReply();
            } 
        } 
    } 
);

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [], files: [] });
        }
    });
}

function Commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
};

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};

module.exports = { selectGreen_forest_waterfall };