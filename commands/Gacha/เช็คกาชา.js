const Ticket = require('../../settings/models/ticket.js');
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const request = require('node-superfetch');
const Canvas = require('@napi-rs/canvas');
const config = require("../../settings/defaults.js");

module.exports = { 
    name: ["เช็คของกาชา"],
    description: "เช็คกาชาของมึงเเละสามารถเช็คของคนอื่นได้ด้วย!",
    options: [
        {
            name: "ดูของใครดี",
            description: "เลือกคนที่มึงต้องการเช็ค",
            type: ApplicationCommandOptionType.User,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        const member = interaction.options.getUser("ดูของใครดี");

        const mention = member ? member.id : interaction.user.id;

        const bot = member ? member.bot : interaction.user.bot;
        const embed4 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | บอทมันสุ่มกาชาไม่ได้ครับน้อง`) 
        if (bot) return interaction.editReply({ embeds: [embed4] });

        const avatarURL = member ? member.displayAvatarURL({ format: "png", size: 512 }) : interaction.user.displayAvatarURL({ format: "png", size: 512 });
        const userTag = member ? member.tag : interaction.user.tag;
        const user2 = member ? member.username : interaction.user.username;

        /// Try to create new database went this member not have!
        await client.createHome(interaction.guild.id, interaction.user.id); /// Can find this module in Handlers/loadCreate.js

        const ticket = await Ticket.findOne({ guild: interaction.guild.id, user: mention });

        const TotalTickets = (ticket.three_star_ticket + ticket.four_star_ticket) + (ticket.five_star_ticket + ticket.six_star_ticket);

        const canvas = Canvas.createCanvas(1598, 1226);
        const ctx = canvas.getContext('2d');
        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background = await Canvas.loadImage('./assests/gacha.png');
        ctx.drawImage(background, 0, 0, 1598, 1226);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${ticket.three_star_ticket} อัน`, canvas.width / 2 + -400, canvas.height / 2 + -160);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${ticket.four_star_ticket} อัน`, canvas.width / 2 + 340, canvas.height / 2 + -160);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${ticket.five_star_ticket} อัน`, canvas.width / 2 + -400, canvas.height / 2 + 410);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${ticket.six_star_ticket} อัน`, canvas.width / 2 + 340, canvas.height / 2 + 410);

        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "lovemath.png" })

        const embed = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setAuthor({ name: `คลังกาชาของคุณ: ${user2}'s`, iconURL: avatarURL })
            .setDescription(`<:914365285446877294:1022032757188206642> | ลองพิมพ์คำสั่ง \` /เช็คอันดับ กาชา \` เพื่อดูอันดับของคุณ`)
            .setImage("attachment://lovemath.png")

        return interaction.editReply({ embeds: [embed], files: [attachment] });
    }
}