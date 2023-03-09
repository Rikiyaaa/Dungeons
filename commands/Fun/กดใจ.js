const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const request = require('node-superfetch');
const Canvas = require('@napi-rs/canvas');
const Member = require("../../settings/models/profile.js");

module.exports = { 
    name: ["ให้ดอกไม้"],
    description: "ให้ดอกไม้ มีใจก็ให้ไปป (กดได้วันละครั้ง).",
    options: [
        {
            name: "ให้ใครดี",
            description: "เลือกคนที่คุณต้องการให้ดอกไม้",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
    const msg = await interaction.editReply({ embeds: [loading] });

        const embed3 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่สามารถให้ดอกไม้บอทได้ `) 
        const embed4 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่ต้องให้ดอกไม้ตัวเองเลยนะ`) 

        const member = interaction.options.getUser("ให้ใครดี") || interaction.member;
        if (member.bot) return msg.edit({ embeds: [embed3]});

        /// Try to create new database went this member not have!
        await client.createProfile(interaction.guild.id, member.id) /// Can find this module in Handlers/loadCreate.js

        const interac = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const user = await Member.findOne({ guild: interaction.guild.id, user: member.id });
        if(user.user === interaction.user.id) return msg.edit({ embeds: [embed4] });

        const cooldown = new Date(interac.vote_cooldown);
        /// Format time and send message
        const time = new Date(cooldown - new Date());
        const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที เเละ ${time.getUTCSeconds()} วินาที`;

        if(interac.vote_cooldown > Date.now()) {
            const embed_cooldown = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return msg.edit({ embeds: [embed_cooldown] });
        }
        
        const embed = new EmbedBuilder()
            .setColor('#bdc6e9')
            .setDescription(`🌹 | ${interaction.user} ให้ดอกไม้ คุณ: \`${member.username}#${member.discriminator}\` เรียบร้อยเเล้ว`)

        user.reputation += 1;
        await user.save();

        /// Get vote cooldown in database
        interac.vote_cooldown = Date.now() + (interac.vote_cooldown_time * 1000);
        await interac.save();

        return msg.edit({ embeds: [embed] });

    }
}