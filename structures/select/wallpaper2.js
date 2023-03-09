const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { editFurnitureAR, editFurnitureAL } = require("../edit/wallpaper4.js")
const GInv = require("../../settings/models/inventory.js");
const HInv = require("../../settings/models/houseinv.js");
const Canvas = require("@napi-rs/canvas");

const selectWallSide2 = async function (client, interaction,  item , type) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("wall_left_e")
            .setLabel("Left")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("wall_right_e")
            .setLabel("Right")
            .setStyle(ButtonStyle.Secondary),
        )

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext("2d");

    const shop = await Canvas.loadImage("./assests/shop/two.png");
    ctx.drawImage(shop, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `two.png` })

    const embed = new EmbedBuilder()
        .setImage("attachment://two.png")
        .setColor(client.color)

    await interaction.editReply({ content: "Please Select Side furniture To Place.", embeds: [embed], components: [button], files: [attc] , ephemeral: true  });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if (menu.isButton()) {
            await menu.deferUpdate();

            if(menu.customId === "wall_left_e") {

            await selectWallpaper_left2(client, interaction,  item)
            collector.stop();
            } else if (menu.customId === "wall_right_e") {

            await selectWallpaper_right2(client, interaction,  item)
            collector.stop();
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

const selectWallpaper_left2 = async (client, interaction, ) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const value = Object.values(hinv.furniture_left);
    const object = value.filter(x => x.type === "furniture");

    if(object.length === 0) {
        return interaction.editReply({ content: "You don't have any furniture.", embeds: [], files: [], components: [] , ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("*Please Select a furniture*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("wallselect_left")
                .setPlaceholder("Select a furniture to placing.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(object.map(key => {
                    return new SelectMenuOptionBuilder()
                        .setLabel(`${toOppositeCase(key.name)}`)
                        .setValue(key.id)
                    }
                ))
            ])

    await interaction.editReply({ content: " ", embeds: [embed], components: [select], files: [], ephemeral: true  });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "wallselect_left") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = hinv.furniture_left.find(x => x.id === directory);

                editFurnitureAL(client, interaction,  item.name, item.type, item.id, item.side);
                await collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const selectWallpaper_right2 = async (client, interaction, ) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const value = Object.values(hinv.furniture_right);
    const object = value.filter(x => x.type === "furniture");

    if(object.length === 0) {
        return interaction.editReply({ content: "You don't have any furniture.", embeds: [], files: [], components: [] , ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("*Please Select a furniture*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("wallselect_right")
                .setPlaceholder("Select a furniture to placing.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(object.map(key => {
                    return new SelectMenuOptionBuilder()
                        .setLabel(`${toOppositeCase(key.name)}`)
                        .setValue(key.id)
                    }
                ))
            ])

    await interaction.editReply({ content: " ", embeds: [embed], components: [select], files: [] , ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "wallselect_right") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = hinv.furniture_right.find(x => x.id === directory);

                editFurnitureAR(client, interaction,  item.name, item.type, item.id, item.side);
                await collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] , ephemeral: true });
        }
    });

   return;
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

module.exports = { selectWallpaper_left2, selectWallSide2, selectWallpaper_right2 };