const Member = require("../../settings/models/profile.js");
const { EmbedBuilder } = require("discord.js");
const config = require("../../settings/defaults.js");

module.exports = { 
    name: ["ขายตัว"], //อาชญากรรม มีโอกาศโดนจับ
    description: "ทำงานอาชญากรรมมีโอกาศโดนจับน้า!", 
    run: async (client, interaction) => {

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const cooldown = new Date(user.sell_cooldown);
        const time = new Date(cooldown - new Date());
        const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที, ${time.getUTCSeconds()} วิ`;

        if(user.sell_cooldown > Date.now()) {
            const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return interaction.reply({ embeds: [embed_cooldown]});
        }

        /// Random 1500 - 3000
        const amount = Math.floor(Math.random() * (config.general.sell_money_min - config.general.sell_money_max)) + config.general.sell_money_max;
        /// + New Cooldown
        user.sell_cooldown = Date.now() + (user.sell_cooldown_time * 1000);

        const wait = require('node:timers/promises').setTimeout;
        const waitembed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("กำลังขายตัว | กรุณารอสักครู่... ")
                .setImage('https://i.imgur.com/ZmXoan8.gif')

        const chance = Math.floor(Math.random() * 100);
        if (chance > config.general.sell_chance) {
            if (user.sell_multiple == 0) {
                user.money += amount;

                await user.save().then( async () => {
                    const embedr = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setAuthor({ name: "ระบบขายตัว | ทำงานอาชญากรรมมีโอกาศโดนจับ", iconURL: "https://i.imgur.com/AM46DdR.png" })
                        .setDescription(`*คุณ* : ${interaction.user}  \n+ *ได้เงิน* \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574> *จากการขายตัว*`)
                        .setImage("https://cdn.discordapp.com/attachments/1021744619396018246/1023206673923444806/offer-money-offering-money_1.gif")
                        .setFooter({ text: `คูลดาวน์: ${config.general.sell_cooldown_time} วิ` })

                        await interaction.reply({ embeds: [waitembed] });
                        await wait(5000);
                        await interaction.editReply({ embeds: [embedr]});
                });
            } else {
                const formatBoost = amount * user.sell_multiple;

                user.money += formatBoost;

                await user.save().then( async () => {
                    const embedo = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setAuthor({ name: "ระบบขายตัว | ทำงานอาชญากรรมมีโอกาศโดนจับ", iconURL: "https://i.imgur.com/AM46DdR.png" })
                    .setDescription(`*คุณ* : ${interaction.user}  \n+ *ได้เงิน* \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574> *จากการขายตัว*`)
                    .setImage("https://cdn.discordapp.com/attachments/1021744619396018246/1023206673923444806/offer-money-offering-money_1.gif")
                    .setFooter({ text: `คูลดาวน์: ${config.general.sell_cooldown_time} วิ` })

                await interaction.reply({ embeds: [waitembed] });
                await wait(5000);
                await interaction.editReply({ embeds: [embedo]});
                });
            }
        } else {
            if (user.sell_multiple == 0) {
                user.money -= amount;

                await user.save().then( async () => {
                    const embeds = new EmbedBuilder()
                    .setColor("#bdc6e9")
                        .setAuthor({ name: "ระบบขายตัว | ทำงานอาชญากรรมมีโอกาศโดนจับ", iconURL: "https://i.imgur.com/g33ahGm.png" })
                        .setDescription(`*คุณ* : ${interaction.user}  \n- *เสีย* \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574> *เพราะลูกค้าบิด จากการขายตัว*`)
                        .setImage("https://cdn.discordapp.com/attachments/1021744619396018246/1023206674275782717/levy-daniel-levy_1.gif")
                        .setFooter({ text: `คูลดาวน์: ${user.sell_cooldown_time} วิ` })

                        await interaction.reply({ embeds: [waitembed] });
                        await wait(5000);
                        await interaction.editReply({ embeds: [embeds]});
                });
            } else {
                const formatBoost = amount * user.sell_multiple;

                user.money -= formatBoost;

                await user.save().then( async () => {
                    const embede = new EmbedBuilder()
                    .setColor("#bdc6e9")
                        .setAuthor({ name: "ระบบขายตัว | ทำงานอาชญากรรมมีโอกาศโดนจับ", iconURL: "https://i.imgur.com/g33ahGm.png" })
                        .setDescription(`*คุณ* : ${interaction.user}  \n- *เสีย* \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574> *เพราะลูกค้าบิด จากการขายตัว*`)
                        .setImage("https://cdn.discordapp.com/attachments/1021744619396018246/1023206674275782717/levy-daniel-levy_1.gif")
                        .setFooter({ text: `คูลดาวน์: ${config.general.sell_cooldown_time} วิ` })

                        await interaction.reply({ embeds: [waitembed] });
                        await wait(5000);
                        await interaction.editReply({ embeds: [embede]});
                });
            }
        }
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}