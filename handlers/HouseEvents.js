const Member = require('../settings/models/profile.js');
const { AttachmentBuilder} = require("discord.js");
const home = require('../settings/models/house.js');
const Canvas = require("@napi-rs/canvas");
const cron = require("node-cron");

module.exports = async (client) => {

    async function resetHome_six_oclock() {
        await home.updateMany({}, { $set: { six_clock: true }});
        await home.updateMany({}, { $set: { nineteen_clock: false }});
        
    }

    cron.schedule("0 6 * * *", async () => {
        resetHome_six_oclock(); // 6:00 am
    });

   
}