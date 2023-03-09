const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const FishInv = require("../../settings/models/fishinventory.js");

module.exports = { 
    name: ["ตกปลา"],
    description: "ตกปลาเพื่อหาเงิน",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const fish = config.fishs.map(x => x.name);
        const random = Math.floor(Math.random() * fish.length);
        const fish_name = fish[random];

        // Get the fish object from the config file
        const fishs = config.fishs.find(x => x.name === fish_name);

        const fish_get = fishs.name;
        const type = fishs.type;
        const amount = fishs.price;
        const level = fishs.level;
        const emoji = fishs.emoji;


        const waitembed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("กำลังตกปลา | กรุณารอสักครู่... ")

        const msg = await interaction.editReply({ embeds: [waitembed] });

        

        // Randomize all fish names in the config file and get the random fish name from the array of fish names in the config file


        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (user && user.fishs) {
            const cooldown = new Date(user.fishs_cooldown);
            const time = new Date(cooldown - new Date());
            const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที, ${time.getUTCSeconds()} วิ`;
    
            if(user.fishs_cooldown > Date.now()) {
                const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return msg.edit({ embeds: [embed_cooldown], ephemeral : true });
            }

/// + New Cooldown 

        user.fishs_cooldown = Date.now() + (user.fishs_cooldown_time * 1);
        const wait = require('node:timers/promises').setTimeout;

        

        /// Work Multiple Boost
        if(user.fishs_multiple == 0) {
            // Get default amount
          //  user.money += amount;
            /// Save database
            await user.save().then( async () => {
                const embed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` \`\`\` - ขายได้เงิน: \`$${numberWithCommas(amount)}\` \`\`\`
                `)
                .setFooter({ text: `© Kitsakorn | Version Beta`})
            return msg.edit({ embeds: [embed] });
            });
        } else {
         //   const formatBoost = amount * user.fishs_multiple; // Get boost amount
            // Get boost amount
          //  user.money += formatBoost;


            const button = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId("sell")
            .setLabel("ขาย")
            .setDisabled(false)
            
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId("keep")
            .setLabel("เก็บไว้")
            .setDisabled(false)
            .setStyle(ButtonStyle.Secondary),
            )

            let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 10000 });

    const fishInv = await FishInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "sell") {

                //If the button is pressed, set setDisabled to true.

            profile.money += amount;

            const sell = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` \`\`\` - ขายได้เงิน:  ${numberWithCommas(amount)} \` \`\`\`
                `)
                .setFooter({ text: `© Kitsakorn | Version Beta`}
                )

            await profile.save();
            await menu.followUp({ embeds: [sell], ephemeral: true,  });
            collector.stop();


            } else if (menu.customId === "keep") {
                
                const keep_mix = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`กระเป๋าของคุณเต็มแล้ว`)

                if (fishInv.item.length > profile.fishinventory) 
                // You backpack is max
                return menu.followUp({ embeds: [keep_mix], ephemeral: true })

                fishInv.item.push({
                    name: fish_get,
                    type: type,
                    price: amount,
                    level: level,
                    emoji: emoji,
                    id: generateID()
                });


                const keep = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` \`\`\` - เก็บไว้ในกระเป๋าแล้ว! \` \`\`\`
                `)
                .setFooter({ text: `© Kitsakorn | Version Beta`})

                await profile.save();
                await fishInv.save();
                await menu.followUp({ embeds: [keep], files: [], components: [] })


                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {

            const time = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
            .setDescription(` \`\`\` - ปลาหนีไปเเล้ว \` \`\`\`
            `)

            msg.edit({ embeds: [time], files: [], components: []})
            await wait(8000);
            msg.delete();
        }
    });

            /// Save database
            await user.save().then( async () => {
                
                const embed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` <:820015313558700034:1022032835818815509> ${interaction.user} ได้รับ : \n ${emoji} ${fish_get} \n+ ขายได้เงิน: \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574>`)
                .setFooter({ text: `© Kitsakorn | Version Beta`})
                await msg.edit({ embeds: [embed], components: [button]});
            });
        }
    } else {
        const embed = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | คุณไม่สามารถตกปลาได้ \nเนื่องจาก: ไม่มีเบ็ดตกปลา  \` พิมพ์ /รายการสินค้า \``)
            

            msg.edit({ embeds: [embed] });
        return;
    }
}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};
