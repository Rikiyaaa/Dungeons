const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const Ginv = require("../../settings/models/inventory.js");
const GMonter = require("../../settings/models/monter.js");
const GProfile = require("../../settings/models/cradprofile.js");

module.exports = { 
    name: ["fram"],
    description: "fram",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const waitembed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("กำลังค้นหามอนเตอร์ | กรุณารอสักครู่... ")

        const msg = await interaction.editReply({ embeds: [waitembed] });

        const cprofile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const noclass = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("คุณยังไม่ได้เลือกคลาส กรุณาเลือกคลาสก่อนใช้คำสั่งนี้")

        if (!cprofile.type[0]) return msg.edit({ embeds: [noclass], ephemeral: true });

        const nohealth = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("คุณต้องรักษาสุขภาพก่อนใช้คำสั่งนี้")

        if (cprofile.health <= 0) return msg.edit({ embeds: [nohealth], ephemeral: true });

        const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const name_monter = config.monter.map(x => x.name);
        const random = Math.floor(Math.random() * name_monter.length);
        const monter_name = name_monter[random];

        const monter = config.monter.find(x => x.name === monter_name);

        const monter_name_get = monter.name;
        const monter_type = monter.type;
        const monter_level = monter.level;
        const monter_image = monter.image;
        const monter_damage = monter.damage_attack;
        const monter_health = monter.health;    
        const monter_exp = monter.exp;
        const monter_location = monter.location;
        const monter_location_image = monter.location_image;
        const monter_drop_name = monter.drop_name;
        const monter_drop_type = monter.drop_type;
        const monter_drop_image = monter.drop_image;


        const wait = require('node:timers/promises').setTimeout;

        const embed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
        .setThumbnail(monter_image)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('attack')
            .setLabel('โจมตี')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('run')
            .setLabel('หลบ')
            .setStyle(ButtonStyle.Danger)
        )

        monter_data.name = monter_name_get;
        monter_data.type = monter_type;
        monter_data.level = monter_level;
        monter_data.image = monter_image;
        monter_data.damage_attack = monter_damage;
        monter_data.health = monter_health;
        monter_data.exp = monter_exp;
        monter_data.location = monter_location;
        monter_data.location_image = monter_location_image;
        monter_data.drop = [
            {
                name: monter_drop_name,
                type: monter_drop_type,
                image: monter_drop_image,
            }
        ];


        await monter_data.save();

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
    
        const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        msg.edit({ embeds: [embed], files: [], components: [row] });
    
        collector.on('collect', async (menu) => {
            if(menu.isButton()) {
                await menu.deferUpdate();
                if(menu.customId === "attack") {
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                    const cprofile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                    //โจมตีมอนเตอร์
                    monter_data.health =  monter_data.health - cprofile.type[0].sword.damage_attack;
                    //โจมตีคุณ
                    cprofile.health = cprofile.health - monter_data.damage_attack;

                    if (cprofile.health <= 0) 
                        cprofile.health = 0;

                    await monter_data.save();
                    await cprofile.save();

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`มอนเตอร์ชีวิตเหลือ ${monter_data.health} คุณชีวิตเหลือ ${cprofile.health}`)

                    await menu.followUp({ embeds: [attack], files: [], components: [], ephemeral: true })
                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        msg.edit({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
                        const lose = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณแพ้มอนเตอร์ \`\`\` `)

                        msg.edit({ embeds: [lose], files: [], components: []})
                    } else {
                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setThumbnail(monter_image)
                
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId('attack')
                            .setLabel('โจมตี')
                            .setStyle(ButtonStyle.Primary),
                
                            new ButtonBuilder()
                            .setCustomId('run')
                            .setLabel('หลบ')
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                        msg.edit({ embeds: [embed], files: [], components: [row] });
                    } 

                } else if (menu.customId === "run") {
                    const run = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(` \`\`\` - คุณหลบมอนเตอร์ \`\`\` `)

                    msg.edit({ embeds: [run], files: [], components: [], ephemeral: true})
                    await monter_data.deleteOne();
    
                    collector.stop();
                }
            }
     });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
            }
        });

    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};
