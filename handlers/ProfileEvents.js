//// use node-cron 
const cron = require("node-cron");
const GPet = require("../settings/models/cradprofile.js");
const Canvas = require("@napi-rs/canvas");

module.exports = async (client) => {
    // 30 minutes hunger
    cron.schedule("*/10 * * * *", async () => {
        const pet = await GPet.find();
        for (const data of pet) {
            if (data.hungry > 0) {
                data.hungry -= 5;
                data.save();
            }
        }
        // if pet hungry is 0, pet hp will decrease
        const pet2 = await GPet.find();
        for (const data of pet2) {
            if (data.hungry === 0) {
                data.hp -= 2;
                data.save();
            }
        }
    });
    // 10 minutes // regem health
    cron.schedule("*/2 * * * *", async () => {
        const pet3 = await GPet.find();
        for (const data of pet3) {
            if (data.hungry === 100) {
                data.energy += 5;
            }
            if (data.energy > 100) {
                data.energy = 100;
            }
            data.save();
        }
    });
}

