const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const { fruit_feed } = require("../../structures/feed/fruits.js");

module.exports = {
    name: ["profile", "feed"], //fixing
    description: "Feed ",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply("Loading please wait...");

        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("*Please Select a Food*")
    
        const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("petselect")
                    .setPlaceholder("Select a pet to feed.")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                        {
                            label: "fruit",
                            description: "Shop your furniture",
                            value: "fruit"
                        },
                        {
                            label: "fish",
                            description: "Shop your wallpaper",
                            value: "fish"
                        },
                    ])
                    
                ])
    
        await msg.edit({ content: " ", embeds: [embed], components: [select] });
    
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                // id select menus
                if(menu.customId === "petselect") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    if (directory === "fruit") {
                        fruit_feed(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "fish") {

                        //
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
    
                msg.edit({ embeds: [timed], components: [] });
            }
        });
    }
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}