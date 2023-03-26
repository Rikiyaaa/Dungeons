const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const FishInv = require("../../settings/models/fishinventory.js");
const moment = require('moment');

module.exports = { 
    name: ["ตกปลา"],
    description: "ตกปลาเพื่อหาเงิน",
    run: async (client, interaction) => {

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

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

        await interaction.reply({ embeds: [waitembed] });

        if(user.fishhook[0].name === "ไม่มี") {
            const embed_no_hook = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:971824666673020990:1022032761936166942> | คุณไม่มีเบ็ดตกปลา`)
            return interaction.editReply({ embeds: [embed_no_hook], ephemeral : true });
        }

        if(user.fishhook[0].durability == 0) {
            const durability_low = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`เบ็ดตกปลาของคุณเสื่อมสภาพแล้ว กรุณาซื้อเบ็ดใหม่`)
            menu.followUp({ embeds: [durability_low], ephemeral: true })

        }

        if (user && user.fishhook[0].name !== "ไม่มี") {
            const cooldown = new Date(user.fishs_cooldown);
            const time = new Date(cooldown - new Date());
            const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที, ${time.getUTCSeconds()} วิ`;
    
            if(user.fishs_cooldown > Date.now()) {
                const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส ${time_format}`)

            return interaction.editReply({ embeds: [embed_cooldown], ephemeral : true });
            }

/// + New Cooldown 

         user.fishs_cooldown = Date.now() + (user.fishhook[0].speed * 1000); // 2 minutes
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
            return interaction.editReply({ embeds: [embed] });
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
            profile.fishing = profile.fishing += 1;
            profile.fishhook[0].durability -= 2;
            profile.fishhook[0].durability_max -= 2;

            const stamina_inter = profile.fishhook[0].durability;
            const stamina_max_inter = profile.fishhook[0].durability_max + stamina_inter ;
             const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
             const result_stamina_inter = Math.round(chack_stamina_inter);
             if(result_stamina_inter <= 0) {
                profile.fishhook[0].emoji_durability = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
             profile.fishhook[0].emoji_durability = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 20) {
             profile.fishhook[0].emoji_durability = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 30) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 40) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 50) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 60) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 70) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 80) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 90) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 100) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(result_stamina_inter > 100) {
             profile.fishhook[0].emoji_durability = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
    
            await profile.save();
            await menu.deferUpdate();
            if(menu.customId === "sell") {
                if(profile.fishhook[0].durability == 4) {
                    const durability_low = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`ดูเหมือนว่าเบ็ดตกปลาของคุณใกล้เสื่อมสภาพแล้ว`)
                    menu.followUp({ embeds: [durability_low], ephemeral: true })
                } else if (profile.fishhook[0].durability == 2) {
                    const durability_low = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`เบ็ดตกปลาของคุณใช้ได้อีกครั้งเดียว`)
                    menu.followUp({ embeds: [durability_low], ephemeral: true })
                }



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
                return menu.followUp({ embeds: [keep_mix], ephemeral: true })

                if(profile.fishhook[0].durability == 4) {
                    const durability_low = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`ดูเหมือนว่าเบ็ดตกปลาของคุณใกล้เสื่อมสภาพแล้ว`)
                    menu.followUp({ embeds: [durability_low], ephemeral: true })
                } else if (profile.fishhook[0].durability == 2) {
                    const durability_low = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`เบ็ดตกปลาของคุณใช้ได้อีกครั้งเดียว`)
                    menu.followUp({ embeds: [durability_low], ephemeral: true })
                }


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

            interaction.editReply({ embeds: [time], files: [], components: []})
            await wait(8000);
            interaction.deleteReply();
        }
    });

            /// Save database
            await user.save().then( async () => {
                
                const embed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setTitle("🏝️ | บ่อตกปลาหลังบ้าน")
                .setDescription(` <:820015313558700034:1022032835818815509> ${interaction.user} ได้รับ : \n ${emoji} ${fish_get} \n+ ขายได้เงิน: \` ${numberWithCommas(amount)} บาท \` <a:844525261973618698:1022032206480277574>`)
                .setFooter({ text: `© Kitsakorn | Version Beta`})
                await interaction.editReply({ embeds: [embed], components: [button]});
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
