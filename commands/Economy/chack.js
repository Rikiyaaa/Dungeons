const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: ["เช็คเงิน"], //เช็คเงินทั้งหมดของคุณ
  description: "เช็คเงินในตัวคุณเเละในธนาคารของคุณ",
  category: "Economy",
  options: [
    {
      name: "เช็คของใครดี",
      description: "เลือกคนที่คุณจะเช็คเงิน",
      type: ApplicationCommandOptionType.User,
      required: false,
    }
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const loading = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
    const msg = await interaction.editReply({ embeds: [loading] });

    const member1 = interaction.options.getUser("เช็คของใครดี") || interaction.user;
    const mention = member1 ? member1.id : interaction.user.id;

    const bot = member1 ? member1.bot : interaction.user.bot;
    const cant_chackbot = new EmbedBuilder()
      .setColor("#bdc6e9")
      .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่สามาถเช็คเงินบอทได้`)
    if (bot)
    return msg.edit({ embeds: [cant_chackbot], ephemeral: false });

    const avatarURL = member1 ? member1.displayAvatarURL({ format: "png", size: 512 }).replace('.webp', '.png') : interaction.user.displayAvatarURL({ format: "png", size: 512 }).replace('.webp', '.png');

    /// Try to create new database went this member not have!
    await client.createHome(interaction.guild.id, mention) /// Can find this module in Handlers/loadCreate.js

    const user = await Member.findOne({ guild_id: interaction.guild.id, user_id: mention });

    const canvas = Canvas.createCanvas(1281, 756);
    const ctx = canvas.getContext('2d');

    const theirAvatar = await Canvas.loadImage(avatarURL);
    ctx.drawImage(theirAvatar, 96, 620, 79, 79);

    const background = await Canvas.loadImage(user.wallet_bg);
    ctx.drawImage(background, 0, 0, 1281, 756);

    ctx.font = 'blod 55px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${numberWithCommas(user.money)} บาท`, canvas.width / 2 + -230, canvas.height / 2 + -60);

    ctx.font = 'blod 55px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${numberWithCommas(user.bank)} บาท`, canvas.width / 2 + -230, canvas.height / 2 + 40);

    ctx.font = 'blod 55px "Kanit Medium"';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${numberWithCommas(user.money + user.bank)} บาท`, canvas.width / 2 + -230, canvas.height / 2 + 150);

    ctx.font = 'blod 50px "Kanit Medium"';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'start';
    ctx.fillText(`${member1.username}#${member1.discriminator}`, canvas.width / 2 + -450, canvas.height / 2 + 300);
    // height มาก =  ลง น้อย = ขึ้น
    // width มาก =  ขวา น้อย = ซ้าย

    ctx.font = 'blod 65px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'start';
    ctx.fillText(`standard`, canvas.width / 2 + 320, canvas.height / 2 + -200);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "wallet.png" })

    const embed = new EmbedBuilder()
      .setColor('#bdc6e9')
      .setDescription(`> **Viewing wallet card • [  ${member1} ] •**`)
      .setImage("attachment://wallet.png")

    const embed2 = new EmbedBuilder()
      .setColor('#bdc6e9')
      .setDescription(`Loading please wait...`)

      await msg.edit({ embeds: [embed2] });
      await wait(1000);
      await msg.edit({ embeds: [embed], files: [attachment] });
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}