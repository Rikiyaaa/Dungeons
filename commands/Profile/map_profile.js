const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonStyle,ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { SearchMap } = require("../../structures/map/SearchMap.js");

module.exports = {
    name: ["map", "location"], // Base Commands! // Sub Commands!
    description: "Change your location",
    category: "Profile",
    run: async (client, interaction) => {

        await interaction.reply({ content: "Loading...", ephemeral: true });

        const world = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("select_world_id")
                .setPlaceholder(`คุณอยากดูข้อมูลบริเวณไหน ?`) 
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "บริเวณที่คุณอยู่",
                        description: "ดูบริเวณที่คุณอยู่ตอนนี้",
                        emoji: "<:Witch28lo13123wexport:1084350353551654962>",
                        value: "home_page"
                    },
                    {
                        label: "ที่ราบป่าสีเขียว",
                        description: "Go to Green Forest Plains",
                        emoji: "<:Plains_29:1083980153887137832>",
                        value: "green_forest_plains"
                    },
                    {
                        label: "ที่ราบสูงป่าสีเขียว",
                        description: "Go to Green Forest Plateau",
                        emoji: "<:Plateau_29:1083980283415638036>",
                        value: "green_forest_plateau"
                    },
                    {
                        label: "น้ำตกป่าสีเขียว",
                        description: "Go to Green Forest Waterfall",
                        emoji: "<:Waterfall_29:1083980159301980260>",
                        value: "green_forest_waterfall"
                    },
                    {
                        label: "ป่าลึกสีเขียว",
                        description: "Go to Green Forest Depths",
                        emoji: "<:Depths_29:1083980157401960498>",
                        value: "green_forest_depths"
                    },
            ]),
        ])

        const map = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("map_id")
                .setLabel("Map")
                .setStyle(ButtonStyle.Primary),
            )
        const embed = new EmbedBuilder()
            .setDescription(`You are in **home_page**`)
            .setColor(client.color)

    
        await interaction.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
    
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
                if(menu.customId === "map_id") {
                    await menu.deferUpdate();

                    SearchMap(client, interaction );
                }  
            } else if (menu.isSelectMenu()) {
                if(menu.customId === "select_world_id") {
                    if(menu.values[0] === "home_page") {
                        await menu.deferUpdate();
                        const embed = new EmbedBuilder()
                        .setDescription(`You are in **${menu.values[0]}**`)

                        .setColor(client.color)
    
                        await menu.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
                    } else if(menu.values[0] === "green_forest_plains") {
                        await menu.deferUpdate();
                        const embed = new EmbedBuilder()
                        .setDescription(`You are in **${menu.values[0]}**`)
                        .setImage("https://cdn.discordapp.com/attachments/1071294052630270023/1084353438730682378/green_forest_plains.png")
                        .setColor(client.color)
    
                        await menu.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
                    } else if(menu.values[0] === "green_forest_plateau") {
                        await menu.deferUpdate();
                        const embed = new EmbedBuilder()
                        .setDescription(`You are in **${menu.values[0]}**`)
                        .setImage("https://cdn.discordapp.com/attachments/1071294052630270023/1084353439020109855/green_forest_plateau.png")
                        .setColor(client.color)
    
                        await menu.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
                    } else if(menu.values[0] === "green_forest_waterfall") {
                        await menu.deferUpdate();
                        const embed = new EmbedBuilder()
                        .setDescription(`You are in **${menu.values[0]}**`)
                        .setImage("https://cdn.discordapp.com/attachments/1071294052630270023/1084353438202220624/green_forest_waterfall.png")
                        .setColor(client.color)
    
                        await menu.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
                    } else if(menu.values[0] === "green_forest_depths") {
                        await menu.deferUpdate();
                        const embed = new EmbedBuilder()
                        .setDescription(`You are in **${menu.values[0]}**`)
                        .setImage("https://cdn.discordapp.com/attachments/1071294052630270023/1084353438491615332/green_forest_depths.png")
                        .setColor(client.color)
    
                        await menu.editReply({ content: "", embeds: [embed], components: [world, map], files: [] , ephemeral: true  });
                    }
                }
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)
    
                interaction.editReply({ embeds: [timed], components: [], files: [] , ephemeral: true });
            }
        });
    }
}