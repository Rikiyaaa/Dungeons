const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { craftfoods } = require("../../structures/craft/foods.js");
const { shopWallpaper, selectSide } = require("../../structures/shop/wallpaper.js");
const { shopWallpaper2, selectSide2 } = require("../../structures/shop/wallpaper2.js");
const { shopFloor } = require("../../structures/shop/floor.js");
const { shopFood } = require("../../structures/shop/food.js");

module.exports = {
    name: ["craft"], // Base Commands! // Sub Commands!
    description: "Buy shop item.",
    category: "House",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply("Loading please wait...");

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
                        label: "foods",
                        description: "Shop your furniture",
                        value: "fur"
                    },
                    {
                        label: "tools",
                        description: "Shop your wallpaper",
                        value: "wall"
                    },
                    {
                        label: "other",
                        description: "Shop your floor",
                        value: "floor"
                    },
                ])
            ])

        const canvas = Canvas.createCanvas(450, 300);
        const ctx = canvas.getContext("2d");

        const shop = await Canvas.loadImage("./assests/shop/select.png");
        ctx.drawImage(shop, 0, 0, canvas.width, canvas.height);

        const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `select.png` })

        const embed = new EmbedBuilder()
            .setImage("attachment://select.png")
            .setColor(client.color)

        await msg.edit({ content: " ", embeds: [embed], components: [row], files: [attc] });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 }); // 5 minute

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "shop_select") {
                    await menu.deferUpdate();
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "fur") {
                        craftfoods(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "wall") {
                        selectSide(client, interaction, msg);
                        collector.stop();
                    
                    } else if (directory === "floor") {
                        shopFloor(client, interaction, msg);
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