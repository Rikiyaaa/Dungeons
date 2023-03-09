const Member = require('../../settings/models/profile.js');
const Ticket = require('../../settings/models/ticket.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { LeadPage } = require("../../structures/Pagination.js");

module.exports = { 
    name: ["เช็คอันดับ"],
    description: "เช็คอันดับของคุณเเละคนอื่นๆ",
    options: [
        {
            name: "เงิน",
            description: "เช็คอันดับคนที่เงินมากที่สุด",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "เลือกหน้าอันดับ",
                    description: "เลือกหน้าต่างของอันดับ เลข (2) จะเป็นอันดับ 11-20",
                    type: ApplicationCommandOptionType.Integer, /// 4 = Integer
                    required: false
                }
            ]
        },
        {
            name: "กาชา",
            description: "เช็คอันดับคนที่สุ่มกาชามากที่สุด",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "เลือกหน้าอันดับ",
                    description: "เลือกหน้าต่างของอันดับ เลข (2) จะเป็นอันดับ 11-20",
                    type: ApplicationCommandOptionType.Integer, /// 4 = Integer
                    required: false
                }
            ]
        },
        {
            name: "คนกดใจ",
            description: "เช็คอันดับคนที่มีคนกดใจมากที่สุด",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "เลือกหน้าอันดับ",
                    description: "เลือกหน้าต่างของอันดับ เลข (2) จะเป็นอันดับ 11-20",
                    type: ApplicationCommandOptionType.Integer, /// 4 = Integer
                    required: false
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        if (interaction.options.getSubcommand() === "เงิน") {
            const args = interaction.options.getInteger("เลือกหน้าอันดับ");
            const user = await Member.find({ guild: interaction.guild.id });
        
            let pagesNum = Math.ceil(user.length / 10);
            if(pagesNum === 0) pagesNum = 1;

            /// Sort by Money
            user.sort((a, b) => {
                return b.money + b.bank - (a.money + a.bank);
            });

            const userStrings = [];
            for (let i = 0; i < user.length; i++) {
                const e = user[i];
                const fetch = await client.users.fetch(e.user);
                userStrings.push(
                    `**${i + 1}.** ${client.users.cache.get(fetch.id)} ${numberWithCommas(e.money + e.bank)} <a:844525261973618698:1022032206480277574>
                    `);
            }

            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = userStrings.slice(i * 10, i * 10 + 10).join('');

                const embed = new EmbedBuilder()
                    .setTitle("<a:839868606296752168:1022032049370042399> อันดับเงิน")
                    .setThumbnail("https://i.imgur.com/rlAE9dt.png")
                    .setColor("#bdc6e9")
                    .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                    .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ`});

                pages.push(embed);
            }

            if (!args) {
                if (pages.length == pagesNum && user.length > 10) LeadPage(client, interaction, pages, 120000, user.length);
                else return interaction.editReply({ embeds: [pages[0]] });
            }
            else {
                const embed5 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                const embed6 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                const pageNum = args == 0 ? 1 : args - 1;
                return interaction.editReply({ embeds: [pages[pageNum]] });
            }
        }

        if (interaction.options.getSubcommand() === "กาชา") {
            const args = interaction.options.getInteger("เลือกหน้าอันดับ");
            const user = await Ticket.find({ guild: interaction.guild.id });
        
            let pagesNum = Math.ceil(user.length / 10);
            if(pagesNum === 0) pagesNum = 1;

            /// Sort by Total Tickets
            user.sort((a, b) => {
                return (b.three_star_ticket + b.four_star_ticket) + (b.five_star_ticket + b.six_star_ticket) -  (a.three_star_ticket + a.four_star_ticket) + (a.five_star_ticket + a.six_star_ticket);
            });

            const userStrings = [];
            for (let i = 0; i < user.length; i++) {
                const e = user[i];
                const TotalTicket =  (e.three_star_ticket + e.four_star_ticket) + (e.five_star_ticket + e.six_star_ticket);
                const fetch = await client.users.fetch(e.user);
                userStrings.push(
                    `**${i + 1}.** ${client.users.cache.get(fetch.id)} ${TotalTicket} <a:734506839479156746:1022032045087674378>
                    `);
            }

            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = userStrings.slice(i * 10, i * 10 + 10).join('');

                const embed = new EmbedBuilder()
                .setTitle("<a:839868606296752168:1022032049370042399> อันดับกาชา")
                    .setThumbnail("https://i.imgur.com/gWAcawG.gif")
                    .setColor("#bdc6e9")
                    .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                    .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ`});

                pages.push(embed);
            }

            if (!args) {
                if (pages.length == pagesNum && user.length > 10) LeadPage(client, interaction, pages, 120000, user.length);
                else return interaction.editReply({ embeds: [pages[0]] });
            }
            else {
                const embed1 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                const embed2 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                if (isNaN(args)) return interaction.editReply({ embeds: [embed1]});
                if (args > pagesNum) return interaction.editReply({ embeds: [embed2]});
                const pageNum = args == 0 ? 1 : args - 1;
                return interaction.editReply({ embeds: [pages[pageNum]] });
            }
        }

        if (interaction.options.getSubcommand() === "คนกดใจ") {
            const args = interaction.options.getInteger("เลือกหน้าอันดับ");
            const user = await Member.find({ guild: interaction.guild.id });
        
            let pagesNum = Math.ceil(user.length / 10);
            if(pagesNum === 0) pagesNum = 1;

            /// Sort by Reputation
            user.sort((a, b) => {
                return b.reputation - a.reputation;
            });

            const userStrings = [];
            for (let i = 0; i < user.length; i++) {
                const e = user[i];
                const fetch = await client.users.fetch(e.user);
                userStrings.push(
                    `**${i + 1}.** ${client.users.cache.get(fetch.id)} ${e.reputation} <a:852279496911355924:1022032051525914696>
                    `);
            }

            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = userStrings.slice(i * 10, i * 10 + 10).join('');

                const embed = new EmbedBuilder()
                    .setTitle("<a:839868606296752168:1022032049370042399> อันดับคนกดใจ")
                    .setThumbnail("https://i.imgur.com/lCyAjTE.png")
                    .setColor("#bdc6e9")
                    .setDescription(`${str == '' ? '  No Users' : '\n' + str}`)
                    .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ`});

                pages.push(embed);
            }

            if (!args) {
                if (pages.length == pagesNum && user.length > 10) LeadPage(client, interaction, pages, 120000, user.length);
                else return interaction.editReply({ embeds: [pages[0]] });
            }
            else {
                const embed3 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                const embed4 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                if (isNaN(args)) return interaction.editReply({ embeds: [embed3] });
                if (args > pagesNum) return interaction.editReply({ embeds: [embed4] });
                const pageNum = args == 0 ? 1 : args - 1;
                return interaction.editReply({ embeds: [pages[pageNum]] });
            }
        }
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}