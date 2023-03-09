const { EmbedBuilder } = require("discord.js");
const Market = require("../../settings/models/market.js");

module.exports = {
    name: ["market"],
    description: "Get your daily quest.",
    category: "General",
    run: async (client, interaction) => {

        /// for test remove later

        const market = await Market.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const embed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("Market")
        .setDescription("Market Reset 00:00 Every Day")
        .addFields(
            { name: `${market.market[0].name}`, value: `ราคา : ${market.market[0].price}`, inline: false },
            { name: `${market.market[1].name}`, value: `ราคา : ${market.market[1].price}`, inline: false },
            { name: `${market.market[2].name}`, value: `ราคา : ${market.market[2].price}`, inline: false },
            { name: `${market.market[3].name}`, value: `ราคา : ${market.market[3].price}`, inline: false },
            { name: `${market.market[4].name}`, value: `ราคา : ${market.market[4].price}`, inline: false },
            { name: `${market.market[5].name}`, value: `ราคา : ${market.market[5].price}`, inline: false },
            { name: `${market.market[6].name}`, value: `ราคา : ${market.market[6].price}`, inline: false },
            { name: `${market.market[7].name}`, value: `ราคา : ${market.market[7].price}`, inline: false },
            { name: `${market.market[8].name}`, value: `ราคา : ${market.market[8].price}`, inline: false },
            { name: `${market.market[9].name}`, value: `ราคา : ${market.market[9].price}`, inline: false },
            
        )
        


        interaction.reply({ embeds: [embed] });
        
    }
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}