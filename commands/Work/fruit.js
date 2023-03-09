const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const Ginv = require("../../settings/models/inventory.js");

module.exports = { 
    name: ["เก็บผลไม้"],
    description: "เก็บผลไม้เพื่อขายได้เงิน",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const fruit = config.fruits.map(x => x.name);
        const random = Math.floor(Math.random() * fruit.length);
        const fruits_name = fruit[random];

        // Get the fish object from the config file
        const fruits = config.fruits.find(x => x.name === fruits_name);

        const fruit_get = fruits.name;
        const type = fruits.type;
        const amount = fruits.price;
        const level = fruits.level;
        const emoji = fruits.emoji;
        const feed = fruits.feed;
        const exp = fruits.exp;


        const waitembed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("กำลังตกปลา | กรุณารอสักครู่... ")

        const msg = await interaction.editReply({ embeds: [waitembed] });

        

        // Randomize all fish names in the config file and get the random fish name from the array of fish names in the config file


        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (user && user.fruit) {
            const cooldown = new Date(user.fruit_cooldown);
            const time = new Date(cooldown - new Date());
            const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที, ${time.getUTCSeconds()} วิ`;
    
            if(user.fruit_cooldown > Date.now()) {
                const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return msg.edit({ embeds: [embed_cooldown], ephemeral : true });
            }

/// + New Cooldown 

        user.fruit_cooldown = Date.now() + (user.fruit_cooldown_time * 1);
        const wait = require('node:timers/promises').setTimeout;

        

        /// Work Multiple Boost
        if(user.fruit_multiple == 0) {
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

    const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
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
                if (inv.item.length > profile.inventory) {
                    const keep_mix = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`กระเป๋าของคุณเต็มแล้ว`)

                    return menu.followUp({ embeds: [keep_mix], ephemeral: true })
                } else {

                inv.item.push({
                    name: fruit_get,
                    type: type,
                    price: amount,
                    level: level,
                    emoji: emoji,
                    feed: feed,
                    exp: exp,
                    id: generateID()
                });

                await profile.save();
                await inv.save();


                const keep = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` \`\`\` - เก็บไว้ในกระเป๋าแล้ว! \` \`\`\`
                `)
                .setFooter({ text: `© Kitsakorn | Version Beta`})

                await menu.followUp({ embeds: [keep], files: [], components: [] })


                collector.stop();
            }
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
                .setDescription(` <:820015313558700034:1022032835818815509> ${interaction.user} ได้รับ : \n ${emoji} ${fruit_get} \n+ ขายได้เงิน: \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574>`)
                .setFooter({ text: `© Kitsakorn | Version Beta`})
                
                await msg.edit({ embeds: [embed], components: [button]});
            });
        }
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
