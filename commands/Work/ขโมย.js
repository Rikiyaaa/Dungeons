const Member = require('../../settings/models/profile.js');
const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const request = require('node-superfetch');
const Canvas = require('@napi-rs/canvas');
const config = require("../../settings/defaults.js");

module.exports = { 
    name: ["ขโมย"], //ขโมย
    description: "ขโมยเงินของคนอื่น โอกาศโดนจับ 50/50",
    options: [
        {
            name: "ขโมยใครดี",
            description: "เลือกคนที่คุณต้องการขโมย",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const rob_yourself = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่สามารถขโมยตัวเองได้`)

        const rob_bots = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มึงไม่สามารถขโมยบอทได้`)        

        const member = interaction.options.getUser("ขโมยใครดี") || interaction.member;
        if (member.id === interaction.user.id) return interaction.editReply({ embeds: [rob_yourself] });
        if (member.bot) return interaction.editReply({ embeds: [rob_bots] });

        /// Try to create new database went this member not have!
        await client.createHome(interaction.guild.id, interaction.user.id); /// Can find this module in Handlers/loadCreate.js

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (user && user.rob) {
            const cooldown = new Date(user.rob_cooldown);
            const time = new Date(cooldown - new Date());
            const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที ${time.getUTCSeconds()} วิ`;
    
            if(user.rob_cooldown > Date.now()) {
                const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return interaction.editReply({ embeds: [embed_cooldown]});
            }

            const target = await Member.findOne({ guild: interaction.guild.id, user: member.id });
            if (!target) {
                const nothavemoney = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | คุณ ${member} มีเงินไม่พอให้คุณขโมย`) 

                    interaction.editReply({ embeds: [nothavemoney] });
                return;
            }

        

            const chance = Math.floor(Math.random() * 100);
            if (chance > config.general.rob_chance) {
                const lostmoney = Math.floor(target.money / 2);

                const canvas = Canvas.createCanvas(1902, 365);
        const ctx = canvas.getContext('2d');

        const theirAvatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(theirAvatar, 92, 130, 140, 140);

        const theirAvatar2 = await Canvas.loadImage(member.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx.drawImage(theirAvatar2, 1150, 130, 140, 140);
        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background = await Canvas.loadImage('./assests/rob.png');
        ctx.drawImage(background, 0, 0, 1902, 365);

        ctx.font = 'blod 40px sans-serif';
        ctx.fillStyle = '#45C666';
        ctx.textAlign = 'start';
        ctx.fillText(`+ ${numberWithCommas(lostmoney)} บาท`, canvas.width / 2 + -730, canvas.height / 2 + -110);

        ctx.font = 'blod 40px sans-serif';
        ctx.fillStyle = '#C20C0C';
        ctx.textAlign = 'start';
        ctx.fillText(`- ${numberWithCommas(lostmoney)} บาท`, canvas.width / 2 + 400, canvas.height / 2 + -110);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'start';
        ctx.fillText(`${interaction.user.username}`, canvas.width / 2 + -700, canvas.height / 2 + 50);

        ctx.font = 'blod 60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'start';
        ctx.fillText(`${member.username}`, canvas.width / 2 + 350, canvas.height / 2 + 50);

        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "rob.png" })

                const embed = new EmbedBuilder()
                .setColor('#bdc6e9')
                .setImage("attachment://rob.png")
                .setDescription("<a:885814880031084574:1022032055598600223> | ยินดีด้วยคุณปล้นสำเร็จ <a:885955796830134282:1022032059105034250>")

                await  interaction.editReply({ embeds: [embed], files: [attachment] });
                //    .setColor(client.color)
                //    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                //    .setDescription(`You successfully robbed ${member} of ${numberWithCommas(lostmoney)} coins!`)
                //    .setTimestamp();

                //    interaction.editReply({ embeds: [embed] });

                user.money += lostmoney;
                user.rob_cooldown = Date.now() + (user.rob_cooldown_time * 1000);
                await user.save();

                target.money -= lostmoney;
                await target.save();
            } else {
                const lostmoney = Math.floor(target.money / 2);

                const canvas2 = Canvas.createCanvas(1902, 365);
        const ctx2 = canvas2.getContext('2d');

        const theirAvatar1 = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx2.drawImage(theirAvatar1, 92, 130, 140, 140);

        const theirAvatar3 = await Canvas.loadImage(member.displayAvatarURL({ format: 'png', size: 512 }).replace('.webp', '.png'));
        ctx2.drawImage(theirAvatar3, 1150, 130, 140, 140);
        // 67, 32, 120, 120

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 
        
        // 120x120 ขนาด

        const background2 = await Canvas.loadImage('./assests/robfail.png');
        ctx2.drawImage(background2, 0, 0, 1902, 365);

        ctx2.font = 'blod 40px sans-serif';
        ctx2.fillStyle = '#C20C0C';
        ctx2.textAlign = 'start';
        ctx2.fillText(`- ${numberWithCommas(lostmoney)} บาท`, canvas2.width / 2 + -730, canvas2.height / 2 + -110);

        ctx2.font = 'blod 40px sans-serif';
        ctx2.fillStyle = '#45C666';
        ctx2.textAlign = 'start';
        ctx2.fillText(`+ ${numberWithCommas(lostmoney)} บาท`, canvas2.width / 2 + 400, canvas2.height / 2 + -110);
        // height มาก =  ลง น้อย = ขึ้น
        // width มาก =  ขวา น้อย = ซ้าย

        ctx2.font = 'blod 60px Verdana';
        ctx2.fillStyle = '#ffffff';
        ctx2.textAlign = 'start';
        ctx2.fillText(`${interaction.user.username}`, canvas2.width / 2 + -700, canvas2.height / 2 + 50);

        ctx2.font = 'blod 60px Verdana';
        ctx2.fillStyle = '#ffffff';
        ctx2.textAlign = 'start';
        ctx2.fillText(`${member.username}`, canvas2.width / 2 + 350, canvas2.height / 2 + 50);

        const attachmentfail = new AttachmentBuilder(await canvas.encode("png"), { name: "all.png" })

                const embed = new EmbedBuilder()
                .setColor('#bdc6e9')
                .setImage("attachment://all.png")
                .setDescription("<a:907824800192397392:1022032199836512330> | เสียใจด้วยคุณปล้นไม่สำเร็จ โอกาสหน้าเอาใหม่")

                await  interaction.editReply({ embeds: [embed], files: [attachmentfail] });

                //const embed = new EmbedBuilder()
                //    .setColor(client.color)
              //      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
               //     .setDescription(`You failed to rob ${member}! They got away with ${numberWithCommas(lostmoney)} coins!`)
                //    .setTimestamp();

                //    interaction.editReply({ embeds: [embed] });

                user.money -= lostmoney;
                user.rob_cooldown = Date.now() + (user.rob_cooldown_time * 1000);
                await user.save();
            }

        } else {
            const notrob = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription(`<a:907824800192397392:1022032199836512330> | คุณไม่สามารถขโมยเงินได้ \nเนื่องจาก: ไม่มีบัตรขโมย  \` พิมพ์ /รายการสินค้า \``)
            

            interaction.editReply({ embeds: [notrob] });
            return;
        }
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}