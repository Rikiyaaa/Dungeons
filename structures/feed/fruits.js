const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const GInv = require("../../settings/models/inventory.js");
const CProfile = require("../../settings/models/cradprofile.js");


const fruit_feed = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        //this returns the values
        const value = Object.values(inv.item);
        const object = value.filter(x => x.type === "fruit");
        // if not have food return msg
        if(object.length === 0) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("You don't have any fruit.")

            return msg.edit({ content: " ", embeds: [embed], components: [] });
        }

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("*Please Select a fruit*")
    
        const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("petselect")
                    .setPlaceholder("Select a fruit to feed.")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions(object.map(key => {
                        return new SelectMenuOptionBuilder()
                            .setLabel(`${toOppositeCase(key.name)}`)
                            .setValue(key.id)
                        }
                    ))
                ])
    
        await msg.edit({ content: " ", embeds: [embed], components: [select] });
    
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                // id select menus
                if(menu.customId === "petselect") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = inv.item.find(x => x.id === directory);
    
                    //pet 
                    const mypet = await CProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id, });
    
                    //
                    mypet.exp += item.exp;
                    mypet.hungry += item.feed;
                    await mypet.save();
    
                    if (mypet.hungry > 100) mypet.hungry = 100;
                    if (mypet.energy > 100) mypet.energy = 100;
                    await mypet.save();
    
                  //  await client.questFeed(interaction);
    
                    // if exp exceed nextexp = levelup
                    if(mypet.exp >= mypet.nextexp) {
                        let diff = mypet.exp - mypet.nextexp;
    
                        mypet.level += 1;
                        mypet.nextexp = Math.floor(mypet.level * mypet.level * 1.5);
                        mypet.exp = diff;
    
                        await mypet.save();
                    }
    
                    inv.item.splice(inv.item.findIndex(x => x.id === directory), 1);
                    await inv.save();
    
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                        .setDescription(`**${mypet.name}** *is now level* **${mypet.level}** *and has* **${mypet.nextexp - mypet.exp}** *exp to next level.*`)
                        .setFooter({ text: `Hungry: ${mypet.hungry}/100` })
                        .setTimestamp()
    
                    msg.edit({ content: " ", embeds: [embed], components: [] });
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
    }

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

module.exports = { fruit_feed };