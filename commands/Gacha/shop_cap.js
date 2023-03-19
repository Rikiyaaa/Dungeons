const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { shopCapsule } = require("../../structures/shop_capsule/capsule.js");

module.exports = {
    name: ["gachashop"], // Base Commands! // Sub Commands!
    description: "Buy shop item.",
    category: "Gacha",
    run: async (client, interaction) => {

       await interaction.reply({ content: "Loading..." });

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("capsules_shop_select")
                .setPlaceholder(`Please select category to see.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "1 Capsule",
                        description: "Shop your item.",
                        value: "capsule"
                    }
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

        await interaction.editReply({ content: " ", embeds: [embed], components: [row], files: [attc] });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 }); // 5 minute

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "capsules_shop_select") {
                    await menu.deferUpdate();
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "capsule") {
                        shopCapsule(client, interaction);
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

                interaction.editReply({ embeds: [timed], components: [], files: [] });
            }
        });
    }
}