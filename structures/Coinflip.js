const Coinflip = require("../settings/models/coinflip.js");
const Member = require("../settings/models/profile.js");
const  { EmbedBuilder } = require("discord.js");

const giveMoney_coinflip = async (guildId, player, amount) => {
    const db = await Member.findOne({ guild: guildId, user: player });
    db.money += amount;
    await db.save();

    return giveMoney_coinflip;
}

const pushArray_coinflip = async (guildId, player, amount, space) => {
    const db = await Coinflip.findOne({ guild: guildId });

    db.data.push(`<@${player}> **+${amount}** | Place on: **${space}**`)

    await db.save();

    return pushArray_coinflip;
}

const payoutWinners_coinflip = async (guildId) => {
    const db = await Coinflip.findOne({ guild: guildId });

    for (let i = 0; i < db.history.length; i++) {
        /// Print

        const amount = db.history[i].bet;
        const type = db.history[i].place;
        const player = db.history[i].author;
    
        const place = db.space;

        if (type == place) { /// Support only red & black & green
            // give x2 multipier
            if (type == "heads") {
                // give x2 multipier
                const formatMoney = amount * 2;

                await giveMoney_coinflip(guildId, player, formatMoney);
                await pushArray_coinflip(guildId, player, formatMoney, type);
            } else if (type == "tails") {
                // give x2 multipier
                const formatMoney = amount * 2;

                await giveMoney_coinflip(guildId, player, formatMoney);
                await pushArray_coinflip(guildId, player, formatMoney, type);
            }
        }
    }

    return payoutWinners_coinflip;
}

const sendMsg_coinflip = async (interaction, guildId) => {
    const db = await Coinflip.findOne({ guild: guildId });

    const place = db.space;
    const str = db.data.join("\n")

    const embed = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setDescription(`**loading....**`)
      
    const initialMsg = await interaction.channel.send({ embeds: [embed], });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 4 seconds
    const embed6 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setAuthor({ name: `Place: ${place}` })
        .setDescription(`**คนที่ชนะ:** \n${str || "ไม่มี :("}\n`)

    await initialMsg.edit({ embeds: [embed6], });
    await new Promise(resolve => setTimeout(resolve, 25000)); // Wait for 4 seconds
    await initialMsg.delete();

    return sendMsg_coinflip;
}

const getResult_coinflip = async (guildId) => {
    const db = await Coinflip.findOne({ guild: guildId });

    const coins = ["หัว", "ก้อย"];

    const result = coins[Math.floor(Math.random() * coins.length)];

    db.space = result;

    await db.save();

    return getResult_coinflip;
}

const betSave_coinflip = async (guildId, space, money, userId) => {
    const db = await Coinflip.findOne({ guild: guildId });
    const data = {
        place: space,
        bet: money,
        author: userId
    };
    db.history.push(data);
    await db.save();

    return betSave_coinflip;
}

const revMoney_coinflip = async (guildId, userId, money) => {
    const db = await Member.findOne({ guild: guildId, user: userId });
    db.money -= parseInt(money);
    await db.save();

    return revMoney_coinflip;
}


module.exports = { betSave_coinflip, revMoney_coinflip, getResult_coinflip, payoutWinners_coinflip, sendMsg_coinflip };