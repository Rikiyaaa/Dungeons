const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const GInv = require("../../settings/models/inventory.js");
const { craftcom_apples } = require("../../structures/craft_complete/craftcom.js");
const { furniture } = require("../../settings/default.js");

const craftfoods = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

        //this returns the values
        const object = Object.values(furniture);

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_select")
                .setPlaceholder(`Please select category to see.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "apple",
                        description: "Shop your furniture",
                        value: "apple"
                    },
                ])
            ])

        const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        
        const embed = new EmbedBuilder()
        .setDescription("embed select foods menu")
            .setColor(client.color)

        await msg.edit({ content: " ", embeds: [embed], components: [row], });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "shop_select") {
                    await menu.deferUpdate();
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "apple") {
                        craftcom_apples(client, interaction, msg);
                        collector.stop();
                    }
                    
                }
            }
        });

        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)

                msg.edit({ embeds: [timed], components: [], files: [] });
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

module.exports = { craftfoods };