const guild_db = require("../../settings/models/guild.js");
const train_db_normal = require("../../settings/models/train.js");
const train_db_hate = require("../../settings/models/train_hate.js");
const train_db_love = require("../../settings/models/train_love.js");
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: ["ลบคำที่สอน"], //เช็คเงินทั้งหมดของคุณ
  description: "ลบข้อความที่สอน・Delete training messages.",
  category: "Chatbot",
  options: [
    {
      name: "mode",
      description: "โหมด・Mode.",
      type: ApplicationCommandOptionType.String,
      required: true,
        choices: [
            {
                name: "ทั้งหมด",
                value: "mode_all",

            },
            {
                name: "บางคำตอบ",
                value: "mode_some",
            },
        ],
    },
    {
        name: "ประเภท",
        description: "ประเภทของข้อความที่จะสอน・Type of message to be trained.",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
                name: "ปกติ",
                value: "normal"
            },
            {
                name: "รัก",
                value: "love"
            },
            {
                name: "โกรธ",
                value: "hate"
            },
        ]
    },
    {
        name: "คำถาม",
        description: "คีย์เวริดของคำถาม・Question (keyword)..",
        type: ApplicationCommandOptionType.String,
        required: true,
        },
        {
            name: "คำตอบ",
            description: "คำตอบของคำถาม・Answer.",
            type: ApplicationCommandOptionType.String,
        }

  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
    .setColor("#bdc6e9")
    .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
  const msg = await interaction.editReply({ embeds: [loading] });

    let question = interaction?.options.getString('คำถาม');
    let mode = interaction?.options.getString('mode');
    let type = interaction?.options.getString('ประเภท');
    if (!question || !mode) return;

    if (mode == 'mode_all') {
        if(type == 'normal') {
        let all_train = await train_db_normal.find({ guild: interaction.guild.id });
        let match_train = all_train.filter(train => train.question == question);
        if (match_train.length == 0) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        let del_data = await train_db_normal.deleteMany({ guild: interaction.guild.id, question: question });
        let del_all = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบข้อมูลทั้งหมดของคำถาม \`${question}\` จำนวน \`${del_data.deletedCount}\` ชุดเรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_all] }).catch(() => { });

        let cache_data_normal = await train_db_normal.find({ guild: interaction.guild.id });
        if (cache_data_normal.length >= 1) client.train_cache_normal.set(interaction.guild.id, cache_data_normal);
        else client.train_cache_normal.delete(interaction.guild.id);
    } else if(type == 'love') {
        let all_train = await train_db_love.find({ guild: interaction.guild.id });
        let match_train = all_train.filter(train => train.question == question);
        if (match_train.length == 0) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        let del_data = await train_db_love.deleteMany({ guild: interaction.guild.id, question: question });
        let del_all = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบข้อมูลทั้งหมดของคำถาม \`${question}\` จำนวน \`${del_data.deletedCount}\` ชุดเรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_all] }).catch(() => { });

        let cache_data_love = await train_db_love.find({ guild: interaction.guild.id });
        if (cache_data_love.length >= 1) client.train_cache_love.set(interaction.guild.id, cache_data_love);
        else client.train_cache_love.delete(interaction.guild.id);
    } else if(type == 'hate') {
        let all_train = await train_db_hate.find({ guild: interaction.guild.id });
        let match_train = all_train.filter(train => train.question == question);
        if (match_train.length == 0) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        let del_data = await train_db_hate.deleteMany({ guild: interaction.guild.id, question: question });
        let del_all = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบข้อมูลทั้งหมดของคำถาม \`${question}\` จำนวน \`${del_data.deletedCount}\` ชุดเรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_all] }).catch(() => { });

        let cache_data_hate = await train_db_hate.find({ guild: interaction.guild.id });
        if (cache_data_hate.length >= 1) client.train_cache_hate.set(interaction.guild.id, cache_data_hate);
        else client.train_cache_hate.delete(interaction.guild.id);
    }
    } else if (mode == 'mode_some') {
        if (type == 'normal') {
        let answer = interaction?.options.getString('คำตอบ');
        if (!answer) {
            let no_answer = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` กรุณาระบุคำตอบ`)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [no_answer], ephemeral: true }).catch(() => { });
        };

        let train_data = await train_db_normal.findOne({ guild: interaction.guild.id, question: question, answer: answer });
        if (!train_data) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        await train_db_normal.deleteOne({ guild: interaction.guild.id, question: question, answer: answer });

        let del_some = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบช้อมูลคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\` เรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_some] }).catch(() => { });

        let cache_data_normal = await train_db_normal.find({ guild: interaction.guild.id });
        if (cache_data_normal.length >= 1) client.train_cache_normal.set(interaction.guild.id, cache_data_normal);
        else client.train_cache_normal.delete(interaction.guild.id);
    } else if(type == 'love') {
        let answer = interaction?.options.getString('คำตอบ');
        if (!answer) {
            let no_answer = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` กรุณาระบุคำตอบ`)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [no_answer], ephemeral: true }).catch(() => { });
        };

        let train_data = await train_db_love.findOne({ guild: interaction.guild.id, question: question, answer: answer });
        if (!train_data) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        await train_db_love.deleteOne({ guild: interaction.guild.id, question: question, answer: answer });

        let del_some = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบช้อมูลคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\` เรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_some] }).catch(() => { });

        let cache_data_love = await train_db_love.find({ guild: interaction.guild.id });
        if (cache_data_love.length >= 1) client.train_cache_love.set(interaction.guild.id, cache_data_love);
        else client.train_cache_love.delete(interaction.guild.id);
    } else if(type == 'hate') {
        let answer = interaction?.options.getString('คำตอบ');
        if (!answer) {
            let no_answer = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` กรุณาระบุคำตอบ`)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [no_answer], ephemeral: true }).catch(() => { });
        };

        let train_data = await train_db_hate.findOne({ guild: interaction.guild.id, question: question, answer: answer });
        if (!train_data) {
            let invalid_question = new EmbedBuilder()
                .setDescription(`\`⚠️\` \`|\` ไม่พบคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\``)
                .setColor('#fcfa72')
            return msg.edit({ embeds: [invalid_question], ephemeral: true }).catch(() => { });
        };

        await train_db_hate.deleteOne({ guild: interaction.guild.id, question: question, answer: answer });

        let del_some = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ลบช้อมูลคำถาม \`${question}\` ที่มีคำตอบ \`${answer}\` เรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [del_some] }).catch(() => { });

        let  cache_data_hate = await train_db_hate.find({ guild: interaction.guild.id });
        if (cache_data_hate.length >= 1) client.train_cache_hate.set(interaction.guild.id, cache_data_hate);
        else client.train_cache_hate.delete(interaction.guild.id);
    }
    }
}
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}