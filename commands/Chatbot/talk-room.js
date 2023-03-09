const guild_db = require("../../settings/models/guild.js");
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: ["ตั้งห้องคุย"], //เช็คเงินทั้งหมดของคุณ
  description: "ตั้งให้เป็นช่องสำหรับพูดคุยกับกิดกอน・Set as a channel for talking to กิดกอน.",
  category: "Chatbot",
  options: [
    {
      name: "เลือกห้อง",
      description: "เลือกช่องที่จะคุย・Select a channel.",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
    const msg = await interaction.editReply({ embeds: [loading] });
    
    const channel = interaction.options.getChannel("เลือกห้อง") || interaction.channel;
    let guild_data = await guild_db.findOne({ guild: interaction.guild.id });

    if (guild_data && guild_data?.talkRoom) {
        guild_data.talkRoom = channel.id;
        await guild_data.save();

        client.cache.set(interaction.guild.id, channel.id);

        let success_embed = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` เปลี่ยนช่องสำหรับพูดคุยกับกินกอนเป็น ${channel} เรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        return msg.edit({ embeds: [success_embed] }).catch(() => { });
    } else {
        let new_guild = new guild_db({ 
            guild: interaction.guild.id,
            talkRoom: channel.id,
        });

        await new_guild.save();
        client.cache.set(interaction.guild.id, channel.id);

        let success_embed = new EmbedBuilder()
            .setDescription(`\`✅\` \`|\` ตั้งค่าช่องสำหรับพูดคุยกับกินกอนเป็น ${channel} เรียบร้อยแล้ว`)
            .setColor('#A7FFAB')
        return msg.edit({ embeds: [success_embed] }).catch(() => { });
    };

  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}