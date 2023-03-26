const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const Member = require("../../settings/models/profile.js");

module.exports = {
    name: ["flower"], //fixing
    description: "ให้ดอกไม้กิดกอน ",
    category: "Profile",
    run: async (client, interaction) => {

        await interaction.reply({ content: "กำลังโหลดข้อมูล..."})

        const loading = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
      const msg = await interaction.editReply({ embeds: [loading] });

    

        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (user.flower > 2000) {
            return interaction.editReply({ content: "ไม่สามารถให้ได้ เนื่องจากค่าความสัมพันธ์ตันเเล้ว", embeds: [], components: [] });
        }

        //this returns the values
        const value = Object.values(inv.item);
        const object = value.filter(x => x.type === "flower");
        // if not have food return msg
        if(object.length === 0) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("คุณไม่มีดอกไม้ในกระเป๋า")

            return interaction.editReply({ content: " ", embeds: [embed], components: [] });
        }

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("*เลือกดอกไม้ที่จะให้กิดกอน*")
    
        const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("flower_bot")
                    .setPlaceholder("เลือกดอกไม้ที่จะให้กิดกอน")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions(object.map(key => {
                        return new SelectMenuOptionBuilder()
                            .setLabel(`${toOppositeCase(key.name)}`)
                            .setValue(key.id)
                        }
                    ))
                ])
    
        await interaction.editReply({ content: " ", embeds: [embed], components: [select] });
    
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                // id select menus
                if(menu.customId === "flower_bot") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = inv.item.find(x => x.id === directory);

                    user.flower += item.flower;
                    if (user.flower >= 100) {
                        user.relationship = "คนรู้จัก"; 
                        user.flower_max = 200;
                    } else if (user.flower >= 200) {
                        user.relationship = "เพื่อน";
                        user.flower_max = 500;
                    } else if (user.flower >= 500) {
                        user.relationship = "เพื่อนสนิท";
                        user.flower_max = 1000;
                    } else if (user.flower >= 1000) {
                        user.relationship = "เเฟน";
                        user.flower_max = 2000;
                    } else if (user.flower >= 2000) {
                        user.relationship = "คู่มั่น";
                        user.flower_max = 2000;
                    }

                    await user.save();

    
                    inv.item.splice(inv.item.findIndex(x => x.id === directory), 1);
                    await inv.save();
    
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`คุณได้ให้ดอกไม้ ${toOppositeCase(item.name)} แล้ว`)
    
                    interaction.editReply({ content: " ", embeds: [embed], components: [] });
                    await collector.stop();
                }
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)
    
                interaction.editReply({ embeds: [timed], components: [] });
            }
        });
    }
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}
