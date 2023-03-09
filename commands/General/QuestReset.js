const { EmbedBuilder } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const GProfile = require("../../settings/models/profile.js");

module.exports = {
    name: ["quest", "reset"],
    description: "Reset daily quest.",
    category: "General",
    run: async (client, interaction) => {

        const quest_list = [
            {
                type: "message",
                name: "Talk with friends.",
                current: 0,
                goal: 5,
                reward: 15000
            },
            {
                type: "feed",
                name: "Feed your pet.",
                current: 0,
                goal: 2,
                reward: 25000
            },
            {
                type: "edit",
                name: "Edit you house.",
                current: 0,
                goal: 1,
                reward: 25000
            }
        ];
        await GProfile.updateMany({}, { $set: { quest: [] }});
        await GProfile.updateMany({}, { $set: { quest: quest_list }});
        interaction.reply("All User has reset daily quest.");
    }
}