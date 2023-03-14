const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const cprofile = require("../../settings/models/cradprofile");
const GProfile = require("../../settings/models/profile");
const { selectGreen_forest_plains } = require("./selectMap/selectGreen_forest_plains.js");
const { selectGreen_forest_plateau } = require("./selectMap/selectGreen_forest_plateau.js");
const { selectGreen_forest_waterfall } = require("./selectMap/selectGreen_forest_waterfall.js");
const { selectGreen_forest_depths } = require("./selectMap/selectGreen_forest_depths.js");

const SearchMap = async (client, interaction) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const pet = await cprofile.findOne({ id: interaction.user.id });
    const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const go_world = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("select_go_world_id")
                .setPlaceholder(`Select world to see.`) 
                .setMinValues(1)
                .setMaxValues(1)
                .setOptions([
                    {
                        label: "Green Forest Plains",
                        description: "Go to Green Forest Plains",
                        emoji: "<:Plains_29:1083980153887137832>",
                        value: "go_green_forest_plains"
                    },
                    {
                        label: "Green Forest Plateau",
                        description: "Go to Green Forest Plateau",
                        emoji: "<:Plateau_29:1083980283415638036>",
                        value: "go_green_forest_plateau"
                    },
                    {
                        label: "Green Forest Waterfall",
                        description: "Go to Green Forest Waterfall",
                        emoji: "<:Waterfall_29:1083980159301980260>",
                        value: "go_green_forest_waterfall"
                    },
                    {
                        label: "Green Forest Depths",
                        description: "Go to Green Forest Depths",
                        emoji: "<:Depths_29:1083980157401960498>",
                        value: "go_green_forest_depths"
                    },
                ]),
            ])

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext("2d");

    const shop = await Canvas.loadImage("./assests/shop/two.png");
    ctx.drawImage(shop, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `two.png` })

    const embed = new EmbedBuilder()
        .setImage("attachment://two.png")
        .setColor(client.color)

    await interaction.followUp({ content: "", embeds: [embed], components: [go_world], files: [attc] , ephemeral: true  });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
         if (menu.isSelectMenu()) {
            if(menu.customId === "select_go_world_id") {
                if(menu.values[0] === "go_green_forest_plains") {
                    await menu.deferUpdate();

                    if(profile.location === "ที่ราบป่าสีเขียว") {
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณอยู่ที่ ${profile.location} อยู่แล้ว`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    } 

                    selectGreen_forest_plains(client, interaction);
                } else if(menu.values[0] === "go_green_forest_plateau") {
                    await menu.deferUpdate();

                    if(profile.location === "ที่ราบสูงป่าสีเขียว") {
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณอยู่ที่ ${profile.location} อยู่แล้ว`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    } 

                    if(pet.level < 20) { 
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณต้องอัพเลเวลเพื่อเข้าไปใน ${menu.values[0]} อีก ${20 - pet.level} อีกครั้ง`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    }

                    selectGreen_forest_plateau(client, interaction);
                } else if(menu.values[0] === "go_green_forest_waterfall") {
                    await menu.deferUpdate();
                    

                    if(profile.location === "น้ำตกป่าสีเขียว") {
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณอยู่ที่ ${profile.location} อยู่แล้ว`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    } 

                    if(pet.level < 40) { 
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณต้องอัพเลเวลเพื่อเข้าไปใน ${menu.values[0]} อีก ${40 - pet.level} อีกครั้ง`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    }

                    selectGreen_forest_waterfall(client, interaction);
                } else if(menu.values[0] === "go_green_forest_depths") {
                    await menu.deferUpdate();

                    if(profile.location === "ป่าลึกสีเขียว") {
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณอยู่ที่ ${profile.location} อยู่แล้ว`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    } 

                    if(pet.level < 60) { 
                        const embed = new EmbedBuilder()
                            .setDescription(`คุณต้องอัพเลเวลเพื่อเข้าไปใน ${menu.values[0]} อีก ${60 - pet.level} อีกครั้ง`)
                            .setColor(client.color)

                        return interaction.followUp({ embeds: [embed], components: [], files: [] , ephemeral: true });
                    }

                    selectGreen_forest_depths(client, interaction);
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

    return;

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

module.exports = { SearchMap };