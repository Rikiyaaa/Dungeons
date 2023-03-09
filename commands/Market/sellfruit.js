const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, SelectMenuOptionBuilder, StringSelectMenuBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GInv = require("../../settings/models/inventory.js");
const Member = require("../../settings/models/profile.js");
const Market = require("../../settings/models/market.js");

module.exports = {
    name: ["fruit", "sell"], // Base Commands! // Sub Commands!
    description: "Sell your fruit.",
    category: "Work",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const loading = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("Loading please wait...")

        const msg = await interaction.editReply({ embeds: [loading] });

        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const market = await Market.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const value = Object.values(inv.item);
    const object = value.filter(x => x.type === "fruit");

    if(object.length === 0) {
        return msg.edit({ content: "You don't have any fruit.", embeds: [], files: [], components: [] });
    }

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("*Please Select a fishs*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furselect")
                .setPlaceholder("Select a fruit to sell.")
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

                if (item.name === "Cherry") {

                    inv.item.splice(inv.item.indexOf(item), 1);
                    profile.money += market.market[0].price;


                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Cherry for ${market.market[6].price} coins.`)

                        profile.save();
                        inv.save();

                    await wait(2000);
                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Watermelon") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[1].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Watermelon for ${market.market[7].price} coins.`)

                        await wait(2000);
                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Lemon") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[2].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Lemon for ${market.market[8].price} coins.`)
                        await wait(2000);
                    await menu.editReply({ embeds: [embed], components: [] });
                } else if (item.name === "Grape") {
                    inv.item.splice(inv.item.indexOf(item), 1);
                    inv.save();

                    profile.money += market.market[3].price;
                    profile.save();

                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`You sold a Grape for ${market.market[9].price} coins.`)
                        await wait(2000);
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