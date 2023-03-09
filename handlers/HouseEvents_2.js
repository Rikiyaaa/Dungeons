const Member = require('../settings/models/profile.js');
const { AttachmentBuilder} = require("discord.js");
const home = require('../settings/models/house.js');
const Canvas = require("@napi-rs/canvas");
const cron = require("node-cron");

module.exports = async (client) => {

    async function resetHome_nineteen_clock() {
        await home.updateMany({}, { $set: { nineteen_clock: true }});
        await home.updateMany({}, { $set: { six_clock: false }});
        
    }

    cron.schedule("0 19 * * *", async () => {
        resetHome_nineteen_clock(); // 7:00 pm
    });


   
}