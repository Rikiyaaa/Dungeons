const Member = require('../../settings/models/profile.js');
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const request = require('node-superfetch');
const { writeFileSync } = require('fs')
const { join } = require('path')
const Canvas = require('@napi-rs/canvas')

module.exports = { 
    name: ["ฝากเงิน"], //ฝากเงินเข้าธนาคารของคุณ
    description: "ฝากเงินเข้าธนาคารของคุณ",
    options: [
        {
            name: "จำนวนเงิน",
            description: "จำนวนเงินที่ต้องการฝาก",
            type: ApplicationCommandOptionType.String, /// 3 = String
            required: true,
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const loading = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)
      const msg = await interaction.editReply({ embeds: [loading] });
        const args = interaction.options.getString("จำนวนเงิน");

        const filters = [
            "+",
            "-"
        ];

        const cantdothat = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> |  โปรดพิมพ์จำนวนเงินที่ต้องการฝาก`)

        const amount_all = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | โปรดพิมพ์จำนวนเงินที่ต้องการฝากหรือพิมพ์ (ทั้งหมด) `)

        for (const message in filters) {
            if (args.includes(filters[message])) return msg.edit({ embeds: [cantdothat] });
        }
        
        if(args != parseInt(args) && args != "ทั้งหมด") return msg.edit({ embdes: [amount_all] });
        /// NEED AMOUNT AND ALL

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (args > user.money) {
            const nothavrmoneytodeposit = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | ไม่สามารถฝากเงินได้ มึงมีจำนวนเงินไม่พอที่จะฝาก `)

            return msg.edit({ embeds: [nothavrmoneytodeposit] });
        }

        const canvas = Canvas.createCanvas(579, 937);
        const ctx = canvas.getContext('2d');

        Canvas.GlobalFonts.registerFromPath(join(__dirname, '..', '..', 'font', 'pixellet.ttf' ), 'pixellet');

        const theirAvatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(theirAvatar, 118, 755, 92, 92);

        const theirAvatar3 = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(theirAvatar3, 350, 755, 92, 92);

        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background = await Canvas.loadImage('./assests/deposite3.png');
        ctx.drawImage(background, 0, 0, 579, 937);

        

        ctx.font = 'blod 35px pixellet';
        ctx.fillStyle = '#F2EFEC';
        ctx.textAlign = 'center';
        ctx.fillText(`${numberWithCommas(args)}.00 บาท`, canvas.width / 2 + 60, canvas.height / 2 + 218);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx.font = 'blod 27px sans-serif';
        ctx.fillStyle = '#322014';
        ctx.textAlign = 'start';
        ctx.fillText(`${interaction.user.username}#${interaction.user.discriminator}`, canvas.width / 2 + -148, canvas.height / 2 + 20);

        ctx.font = 'blod 30px pixellet';
        ctx.fillStyle = '#322014';
        ctx.textAlign = 'start';
        ctx.fillText(`ธนาคาร`, canvas.width / 2 + -148, canvas.height / 2 + 113);

        ctx.font = 'blod 23px pixellet';
        ctx.fillStyle = '#322014';
        ctx.textAlign = 'start';
        ctx.fillText(`${generateID("")}`, canvas.width / 2 + -65, canvas.height / 2 + -55);

        ctx.font = 'blod 23px pixellet';
        ctx.fillStyle = '#322014';
        ctx.textAlign = 'start';
        ctx.fillText(`${formatDate(new Date())} ${formatTime(new Date())}`, canvas.width / 2 + -240, canvas.height / 2 + -110);

        const attachment3 = new AttachmentBuilder(await canvas.encode("png"), { name: `deposite.png` })

        const canvas2 = Canvas.createCanvas(1163, 901);
        const ctx2 = canvas.getContext('2d');

        const theirAvatar1 = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx2.drawImage(theirAvatar1, 118, 755, 92, 92);

        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background2 = await Canvas.loadImage('./assests/deposite3.png');
        ctx2.drawImage(background2, 0, 0, 579, 937);

        

        ctx2.font = 'blod 35px pixellet';
        ctx2.fillStyle = '#F2EFEC';
        ctx2.textAlign = 'center';
        ctx2.fillText(`${numberWithCommas(args)}.00 บาท`, canvas2.width / 2 + 60, canvas2.height / 2 + 218);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx2.font = 'blod 27px sans-serif';
        ctx2.fillStyle = '#322014';
        ctx2.textAlign = 'start';
        ctx2.fillText(`${interaction.user.username}#${interaction.user.discriminator}`, canvas2.width / 2 + -148, canvas2.height / 2 + 20);

        ctx2.font = 'blod 30px pixellet';
        ctx2.fillStyle = '#322014';
        ctx2.textAlign = 'start';
        ctx2.fillText(`ธนาคาร`, canvas2.width / 2 + -148, canvas2.height / 2 + 113);

        ctx2.font = 'blod 23px pixellet';
        ctx2.fillStyle = '#322014';
        ctx2.textAlign = 'start';
        ctx2.fillText(`${generateID("")}`, canvas2.width / 2 + -65, canvas2.height / 2 + -55);

        ctx2.font = 'blod 23px pixellet';
        ctx2.fillStyle = '#322014';
        ctx2.textAlign = 'start';
        ctx2.fillText(`${formatDate(new Date())} ${formatTime(new Date())}`, canvas2.width / 2 + -240, canvas2.height / 2 + -110);

        const attachment4 = new AttachmentBuilder(await canvas2.encode("png"), { name: `deposite.png` })

        if (args.toLowerCase() == 'ทั้งหมด') { /// DEPOSIT ALL
            const embed = new EmbedBuilder()
                .setColor('#bdc6e9')
                .setDescription("<a:885814880031084574:1022032055598600223> | ฝากเงินสำเร็จ พิมพ์ ` /เช็คเงิน เพื่อเช็คเงิน `")
                .setImage("attachment://deposite.png")

                await  msg.edit({ embeds: [embed], files: [attachment4] });

            user.bank += user.money;
            user.money = 0;

            await user.save();
        } else { /// DEPOSIT AMOUNT
            user.bank += parseInt(args);
            user.money -= parseInt(args);

            const embed = new EmbedBuilder()
            .setColor('#bdc6e9')
            .setDescription("<a:885814880031084574:1022032055598600223> | ฝากเงินสำเร็จ พิมพ์ ` /เช็คเงิน เพื่อเช็คเงิน `")
            .setImage("attachment://deposite.png")

            await  msg.edit({ embeds: [embed], files: [attachment3] });

            await user.save();
        }
    }
}

function generateID(prefix) {
    return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatTime(date) {
  const hours12 = date.getHours();
  const minutes = date.getMinutes();
  const isAm = date.getHours();

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

function formatDate(date) {
  const DAYS = [
    "วันอาทิตย์",
    "วันจันทร์",
    "วันอังคาร",
    "วันพุธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์"
  ];
  const MONTHS = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ];

  return `${DAYS[date.getDay()]}, ที่ ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}