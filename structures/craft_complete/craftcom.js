const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder , ButtonStyle, ButtonBuilder} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const GInv = require("../../settings/models/inventory.js");

const craftcom_apples = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const result = [...inv.item.reduce( (mp, o) => {
        const key = JSON.stringify([o.name, o.type]);
        if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
        mp.get(key).count++;
        return mp;
    }, new Map).values()];

    const itemA = result.find((x) => x.name === "Lemon");
    const itemB = result.find((x) => x.name === "Watermelon");
    
    let canCraft = false;
    let craftedCount = 0;
    if (itemA && itemA.count >= 2 && itemB && itemB.count >= 2) {
      canCraft = true;
      craftedCount = Math.min(Math.floor(itemA.count / 2), Math.floor(itemB.count / 2));
    }

    const button = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setCustomId("craft_apples")
        .setLabel("Craft")
        .setStyle(ButtonStyle.Secondary),
        )

   const craftall1 = result.find((x) => x.name === "Lemon" && x.count >= 2 );
   const craftall2 = result.find((x) => x.name === "Watermelon" && x.count >= 2 );

    if(craftall1 && craftall2) {
        button.components[0].setDisabled(false)
    } else {
        button.components[0].setDisabled(true)
    }

    const embed = new EmbedBuilder()
.setDescription(`Hi`)

    await msg.edit({ embeds: [embed], components: [button] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "craft_apples") {
                const craft = result.find((x) => x.name === "Lemon" && x.count >= 2 );
                const craft2 = result.find((x) => x.name === "Watermelon" && x.count >= 2 );

                if(craft && craft2) {

                    // Remove 2 Lemon
                    const item1 = inv.item.find(x => x.name === "Lemon");

                    inv.item.splice(inv.item.indexOf(item1), 1);
                    inv.item.splice(inv.item.indexOf(item1), 1);

                    // Remove 2 Watermelon
                    const item2 = inv.item.find(x => x.name === "Watermelon");
                    inv.item.splice(inv.item.indexOf(item2), 1);
                    inv.item.splice(inv.item.indexOf(item2), 1);

                    // Add 1 Cherry

                    const item_get = fruits.find(x => x.name === "Cherry");

                    inv.item.push({
                        name: item_get.name,
                        type: item_get.type,
                        price: item_get.price,
                        level: item_get.level,
                        emoji: item_get.emoji,
                        id: generateID()
                    });

                    await inv.save();

                    const craft1 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`completed!`)
                    await menu.followUp({ embeds: [craft1], ephemeral: true, })

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

module.exports = { craftcom_apples };