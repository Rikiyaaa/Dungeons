const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const GProfile = require("../../settings/models/profile.js");
const { com_quest } = require("../../structures/getquest/com_quest.js");

module.exports = {
    name: ["quest", "get"],
    description: "Get your daily quest.",
    category: "General",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply("Loading please wait...");

        /// for test remove later

        const profiles = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        if(profiles.quest.length > 4) return msg.edit("Your can have only 4 daily quest.")

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_select")
                .setPlaceholder(`Please select your quest category`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "Quest 1",
                        description: "Shop your furniture",
                        value: "Q1"
                    },
                    {
                        label: "Quest 2",
                        description: "Shop your wallpaper",
                        value: "Q2"
                    },
                    {
                        label: "Quest 3",
                        description: "Shop your floor",
                        value: "Q3"
                    },
                ])
            ])

        const embed = new EmbedBuilder()
            .setDescription(`Please select your quest category`)
            .setColor(client.color)

        await msg.edit({ content: " ", embeds: [embed], components: [row]});

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 }); // 5 minute

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "shop_select") {
                    await menu.deferUpdate();
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "Q1") {
                        const embed = new EmbedBuilder()
                            .setDescription(`You already have this quest.`)
                            .setColor(client.color)

                        if (profiles.quest_main1 === true) 
                        return msg.edit({ embeds: [embed], components: [], files: [] })

                        com_quest(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "Q2") {
                        const embed = new EmbedBuilder()
                            .setDescription(`You already have this quest.`)
                            .setColor(client.color)

                        if (profiles.quest_main2 === true) 
                        return msg.edit({ embeds: [embed], components: [], files: [] })

                        collector.stop();
                    }  else if (directory === "Q3") {
                        const embed = new EmbedBuilder()
                            .setDescription(`You already have this quest.`)
                            .setColor(client.color)

                        if (profiles.quest_main3 === true) 
                        return msg.edit({ embeds: [embed], components: [], files: [] })

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
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}