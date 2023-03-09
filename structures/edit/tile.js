const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, AttachmentBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GInv = require("../../settings/models/inventory.js");
const GHouse = require("../../settings/models/house.js");
const { replaceHouse } = require("../../structures/replace.js");
const { saveTILE } = require("./confirm.js");

const editTile = async (client, interaction,  item, type, id) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const place_on = await Canvas.loadImage("./assests/default.png");
    ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place

    const check = inv.item.find(x => x.id === id);
    // already place
    if (home.TILE_DATA.TILEI === check.name) return interaction.editReply({ content: "You already place this TILE." });

    // place TILE
    home.TILE_DATA.TILE = true;
    home.TILE_DATA.TILEI = check.name;
    await home.save();
    // rebuild
    await replaceHouse(client, interaction, ctx, home)

    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${type}.png` })

    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
        await saveTILE(interaction, id,  message, check);
    });

    return;
}

module.exports = { editTile };