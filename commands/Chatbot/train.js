const guild_db = require("../../settings/models/guild.js");
const train_db_normal = require("../../settings/models/train.js");
const train_db_hate = require("../../settings/models/train_hate.js");
const train_db_love = require("../../settings/models/train_love.js");
const { readdirSync } = require('fs');
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: ["สอน"], //เช็คเงินทั้งหมดของคุณ
  description: "สอนข้อความ・Training messages.",
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

    let question = interaction?.options.getString('คำถาม');
    let answer = interaction?.options.getString('คำตอบ');
    let type = interaction?.options.getString('ประเภท');
    if (!question || !answer) return;

    let guild_data = await guild_db.findOne({ guild: interaction.guild.id });
    if (!guild_data?.talkRoom) {
        let no_ch = new EmbedBuilder()
            .setDescription(`\`⚠️\` \`|\` คุณยังไม่ได้ตั้งค่าช่องสำหรับพูดคุยกับกินกอน ใช้คำสั่ง \`/talk-room\` เพื่อตั้งค่า`)
            .setColor('#fcfa72')
        return msg.edit({ embeds: [no_ch] }).catch(() => { });
    } else {
        let success_embed = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` สอนข้อความสำเร็จ\n\n> **\`✨ คำถาม\`** : ${question}\n> **\`💬 คำตอบ\`** : ${answer}`)
            .setColor('#A7FFAB')
            msg.edit({ embeds: [success_embed] }).catch(() => { });

      if(type == "normal") { 
        let new_data_normal = new train_db_normal({
            guild: interaction.guild.id,
            question: question,
            answer: answer
        });

        new_data_normal.save().then(async () => {
            let cache_data_normal = await train_db_normal.find({ guild: interaction.guild.id });
            if (cache_data_normal.length >= 1) client.train_cache_normal.set(interaction.guild.id, cache_data_normal);
        });
} else if(type == "hate") {
        let new_data_hate = new train_db_hate({
          guild: interaction.guild.id,
          question: question,
          answer: answer
      });

      new_data_hate.save().then(async () => {
          let cache_data_hate = await train_db_hate.find({ guild: interaction.guild.id });
          if (cache_data_hate.length >= 1) client.train_cache_hate.set(interaction.guild.id, cache_data_hate);
      });
    } else if(type == "love") {

      let new_data_love = new train_db_love({
        guild: interaction.guild.id,
        question: question,
        answer: answer
    });

    new_data_love.save().then(async () => {
        let cache_data_love = await train_db_love.find({ guild: interaction.guild.id });
        if (cache_data_love.length >= 1) client.train_cache_love.set(interaction.guild.id, cache_data_love);
    });
  }
    };
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}