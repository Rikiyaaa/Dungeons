const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const Member = require("../../settings/models/profile.js");

module.exports = {
    name: ["ให้ขนมกิดกอน"], //fixing
    description: "ให้ขนมกิดกอน ",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const loading = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
      const msg = await interaction.editReply({ embeds: [loading] });

        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        //this returns the values
        const value = Object.values(inv.item);
        const object = value.filter(x => x.type === "candy");
        // if not have food return msg
        if(object.length === 0) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("คุณไม่มีขนมในกระเป๋า")

            return msg.edit({ content: " ", embeds: [embed], components: [] });
        }

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("*เลือกขนมที่จะให้กิดกอน*")
    
        const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("food_bot")
                    .setPlaceholder("เลือกขนมที่จะให้กิดกอน")
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
                if(menu.customId === "food_bot") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = inv.item.find(x => x.id === directory);

                    user.happy += item.happy;
                    if (user.happy > 100) user.status = "รัก"; 
                    user.bad_message -= item.bad_message;
                    if (user.bad_message < 0) user.bad_message = 0;

                    await user.save();

    
                    inv.item.splice(inv.item.findIndex(x => x.id === directory), 1);
                    await inv.save();
    
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`คุณได้ให้ขนม ${toOppositeCase(item.name)} แล้ว`)
    
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
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}
