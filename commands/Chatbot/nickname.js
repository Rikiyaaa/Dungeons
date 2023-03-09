const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: ["nickname"], //เช็คเงินทั้งหมดของคุณ
  description: "ชื่อที่คุณต้องการให้บอทเรียก",
  category: "Chatbot",
  options: [
    {
      name: "ชื่อ",
      description: "ชื่อที่ต้องการให้เปลี่ยน",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
    const msg = await interaction.editReply({ embeds: [loading] });

    const nickname = interaction.options.getString("ชื่อ") || interaction.username;

    const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

      user.nickname = nickname;

      await user.save();


    const embed = new EmbedBuilder()
      .setColor('#bdc6e9')
    .setDescription(`เปลี่ยนชื่อเรียบร้อยแล้ว`)

    const embed2 = new EmbedBuilder()
      .setColor('#bdc6e9')
      .setDescription(`Loading please wait...`)

      await msg.edit({ embeds: [embed2] });
      await wait(1000);
      await msg.edit({ embeds: [embed], });
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}