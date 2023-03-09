const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require("@napi-rs/canvas");
const request = require('node-superfetch');

module.exports = {
    name: ["หาเเฟน"],
    description: "หาคู่ หาเเฟน หาอะไรก็เรื่องของมึง.",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const loading = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...`)  
        const msg = await interaction.editReply({ embeds: [loading] }); 

        const member_raw = await interaction.guild.members.fetch();
        const all_member = new Array();
        member_raw.forEach(m => all_member.push(m));
        const member = all_member[Math.floor(Math.random() * all_member.length)].user;

        const love = Math.floor(Math.random() * 100) + 1;

        const canvas = Canvas.createCanvas(500, 250);
        const ctx = canvas.getContext('2d');

        const theirAvatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(theirAvatar, 30, 25, 220, 220);

        const myAvatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(myAvatar, 250, 25, 220, 220);
        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background = await Canvas.loadImage('./assests/lovemath.png');
        ctx.drawImage(background, 184, 100, 150, 70);

        ctx.font = 'blod 25px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`${love}%`, canvas.width / 2 + 10, canvas.height / 2 + 25);

        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "lovemath.png" })

        const embed = new EmbedBuilder()
        .setColor('#F6C6EA')
        .setDescription(`${interaction.user} 💘 \` ${member.tag} \``)
        .setImage("attachment://lovemath.png")

        return  msg.edit({ embeds: [embed], files: [attachment] });
    }

     
}