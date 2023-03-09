const Member = require("../../settings/models/profile.js");
const Ticket = require("../../settings/models/ticket.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../settings/defaults.js");
const delay = require("delay");

module.exports = { 
    name: ["capsules"],
    description: "Gacha with your luck.",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
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