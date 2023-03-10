const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { shopSword } = require("../../structures/shop/class/sword.js");
const { shopArmorHead } = require("../../structures/shop/class/armor_head.js");
const { shopArmorBody } = require("../../structures/shop/class/armor_body.js");
const { shopArmorLeg } = require("../../structures/shop/class/armor_leg.js");
const { shopArmorFoot } = require("../../structures/shop/class/armor_foot.js");
const { shopAnyomniUpgrade } = require("../../structures/shop/class/anyomni_upgrade.js");

module.exports = {
    name: ["class", "shop"], // Base Commands! // Sub Commands!
    description: "Buy shop item.",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply("Loading please wait...");

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_class_select")
                .setPlaceholder(`Please select category to see.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "1️⃣ Sword",
                        description: "Shop your Sword",
                        value: "sword"
                    },
                    {
                        label: "2️⃣ Armor Head",
                        description: "Shop your Armor Head",
                        value: "armor_head"
                    },
                    {
                        label: "3️⃣ Armor Body",
                        description: "Shop your Armor Body",
                        value: "armor_body"
                    },
                    {
                        label: "4️⃣ Armor Legs",
                        description: "Shop your Armor Legs",
                        value: "armor_legs"
                    },
                    {
                        label: "5️⃣ Armor foot",
                        description: "Shop your Armor foot",
                        value: "armor_foot"
                    },
                    {
                        label: "6️⃣ Anyomni Upgrade",
                        description: "Shop your Anyomni Upgrade",
                        value: "anyomni_upgrade"
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

        await msg.edit({ content: " ", embeds: [embed], components: [row], files: [attc] });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 }); // 5 minute

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "shop_class_select") {
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "sword") {
                        await menu.deferUpdate();
                        shopSword(client, interaction, msg);
                        collector.stop();
                    }  else if (directory === "armor_head") {
                        await menu.deferUpdate();
                        shopArmorHead(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "armor_body") {
                        await menu.deferUpdate();
                        shopArmorBody(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "armor_legs") {
                        await menu.deferUpdate();
                        shopArmorLeg(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "armor_foot") {
                        await menu.deferUpdate();
                        shopArmorFoot(client, interaction, msg);
                        collector.stop();
                    } else if (directory === "anyomni_upgrade") {
                        await menu.deferUpdate();

                        shopAnyomniUpgrade(client, interaction, msg);
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