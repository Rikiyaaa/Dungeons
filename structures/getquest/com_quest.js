const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder , ButtonStyle, ButtonBuilder} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const cradprofile = require("../../settings/models/cradprofile.js");
const GInv = require("../../settings/models/inventory.js");

const com_quest = async (client, interaction, msg) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    profile.quest_main2 = true;
    profile.quest_main3 = true;
    await profile.save();

    // crate row button
    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("com")
            .setLabel("Complete")
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("can")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Secondary)
        )

    const result = [...inv.item.reduce( (mp, o) => {
        const key = JSON.stringify([o.name, o.type]);
        if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
        mp.get(key).count++;
        return mp;
    }, new Map).values()];

    // Search for item names If so, count according to the number available, if not, count as 0. 
    const fruit_item = result.find((x) => x.name === "Lemon" && x.type === "fruit");

    if(!fruit_item || fruit_item.count < 5) {
        button.components[0].setDisabled(true)
        }

    // Search for item names count 
    const item_count = fruit_item ? fruit_item.count : 0;


    const embed = new EmbedBuilder()
    .setTitle("Quest")
    .setDescription(`Complete this quest to get reward! ${item_count}/5 Lemon`)
    await msg.edit({ content: " ", embeds: [embed], components: [button]});


    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "com") {
                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                const result = [...inv.item.reduce( (mp, o) => {
                    const key = JSON.stringify([o.name, o.type]);
                    if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
                    mp.get(key).count++;
                    return mp;
                }, new Map).values()];
            
                // Search for item names If so, count according to the number available, if not, count as 0. 
                const fruit_item = result.find((x) => x.name === "Lemon" && x.type === "fruit");
            
                for (let i = 0; i < result.length; i++) {
                result[i].count = fruit_item ? fruit_item.count : 0;

                if(result[i].count >= 5) {

                    // Remove 1 Lemon
                    await GInv.findOneAndUpdate({ guild: interaction.guild.id, user: interaction.user.id }, 
                        { $pull: { item: { name: "Lemon", type: "fruit" } } }, { new: true });

                    // add 1000 coins
                    await GProfile.findOneAndUpdate({ guild: interaction.guild.id, user: interaction.user.id },
                        { $inc: { coins: 1000 } }, { new: true });

                    // add 1000 exp
                    await cradprofile.findOneAndUpdate({ guild: interaction.guild.id, user: interaction.user.id },
                        { $inc: { exp: 15 } }, { new: true });

                        if(cradprofile.exp >= cradprofile.nextexp) {
                            let diff = cradprofile.exp - cradprofile.nextexp;
        
                            cradprofile.level += 1;
                            cradprofile.nextexp = Math.floor(cradprofile.level * cradprofile.level * 1.5);
                            cradprofile.exp = diff;

                            const embed_levelup = new EmbedBuilder()
                            .setDescription(`Level Up! ${cradprofile.level}`)
                            .setColor(client.color)

                            await interaction.channel.send({ embeds: [embed_levelup] });
        
                            await cradprofile.save();
                        }

                    const embed = new EmbedBuilder()
                    .setDescription(`completed!`)
                    .setColor(client.color)
                    msg.edit({ embeds: [embed], components: [], files: [] });

                    profile.quest_main2 = false;
                    profile.quest_main3 = false;
                    await profile.save();
                } 
                collector.stop();
            } 
            } else if(menu.customId === "can") {
                const embed = new EmbedBuilder()
                .setDescription(`ออก!`)
                .setColor(client.color)
                msg.edit({ embeds: [embed], components: [], files: [] });

                collector.stop();
            }
        } 
    } 
);

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

module.exports = { com_quest };