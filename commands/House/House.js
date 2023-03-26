const { EmbedBuilder,AttachmentBuilder  } = require("discord.js");
const GHome = require("../../settings/models/house.js")
const Canvas = require("@napi-rs/canvas");

module.exports = {
    name: ["house", "display"],
    description: "Display my home.",
    category: "House",
    run: async (client, interaction) => {

        await interaction.reply({ content: "Loading please wait...", components: [] });

        const homes = await GHome.find({guild: interaction.guild.id, user: interaction.user.id });
        const dataObjects = ["A_DATA", "B_DATA", "C_DATA", "D_DATA"];
        
        const emptyObjs = [];
        const housesWithNonEmptyObjs = [];
        
        if (homes?.length > 0) {
          for (const home of homes) {
            if (home && typeof home.house !== 'undefined') {
              let hasNonEmptyObj = false;
              for (const dataObj in dataObjects) {
                if (typeof home[dataObjects[dataObj]] === "object" && home[dataObjects[dataObj]] !== null && !Array.isArray(home[dataObjects[dataObj]])) {
                  for (const key in home[dataObjects[dataObj]]) {
                    if (home[dataObjects[dataObj]].hasOwnProperty(key)) {
                      const obj = home[dataObjects[dataObj]][key];
                      if (obj === "dogpoop_dogpoop.png") {
                        emptyObjs.push(key);
                      } else if (obj !== "") {
                        hasNonEmptyObj = true;
                      }
                    }
                  }
                }
              }
              if (hasNonEmptyObj) {
                housesWithNonEmptyObjs.push(home);
              }
            }
          }
        }
        
        if (emptyObjs.length > 0) {
            const canvas = Canvas.createCanvas(300, 300);
            const ctx = canvas.getContext("2d");
    
            const background = await Canvas.loadImage(`${housesWithNonEmptyObjs[0].house_poop}`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
            const windows = await Canvas.loadImage("./assests/windows.png");
            ctx.drawImage(windows, 0, 0, canvas.width, canvas.height);
    
            if (housesWithNonEmptyObjs[0].six_clock === true) {
                const six_clock = await Canvas.loadImage("./assests/windows_mooning.png");
                ctx.drawImage(six_clock, 0, 0, canvas.width, canvas.height);
            } else if (housesWithNonEmptyObjs[0].nineteen_clock === true) {
                const nineteen_clock = await Canvas.loadImage("./assests/windows_night.png");
                ctx.drawImage(nineteen_clock, 0, 0, canvas.width, canvas.height);
            } 
    
            const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: `house.png` })
    
            return interaction.editReply({ content: `> Viewing Your House • [  ${interaction.user.username}#${interaction.user.discriminator} ]`, files: [attachment] });
          } else if (emptyObjs.length === 0) {
            const canvas = Canvas.createCanvas(300, 300);
            const ctx = canvas.getContext("2d");
    
            const background = await Canvas.loadImage(`${housesWithNonEmptyObjs[0].house}`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
            const windows = await Canvas.loadImage("./assests/windows.png");
            ctx.drawImage(windows, 0, 0, canvas.width, canvas.height);
    
            if (housesWithNonEmptyObjs[0].six_clock === true) {
                const six_clock = await Canvas.loadImage("./assests/windows_mooning.png");
                ctx.drawImage(six_clock, 0, 0, canvas.width, canvas.height);
            } else if (housesWithNonEmptyObjs[0].nineteen_clock === true) {
                const nineteen_clock = await Canvas.loadImage("./assests/windows_night.png");
                ctx.drawImage(nineteen_clock, 0, 0, canvas.width, canvas.height);
            } 
    
            const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: `house.png` })
    
            return interaction.editReply({ content: `> Viewing Your House • [  ${interaction.user.username}#${interaction.user.discriminator} ]`, files: [attachment] });

          }
    }
}
