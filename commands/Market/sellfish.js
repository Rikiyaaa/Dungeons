const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, SelectMenuOptionBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const FishInv = require("../../settings/models/fishinventory.js");
const Member = require("../../settings/models/profile.js");
const Market = require("../../settings/models/market.js");

module.exports = {
    name: ["fish", "sell"], // Base Commands! // Sub Commands!
    description: "Sell your fish.",
    category: "Work",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const loading = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("Loading please wait...")

        const msg = await interaction.editReply({ embeds: [loading] });

        const inv = await FishInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const market = await Market.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const value = Object.values(inv.item);
    const object = value.filter(x => x.type === "fish");

    if(object.length === 0) {
        return msg.edit({ content: "You don't have any fish.", embeds: [], files: [], components: [] });
    }

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("*Please Select a fishs*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furselect")
                .setPlaceholder("Select a fishs to sell.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(object.map(key => {
                    return new SelectMenuOptionBuilder()
                        .setLabel(`${toOppositeCase(key.name)}`)
                        .setValue(key.id)
                    }
                ))
            ])

    await msg.edit({ embeds: [embed], components: [select], files: [] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });
    const wait = require('node:timers/promises').setTimeout;

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furselect") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = inv.item.find(x => x.id === directory);

                // remove item

                if (item.name === "Catfish") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[0].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Catfish for ${market.market[0].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Salmon") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[1].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Salmon for ${market.market[1].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Cod") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[2].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Cod for ${market.market[2].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Pufferfish") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[3].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Pufferfish for ${market.market[3].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Squid") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[4].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Squid for ${market.market[4].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Dolphin") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[5].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Dolphin for ${market.market[5].price} coins.`)

                    await menu.editReply({ embeds: [embed], components: [] });
                } 

                // sell item random price
              //  const sell = Math.floor(Math.random() * (item.price - 1) + 1);
                await collector.stop();
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

   return;
}
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}