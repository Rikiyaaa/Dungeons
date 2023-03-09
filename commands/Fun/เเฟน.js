const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder,  ButtonStyle} = require("discord.js");
const request = require('node-superfetch');
const Canvas = require('@napi-rs/canvas');
const Member = require("../../settings/models/profile.js");
const delay = require("delay");
const pendings = {};

module.exports = { 
    name: ["เเฟน"],
    description: "Marriage someone.",
    options: [
        {
            name: "ขอคบ",
            description: "เลือกใครสักคนเป็นเเฟนของคุณ!",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "เลือกใครดี",
                    description: "เลือกคนที่คุณต้องการจะขอคบ",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "ขอเลิก",
            description: "ขอเลิกกับคนที่คุณกำลังคบอยู่!",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (interaction.options.getSubcommand() === "ขอคบ") {
            const member = interaction.options.getUser("เลือกใครดี");

            const cantdothat = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | มึงเป็นเเฟนกับตัวเองไม่ได้ครับ`)

        const amount_all = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | มึงเป็นเเฟนกับบอทไม่ได้ครับ `)

            if (member.id === interaction.user.id) return interaction.editReply({ embeds: [cantdothat] });
            if (member.bot) return interaction.editReply({ embeds: [amount_all] });

            /// Sent message went already sent
            for(const requester in pendings) {
                const receiver = pendings[requester];
                if (requester === interaction.user.id) { 
                    const embed1 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | มึงมีคำขอที่ส่งอยู่เเล้ว`) 

                    interaction.editReply({ embeds: [embed1] }); 
                    return;
                } else if (receiver === interaction.user.id) {
                    const embed2 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | คุณได้รับคำขอคบแล้ว`) 

                    interaction.editReply({ embeds: [embed2] }); 
                    return;
                } else if (requester === member.id) {
                    const embed3 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | ผู้ใช้รายนี้มีคำขอคบที่รอดำเนินการอยู่แล้ว`) 

                    interaction.editReply({ embeds: [embed3] }); 
                    return;
                } else if (receiver === member.id) {
                    const embed4 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | ผู้ใช้รายนี้มีคำขอคบแล้ว`) 

                    interaction.editReply({ embeds: [embed4] }); 
                    return;
                }
            }

            /// Try to create new database went this member not have!
            await client.createProfile(interaction.guild.id, member.id) /// Can find this module in Handlers/loadCreate.js

            //// This user already married
            const target = await Member.findOne({ guild: interaction.guild.id, user: member.id });
            if (target.married) {
                const embed5 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | เขามีเเฟนเเล้วครับน้อง`) 

                interaction.editReply({ embeds: [embed5]});
                return;
            }

            //// Your already married
            const your = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
            if (your.married) {
                const embed6 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription("<a:907824800192397392:1022032199836512330> | มึงมีเเฟนอยู่เเล้วไปขอเลิกก่อน ` พิมพ์ /เเฟน ขอเลิก`") 

                interaction.editReply({ embeds: [embed6] });
                return;
            }

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("accept")
                .setLabel("ตกลง")   
                .setEmoji("✅")
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel("ปฎิเสธ")
                    .setStyle(ButtonStyle.Secondary),
           
        );


            const embeded = new EmbedBuilder()
                .setColor("#ff7777")
                .setTitle(`คำขอเป็นเเฟน`)
                .setDescription(`\` - \` ${member} คุณมีคำขอคบเป็นเเฟน`)
                .setThumbnail("https://i.imgur.com/LX64jpN.png")
                .setFooter({ text: `คุณมีเวลา 30 วิ เพื่อตอบกลับ` })

            const Boxed = await interaction.editReply({ embeds: [embeded], components: [button] });

            pendings[interaction.user.id] = member.id;
    
            const filter = (button) => button.user.id === member.id;  
        const collector = interaction.channel.createMessageComponentCollector({ filter, time : 60000 * 30});
        // ถ้า คนที่เราคลิกไม่ใช่คนที่เราคลิกให้ตอบว่าไม่ใช่คนที่เราคลิก
    
            collector.on('collect', async (menu) => {
                if (menu.isButton()) {
                if (menu.customId === "accept") {
                    await menu.deferUpdate();
                    button.components[0].setDisabled(true);
                    button.components[1].setDisabled(true);

                    /// Save marry
                    target.married = true; /// Set to true
                    target.married_to = interaction.user.id; /// Change target married to your id
                    await target.save();

                    your.married = true /// Set to true
                    your.married_to = member.id; /// Change your married to target id
                    await your.save().then( async () => {

                        const embed = new EmbedBuilder()
                        .setColor("#ce2d2d")
                            .setAuthor({ name: "คำขอถูกตอบรับเเล้ว", iconURL: interaction.user.avatarURL({ dynamic: true }) })
                            .setDescription(`\` - \` ${member} ตอบรับคำขอของคุณเเล้ว`)
                            .setThumbnail("https://i.imgur.com/liXKJfj.gif")
                            .setFooter({ text: `ยินดีด้วย: ${interaction.user.username} <3 ${member.username}` })
    
                        // Delete pending request
                        delete pendings[interaction.user.id];
                        await menu.editReply({ embeds: [embed], components: [button] });
                        await delay(30000)
                        await interaction.deleteReply();
                        return collector.stop();
                    });
                }  else if (menu.customId === 'cancel') {
                    await menu.deferUpdate();
                    button.components[0].setDisabled(true);
                    button.components[1].setDisabled(true);
                    
    
                    const embed = new EmbedBuilder()
                    .setColor('#9b3c3c')
                        .setAuthor({ name: "คำขอถูกปฎิเสธเเล้ว", iconURL: interaction.user.avatarURL({ dynamic: true }) })
                        .setDescription(`\` - \` ${member} ปฎิเสธคำขอของคุณเเล้ว :(`)
                        .setThumbnail('https://i.imgur.com/UNaepvM.png')
                        .setFooter({ text: `คำขอส่งโดย: ${interaction.user.tag}` })
    
                    // Delete pending request
                    delete pendings[interaction.user.id];
                    await menu.editReply({ embeds: [embed], components: [button] });
                    await delay(30000)
                    await interaction.deleteReply();
                    return collector.stop();
                    
                }
            }
            });
    
            collector.on('end', async (collected, reason) => {
                if(reason === "time") {
                    button.components[0].setDisabled(true);
                    button.components[1].setDisabled(true);
                    // Delete pending request
                    delete pendings[interaction.user.id];
                    const embed7 = new EmbedBuilder()
                    .setColor("#9b3c3c")
                    .setThumbnail("https://i.imgur.com/UNaepvM.png")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | ไม่มีการตอบกลับ :( `) 

                    await Boxed.edit({  embeds: [embed7], components: [button] })
                    await delay(15000)
                    await interaction.deleteReply();
                    return collector.stop();
                }
            });
        }
        if (interaction.options.getSubcommand() === "ขอเลิก") {
            const your = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
            const embed8 = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่มีเเฟนครับน้อง`) 

            if (!your.married) return interaction.editReply({ embeds: [embed8]});

            const target = await Member.findOne({ guild: interaction.guild.id, user: your.married_to });
            const fetch = await client.users.fetch(your.married_to);


            const embed = new EmbedBuilder()
            .setColor('#9b3c3c')
                .setAuthor({ name: "คำขอเลิก", iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setDescription(`${interaction.user} เลิกกับ ${client.users.cache.get(fetch.id)} เเล้ว`)
                .setThumbnail("https://i.imgur.com/UNaepvM.png")
                .setFooter({ text: `ขอเลิกโดย: ${interaction.user.tag}` })

            await target.updateOne({ married: false, married_to: "" });
            await your.updateOne({ married: false, married_to: "" });
            await interaction.editReply({ embeds: [embed] });
            await delay(30000)
            await interaction.deleteReply();
        }
    }
}