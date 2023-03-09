const GQuest = require('../settings/models/profile.js'); 
const Member = require('../settings/models/profile.js');
const cron = require("node-cron");

module.exports = async (client) => {
    async function resetQuest() {
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

        await GQuest.updateMany({}, { $set: { quest: [] }});
        await GQuest.updateMany({}, { $set: { quest: quest_list }});
        await Member.updateMany({}, { $set: { lucky_get: false }});
    }

    cron.schedule("0 0 * * *", async () => {
        resetQuest();
    });
}