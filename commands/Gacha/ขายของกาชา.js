const Ticket = require("../../settings/models/ticket.js");
const Member = require("../../settings/models/profile.js");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const config = require("../../settings/defaults.js");

module.exports = { 
    name: ["ขายของกาชา"],
    description: "ขายกาชาในตัวคุณ",
    options: [
                {
                    name: "เลือกไอเท็ม",
                    description: "เลือกไอเท็มที่คนต้องการขาย",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: "ระดับธรรมดา",
                            value: "three_star"
                        },
                        {
                            name: "ระดับปานกลาง",
                            value: "four_star"
                        },
                        {
                            name: "ระดับหายาก",
                            value: "five_star"
                        },
                        {
                            name: "ระดับหายากชิบหาย",
                            value: "six_star"
                        }
                    ]
                },
                {
                    name: "จำนวนที่จะขาย",
                    description: "เลือกจำนวนไอเท็มที่คุณต้องการจะขาย",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

            const amount = interaction.options.getInteger("จำนวนที่จะขาย");

            if (interaction.options._hoistedOptions.find(c => c.value === "three_star")) {
                const user2 = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const user = await Ticket.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                // format example 1 = 10 * คูณ 
                const format = config.exchange.three_to_four * amount;
                const tickmat = amount;
                const embed1 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มึงกาชาระดับธรรมดาของมึง ไม่ถึง ${amount} อัน`)

                if (tickmat > user.three_star_ticket) return interaction.editReply({ embeds: [embed1] });
                
                user.three_star_ticket -= amount;
                user2.money += format;

                await user.save();
                await user2.save();

                const embed5 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:885814880031084574:1022032055598600223> | **ขายกาชาเสร็จสิ้นเรียบร้อย\n__รายระเอียด:__\n> \` - \` ${amount} อัน • กาชาระดับธรรมดา<:734441009810767883:1022032751039369288>\n> \` + \` ${format} บาท <a:844525261973618698:1022032206480277574>**`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1021744619396018246/1023212723938537542/73696e022df7cd5cb3d999c6875361dd.gif')

                interaction.editReply({ embeds: [embed5] })

            }

            if (interaction.options._hoistedOptions.find(c => c.value === "four_star")) {
                const user = await Ticket.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                const user2 = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id })
                // format example 1 = 10 * คูณ 
                const format = config.exchange.four_to_four * amount;
                const tickmat = amount;
                const embed2 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | กาชาระดับปานกลางของมึง ไม่ถึง ${amount} อัน`)

                if (tickmat > user.four_star_ticket) return interaction.editReply({ embeds: [embed2] });
                
                user.four_star_ticket -= amount;
                user2.money += format;

                await user.save();
                await user2.save();
                const embed5 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:885814880031084574:1022032055598600223> | **ขายกาชาเสร็จสิ้นเรียบร้อย\n__รายระเอียด:__\n> \` - \` ${amount} อัน • กาชาระดับปานกลาง<:734441009479417867:1022032746748596255>\n> \` + \` ${format} บาท <a:844525261973618698:1022032206480277574>**`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1021744619396018246/1023212723938537542/73696e022df7cd5cb3d999c6875361dd.gif')

                interaction.editReply({ embeds: [embed5] })


            }

            if (interaction.options._hoistedOptions.find(c => c.value === "five_star")) {
                const user = await Ticket.findOne({ guild: interaction.guild.id, guild: interaction.user.id });
                const user2 = await Member.findOne({ guild: interaction.guild.id, guild: interaction.user.id })
                // format example 1 = 10 * คูณ 
                const format = config.exchange.five_to_four * amount;
                const tickmat = amount;
                const embed3 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | กาชาระดับหายากของมึง ไม่ถึง ${amount} อัน`)

                if (tickmat > user.five_star_ticket) return interaction.editReply({ embeds: [embed3] });
                
                user.five_star_ticket -= amount;
                user2.money += format;

                await user.save();
                await user2.save();
                const embed5 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:885814880031084574:1022032055598600223> | **ขายกาชาเสร็จสิ้นเรียบร้อย\n__รายระเอียด:__\n> \` - \` ${amount} อัน • กาชาระดับหายาก<:734441009710235648:1022032748887691325>\n> \` + \` ${format} บาท <a:844525261973618698:1022032206480277574>**`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1021744619396018246/1023212723938537542/73696e022df7cd5cb3d999c6875361dd.gif')

                interaction.editReply({ embeds: [embed5] })

            }

            if (interaction.options._hoistedOptions.find(c => c.value === "six_star")) {
                const user = await Ticket.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                const user2 = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                // format example 1 = 10 * คูณ 
                const format = config.exchange.six_to_six * amount;
                const tickmat = amount;
                const embed4 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | กาชาระดับหายากชิบหายของมึง ไม่ถึง ${amount} อัน`)

                if (tickmat > user.six_star_ticket) return interaction.editReply({ embeds: [embed4] });
                
                user.six_star_ticket -= amount;
                user2.money += format;
// <a:885814880031084574:1022032055598600223>
                await user.save();
                await user2.save();

                const embed5 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:885814880031084574:1022032055598600223> | **ขายกาชาเสร็จสิ้นเรียบร้อย\n__รายระเอียด:__\n> \` - \` ${amount} อัน • กาชาระดับหายากชิบหาย<:734441009802641498:1023211671612829696>\n> \` + \` ${format} บาท <a:844525261973618698:1022032206480277574>**`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1021744619396018246/1023212723938537542/73696e022df7cd5cb3d999c6875361dd.gif')

                interaction.editReply({ embeds: [embed5] })

            }




    }
}