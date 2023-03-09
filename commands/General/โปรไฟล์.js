const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const request = require('node-superfetch');
const Canvas = require('@napi-rs/canvas');
const Member = require("../../settings/models/profile.js");
const Ticket = require("../../settings/models/ticket.js");
const config = require("../../settings/defaults.js");

module.exports = { 
    name: ["โปรไฟล์"],
    description: "ดูโปรไฟล์ของคุณเเละคนอื่นๆได้!",
    options: [
        {
            name: "ดูของใครดี",
            description: "เลือกคนที่คุณต้องการจะดูโปรไฟล์",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const member = interaction.options.getUser("ดูของใครดี");

        const mention = member ? member.id : interaction.user.id;
        /// Can't check bots
        const bot = member ? member.bot : interaction.user.bot;
        const cantdothat = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่สามารถเช็คโปรไฟล์บอทได้ครับน้อง`)
        if (bot) return interaction.editReply({ embeds: [cantdothat]})

        const avatarURL = member ? member.displayAvatarURL({ format: "png", size: 512 }).replace('.webp', '.png') : interaction.user.displayAvatarURL({ format: "png", size: 512 }).replace('.webp', '.png');
        const userTag = member ? member.tag : interaction.user.tag;
        const userUsername = member ? member.username : interaction.user.username;

        ///// NOT FINISHED ADD MORE SOON!

        /// Try to create new database went this member not have!
        await client.createHome(interaction.guild.id, interaction.user.id); /// Can find this module in Handlers/loadCreate.js

        const user = await Member.findOne({ guild: interaction.guild.id, user: mention });

        const ticket = await Ticket.findOne({ guild: interaction.guild.id, user: mention });
        const TotalTickets = (ticket.common_ticket + ticket.uncommon_ticket) + (ticket.rare_ticket + ticket.epic_ticket) + (ticket.legendary_ticket + ticket.mythical_ticket);

        const randomtip = [
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /เก็บผลไม้ ` เพื่อเก็บผลไม้หาเงิน (งานขาว)", 
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /ตกปลา ` เพื่อตกปลาหาเงิน (งานขาว)", 
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /เช็คเงิน ` เพื่อเช็คเงินในตัวคุณ", 
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /ขายตัว ` เพื่อหาเงิน (มีโอกาศโดนจับ)",
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /เปิดกาชา ` เพื่อสุ่มหาของในกาชา",
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /ส่งยา เพื่อหาเงิน ` (มีโอกาศโดนจับ)",
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /เช็คอันดับ เงิน ` เพื่อดูอันดับเงินของคุณ",
            "<a:771063357620092969:1022032047327424523> | ลองพิมพ์ ` /เเฟน <ขอคบ / ขอเลิก> `",
        ];

        const tip = randomtip[Math.floor(Math.random() * randomtip.length)];

        if(user.married_to && !client.users.cache.get(user.married_to)){
            await client.users.fetch(user.married_to, true);
        }

        const Lover = !user.married_to ? "ไม่มีเเฟน :(" : client.users.cache.get(user.married_to).username;

        const canvas = Canvas.createCanvas(1463, 1793);
        const ctx = canvas.getContext('2d');

     //   const theirAvatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
      //  ctx.drawImage(theirAvatar, 155, 117, 250, 250);

      const theirAvatar1 = await Canvas.loadImage(avatarURL);
      ctx.drawImage(theirAvatar1, 130, 299, 420, 420);
        
        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background = await Canvas.loadImage('./assests/profile.png');
        ctx.drawImage(background, 0, 0, 1463, 1793);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx.font = 'blod 80px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'start';
        ctx.fillText(`${userUsername}`, canvas.width / 2 + -150, canvas.height / 2 + -355);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${user.rank}`, canvas.width / 2 + 350, canvas.height / 2 + 750);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${Lover}`, canvas.width / 2 + 350, canvas.height / 2 + 150);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${user.reputation} ดวง`, canvas.width / 2 + 350, canvas.height / 2 + 450);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

     //   ctx.font = 'blod 60px sans-serif';
     //   ctx.fillStyle = '#ffffff';
     //   ctx.textAlign = 'start';
     //   ctx.fillText(`${clan ? clan.clan_name : "ไม่มีเเก๊ง"} Lvl.${clan ? clan.clan_level : "0"}`, canvas.width / 2 + -570, canvas.height / 2 + 750);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'start';
        ctx.fillText(`${numberWithCommas(user.money + user.bank)} บาท`, canvas.width / 2 + -600, canvas.height / 2 + 450);

        ctx.font = 'blod 50px Verdana';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'start';
        ctx.fillText(`${mention}`, canvas.width / 2 + -600, canvas.height / 2 + 140);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "profile.png" })

        const embed = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`${tip}`)
            .setImage("attachment://profile.png")
            .setFooter({ text: `© Kitsakorn | Version Beta` })

        return interaction.editReply({ embeds: [embed], files: [attachment] });

    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}