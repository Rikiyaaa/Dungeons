const GMarket = require('../settings/models/market.js');
const config = require("../settings/defaults.js");
const cron = require("node-cron");

module.exports = async (client) => {
    async function resetMarket() {


        //random number 1-300
        const fish_price = Math.floor(Math.random() * 300) + 1;
        const fish_price2 = Math.floor(Math.random() * 300) + 1;
        const fish_price3 = Math.floor(Math.random() * 300) + 1;
        const fish_price4 = Math.floor(Math.random() * 300) + 1;
        const fish_price5 = Math.floor(Math.random() * 300) + 1;
        const fish_price6 = Math.floor(Math.random() * 300) + 1;

        //

        const fruit_price = Math.floor(Math.random() * 300) + 1;
        const fruit_price2 = Math.floor(Math.random() * 300) + 1;
        const fruit_price3 = Math.floor(Math.random() * 300) + 1;
        const fruit_price4 = Math.floor(Math.random() * 300) + 1;

        const resetMarket = [
              {
                name: "Catfish",
                price: fish_price,
              },
              {
                name: "Salmon",
                price: fish_price2,
              },
              {
                name: "Cod",
                price: fish_price3,
              },
              {
                name: "Pufferfish",
                price: fish_price4,
              },
              {
                name: "Squid",
                price: fish_price5,
              },
              {
                name: "Dolphin",
                price: fish_price6,
              },
              {
                name: "Cherry",
                price: fruit_price,
              },
              {
                name: "Watermelon",
                price: fruit_price2,
              },
              {
                name: "Lemon",
                price: fruit_price3,
              },
              {
                name: "Grape",
                price: fruit_price4,
              },
              
        ];

        console.log(resetMarket)

       await GMarket.updateMany({}, { $set: { market: [] }});
       await GMarket.updateMany({}, { $set: { market: resetMarket }});
    }

    cron.schedule("0 0 * * *", async () => {
        resetMarket();
    });
}