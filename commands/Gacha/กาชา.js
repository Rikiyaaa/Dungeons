const Member = require("../../settings/models/profile.js");
const Ticket = require("../../settings/models/ticket.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../settings/defaults.js");
const delay = require("delay");

module.exports = { 
    name: ["เปิดกาชา"],
    description: "Gacha with your luck.",
    options: [
        {
            name: "x1",
            description: "เปิดกาชา 1 รอบ",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const ticket = await Ticket.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const cooldown = new Date(ticket.gacha_cooldown);
        const time = new Date(cooldown - new Date());
        const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที ${time.getUTCSeconds()} วิ`;

        if(ticket.gacha_cooldown > Date.now()) {
            const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return interaction.reply({ embeds: [embed_cooldown]});
        }

        const six_stars = config.gacha.six_stars;
        const five_stars = config.gacha.five_stars;
        const four_stars = config.gacha.four_stars;
        const three_stars = config.gacha.three_stars;

        if (interaction.options.getSubcommand() === "x1") {
           const pay_bots = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | เงินมึงไม่พอครับ มึงต้องมีเงิน ${numberWithCommas(config.gacha.gacha_price_one_round)} เพื่อเปิดกาชา`) 
            
        if (user.money < config.gacha.gacha_price_one_round) return interaction.editReply({ embeds: [pay_bots]});

        const store = [];

        for (let i = 0; i < 1; i++) {
        const getNumber = roll()
        switch(getNumber[0]) {
            case 6:
                store.push(
                    `> **\`x1\` ${six_stars[getNumber[1]]} • \`ระดับหายากชิบหาย\` <:734441009802641498:1023211671612829696>**
                    `);
                // Add Ticket 6 Star
                ticket.six_star_ticket += 1;
                break;
            case 5:
                store.push(
                    `> **\`x1\` ${five_stars[getNumber[1]]} • \`ระดับหายาก\` <:734441009710235648:1022032748887691325>**
                    `);
                // Add Ticket 5 Star
                ticket.five_star_ticket += 1;
                break;
            case 4:
                store.push(
                    `> **\`x1\` ${four_stars[getNumber[1]]} • \`ระดับปานกลาง\` <:734441009479417867:1022032746748596255>**
                    `);
                // Add Ticket 4 Star
                ticket.four_star_ticket += 1;
                break;
            case 3:
                store.push(
                    `> **\`x1\` ${three_stars[getNumber[1]]} • \`ระดับธรรมดา\` <:734441009810767883:1022032751039369288>**
                    `);
                // Add Ticket 4 Star
                ticket.three_star_ticket += 1;
                break;
            }
        }

        const pages = [];
        for (let i = 0; i < 1; i++) {
        const str = store.slice(i * 3, i * 3 + 3).join("");



        const embed = new EmbedBuilder()
        .setColor("#bdc6e9")
            .setAuthor({ name: "ยินดีด้วยคุณได้รับ!", iconURL: "https://i.imgur.com/xtbd3kb.gif" })
            .setDescription(str == "" ? " Nothing" : "\n" + str)
            .setThumbnail("https://i.imgur.com/0q7WNFK.gif")
            .setFooter({ text: `© Kitsakorn | Version Beta` });
            pages.push(embed);
        }
        const opening = new EmbedBuilder()
        .setColor("#36393d")
        .setDescription("**Opening...**")
        .setImage("https://cdn.discordapp.com/emojis/677420843076288522.gif?v=1")

        
        interaction.editReply({ embeds: [opening] });
        await delay(6000)
        interaction.editReply({ embeds: [pages[0]] });

        ticket.gacha_cooldown = Date.now() + (ticket.gacha_cooldown_time * 1000);
        user.money -= config.gacha.gacha_price_one_round;

        await ticket.save();
        await user.save();
        }

        if (interaction.options.getSubcommand() === "x10") {

        if (user.money < config.gacha.gacha_price_ten_round) return interaction.editReply(`You need ${numberWithCommas(config.gacha.gacha_price_ten_round)} coins to open gacha x10.`);
        const store = [];

        if (ticket.guarantee_five_star >= config.gacha.guarantee_five_star) {
            const random = Math.floor(Math.random() * config.gacha.five_stars.length);
            store.push(
                `\`🌟\` **Guarantee.** \`${five_stars[random]}\` \`⭐ ⭐ ⭐ ⭐ ⭐\`
                `);

            ticket.guarantee_six_star += 1;
            ticket.guarantee_five_star = 0;
            ticket.five_star_ticket += 1;
        } else if (ticket.guarantee_six_star >= config.gacha.guarantee_six_star)  {
            const random = Math.floor(Math.random() * config.gacha.six_stars.length);
            store.push(
                `\`🌟\` **Guarantee.** \`${six_stars[random]}\` \`⭐ ⭐ ⭐ ⭐ ⭐ ⭐\`
                `);

            ticket.guarantee_six_star = 0;
            ticket.guarantee_five_star += 1;
            ticket.six_star_ticket += 1;
        }

        for (let i = 0; i < 10; i++) {
        const getNumber = roll()
        switch(getNumber[0]) {
            case 6:
                store.push(
                    `**${i + 1}.** \`${six_stars[getNumber[1]]}\` \`⭐ ⭐ ⭐ ⭐ ⭐ ⭐\`
                    `);
                // Got 6 Stars = reset guarantee
                ticket.guarantee_six_star = 0;
                // Add +1 guarantee five star
                ticket.guarantee_five_star += 1;
                // Add Ticket 6 Star
                ticket.six_star_ticket += 1;
                break;
            case 5:
                store.push(
                    `**${i + 1}.** \`${five_stars[getNumber[1]]}\` \`⭐ ⭐ ⭐ ⭐ ⭐\`
                    `);
                // Add +1 guarantee six star
                ticket.guarantee_six_star += 1;
                // Got 5 Star = reset guarantee
                ticket.guarantee_five_star = 0;
                // Add Ticket 5 Star
                ticket.five_star_ticket += 1;
                break;
            case 4:
                store.push(
                    `**${i + 1}.** \`${four_stars[getNumber[1]]}\` \`⭐ ⭐ ⭐ ⭐\`
                    `);
                // Add +1 guarantee six star
                ticket.guarantee_six_star += 1;
                // Add +1 guarantee five star
                ticket.guarantee_five_star += 1;
                // Add Ticket 4 Star
                ticket.four_star_ticket += 1;
                break;
            case 3:
                store.push(
                    `**${i + 1}.** \`${three_stars[getNumber[1]]}\` \`⭐ ⭐ ⭐\`
                    `);
                // Add +1 guarantee six star
                ticket.guarantee_six_star += 1;
                // Add +1 guarantee five star
                ticket.guarantee_five_star += 1;
                // Add Ticket 4 Star
                ticket.three_star_ticket += 1;
                break;
            }
        }

        const pages = [];
        for (let i = 0; i < 1; i++) {
        const str = store.slice(i * 12, i * 12 + 12).join("");

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: "Result Open x10", iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(str == "" ? " Nothing" : "\n" + str)
            .setFooter({ text: `• Guarantee 5 Star ${config.gacha.guarantee_five_star - ticket.guarantee_five_star} | 6 Star ${config.gacha.guarantee_six_star - ticket.guarantee_six_star}` });

            pages.push(embed);
        }

        interaction.editReply({ embeds: [pages[0]] });

        ticket.gacha_cooldown = Date.now() + (ticket.gacha_cooldown_time * 1000);
        user.money -= config.gacha.gacha_price_ten_round;

        await ticket.save();
        await user.save();
    }

      //  const role = client.guilds.cache.get(interaction.guild.id).roles.cache.find(r => r.name === item);

      //  const alreadyHave = interaction.member.roles.cache.find(r => r.id === role.id);
      //  if(alreadyHave) return interaction.followUp("Dupicate item. you already have this item.");

      //  await interaction.member.roles.add(role);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roll() {
    const number = (Math.floor(Math.random() * 1000) + 1) * 0.1
    if (number <= 0.5) {
    const random = Math.floor(Math.random() * config.gacha.six_stars.length)
        return [6, random]
    } else if(number <= 1) {
        const random = Math.floor(Math.random() * config.gacha.five_stars.length)
        return [5, random]
    } else if(number <= 20) {
        const random = Math.floor(Math.random() * config.gacha.four_stars.length)
        return [4, random]
    } else if(number <= 60) {
        const random = Math.floor(Math.random() * config.gacha.three_stars.length)
        return [3, random]
    } else if(number <= 100) {
        const random = Math.floor(Math.random() * config.gacha.three_stars.length)
        return [3, random]
    }
}