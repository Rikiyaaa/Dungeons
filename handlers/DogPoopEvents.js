const GPet = require('../settings/models/pet.js');
const { AttachmentBuilder} = require("discord.js");
const GHome = require('../settings/models/house.js');
const Canvas = require("@napi-rs/canvas");
const cron = require("node-cron");
const { replaceHouse_Poop } = require("../structures/replace_poop.js");

module.exports = async (client) => {
  
    async function DogPoopEvents() {

        const homes = await GHome.find({});
        const dataObjects = ["A_DATA", "B_DATA", "C_DATA", "D_DATA"];
        
        for (const home of homes) {
          const emptyObjs = [];
          for (const dataObj in dataObjects) {
            if (typeof home[dataObjects[dataObj]] === "object" && home[dataObjects[dataObj]] !== null && !Array.isArray(home[dataObjects[dataObj]])) {
              for (const key in home[dataObjects[dataObj]]) {
                if (home[dataObjects[dataObj]].hasOwnProperty(key)) {
                  const obj = home[dataObjects[dataObj]][key];
                  if (obj === "") {
                    emptyObjs.push(key);
                  } else if (obj !== ""){

                  }
                }
              }
            }
          }
        
          if (emptyObjs.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyObjs.length);
            const randomObj = emptyObjs[randomIndex];
            const dataObj = randomObj[1];

            //////
            const Right = "R"
            const Left = "L"
            const Number = randomObj[2]
            //////
            console.log(`${randomObj} is empty in ${dataObj}_DATA`);

            const DATA = dataObj + "_DATA";
            ////////////////////////////
            const R_TRUE = Right + dataObj + Number
            const L_TRUE = Left + dataObj + Number
            ////////////////////////////
            const canvas = Canvas.createCanvas(300, 300);
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const place_on = await Canvas.loadImage(`${home.house}`);
            ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place

            home[DATA][randomObj] = `dogpoop_dogpoop.png`

            await replaceHouse_Poop (client, ctx, home)

            const build = new AttachmentBuilder(await canvas.encode("png"), { name: `dogpoop.png` })
             // Replace with the ID of the channel you want to send the image to
            const channel_list = ["1021744464550703195","1064131707667746837","1021744564031193211","1021744526081138728"]
            const channel = client.channels.cache.get(channel_list[Math.floor(Math.random() * channel_list.length)]);
            const sentMessage = await channel.send({ files: [build] });
            sentMessage.delete();

            home.house_poop = sentMessage.attachments.first().url;

            await home.save();
            console.log(`${randomObj} is now filled in ${dataObj}_DATA`);
          }
        }
        
    }

    var task = cron.schedule('*/90 * * * *', () =>  {
        DogPoopEvents(); 
    });

    task.start();

   
}