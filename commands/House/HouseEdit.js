const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { selectFurniture } = require("../../structures/select/furniture.js");
const { selectFloor } = require("../../structures/select/floor.js");
const { selectTile } = require("../../structures/select/tile.js");
const Canvas = require("@napi-rs/canvas");
const GHome = require("../../settings/models/house.js");
const { selectWallSide } = require("../../structures/select/wallpaper.js");
const { selectWallSide2 } = require("../../structures/select/wallpaper2.js");
const delay = require("delay");
// create pendingEditHouseCommands 
const pendingEditHouseCommands = {};

module.exports = {
    name: ["house", "edit"],
    description: "Editor of your house.",
    category: "House",
    run: async (client, interaction) => {

        await interaction.reply({ content: "Loading..." })

        // ถ้าใน pendingEditHouseCommands มีคนที่เรียกใช้คำสั่งนี้อยู่แล้ว ให้ส่งข้อความแจ้งเตือนและ return
        if (pendingEditHouseCommands[interaction.user.id]) {
            await interaction.editReply({ content: "You are already editing your house. Please wait until you finish editing your house." })
            return;
        }


        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext("2d");

        const home = await GHome.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const homeedit = await Canvas.loadImage("./assests/modify.png");
        ctx.drawImage(homeedit, 0, 0, canvas.width, canvas.height);
        const homeatt = new AttachmentBuilder(await canvas.encode("png"), { name: "modify.png" })

        const embed = new EmbedBuilder()
            .setDescription(`Edit House: ${interaction.user}`)
            .addFields(
                {
                    name: "1️⃣ Furniture", value: "Replace or remove furniture in this room."
                },
                {
                    name: "2️⃣ Wallpaper", value: "Replace or remove your wallpaper in this room."      
                },
                {
                    name: "3️⃣ Tile", value: "Replace or remove your tile in this room."
                },
                {
                    name: "4️⃣ Flooring", value: "Replace or remove you flooring in this room."
                },
                {
                    name: '5️⃣ Reset House', value: 'Reset your house to default.'
                }
            )
            .setImage("attachment://modify.png")
            .setColor(client.color)

        const select = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("house")
                    .setPlaceholder("Make a selection")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                        {
                            label: "1️⃣ Furniture",
                            description: "Edit your furniture",
                            value: "wall2"
                        },
                        {
                            label: "2️⃣ Wallpaper",
                            description: "Edit your wallpaper",
                            value: "wall"
                        },
                        {
                            label: "3️⃣ Tile",
                            description: "Edit your tile",
                            value: "tile"
                        },
                        {
                            label: "4️⃣ Flooring",
                            description: "Edit your floor",
                            value: "floor"
                        },
                        {
                            label: "5️⃣ Reset House",
                            description: "Reset your house to default",
                            value: "reset"
                        }
                    ]),
                )
            await interaction.editReply({ content: " ", embeds: [embed], components: [select], files: [homeatt], ephemeral: true });

            let filter = (m) => m.user.id === interaction.user.id;
            let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

            collector.on('collect', async (menu) => {
                if(menu.isStringSelectMenu()) {
                    // id select menus
                    if(menu.customId === "house") {
                        await menu.deferUpdate();
                        /// value id
                        let [directory] = menu.values;

                        if (directory === "wall2") {
                            // Run callback furniture
                            // add user to pendingEditHouseCommands 
                            selectWallSide2(client, interaction, pendingEditHouseCommands );
                            collector.stop();
                        } else if (directory === "wall") {
                            // Run callback wallpaper
                            selectWallSide(client, interaction, pendingEditHouseCommands );
                            collector.stop();
                        }  else if (directory === "tile") {
                            // Run callback floor
                            selectTile(client, interaction, pendingEditHouseCommands );
                            collector.stop();
                        } else if (directory === "floor") {
                            // Run callback floor
                            selectFloor(client, interaction, pendingEditHouseCommands );
                            collector.stop();
                        } else if (directory === "reset") {
                            const home = await GHome.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                            home.delete();
                            await interaction.editReply({ content: "Your house is deleted.", embeds: [], components: [], files: [] , ephemeral: true  });
                        }
                    }
                } else if(menu.isButton()) {
                    ////
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
    }
}
