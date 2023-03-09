const global_train_normal_db = require('../../settings/models/global_train');
const global_train_love_db = require('../../settings/models/global_train_love');
const global_train_hate_db = require('../../settings/models/global_train_hate');
const config = require('../../settings/config.js');
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: ["learn", "onlydev" ], //เช็คเงินทั้งหมดของคุณ
  description: "สอนข้อความเเบบ (global)・Training messages. (global)",
  category: "Chatbot",
  options: [
    {
      name: "คำถาม",
      description: "คีย์เวริดของคำถาม・Question (keyword).",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
        name: "คำตอบ",
        description: "คำตอบของคำถาม・Answer.",
        type: ApplicationCommandOptionType.String,
        required: true,
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
        }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
    const msg = await interaction.editReply({ embeds: [loading] });
    
    if (!config.OWNER_ID.includes(interaction.user.id)) {
        let not_owner = new EmbedBuilder()
            .setDescription(`\`⚠️\` \`|\` คุณไม่มีความสามารถพอที่จะทำ`)
            .setColor('#fcfa72')
        return msg.edit({ embeds: [not_owner], ephemeral: true }).catch(() => { });
    };

    let question = interaction?.options.getString('คำถาม');
        let answer = interaction?.options.getString('คำตอบ');
        let type = interaction?.options.getString('ประเภท');
        if (!question || !answer) return;

        let success_embed = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` สอนข้อความแบบ \`global\` สำเร็จ\n\n> **\`✨ คำถาม\`** : ${question}\n> **\`💬 คำตอบ\`** : ${answer}`)
            .setColor('#A7FFAB')
        msg.edit({ embeds: [success_embed] }).catch(() => { });
if (type === 'normal') {
        let new_data_normal = new global_train_normal_db({
            question: question,
            answer: answer
        });

        new_data_normal.save().then(async () => {
            let cache_data = await global_train_normal_db.find({});
            if (cache_data.length >= 1) client.global_train_normal = cache_data;
        });
    } else if (type === 'hate') {

        let new_data_hate = new global_train_hate_db({
          question: question,
          answer: answer
      });

      new_data_hate.save().then(async () => {
          let cache_data = await global_train_hate_db.find({});
          if (cache_data.length >= 1) client.global_train_hate_db = cache_data;
      });
    } else if (type === 'love') {

      let new_data_love = new global_train_love_db({
        question: question,
        answer: answer
    });

    new_data_love.save().then(async () => {
        let cache_data = await global_train_love_db.find({});
        if (cache_data.length >= 1) client.global_train_love_db = cache_data;
    });
}
    }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}