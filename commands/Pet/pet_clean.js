const { EmbedBuilder, ActionRowBuilder , ButtonBuilder, ButtonStyle, AttachmentBuilder} = require("discord.js");
const GPet = require("../../settings/models/pet.js");
const GHome  = require("../../settings/models/house.js");
const Canvas = require("@napi-rs/canvas");
const delay = require("delay");
const { replaceHouse } = require("../../structures/replace.js");
const { replaceHouse_Poop } = require("../../structures/replace_poop.js");

module.exports = {
    name: ["pet", "clean"],
    description: "Clean poop from your pet.",
    category: "Pet",
    run: async (client, interaction) => {
        await interaction.reply({ content: "Loading please wait...", components: [], ephemeral: true });
        
        const pet = await GPet.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        if(!pet) return interaction.editReply("You don't have a pet yet.");

        const PoopInHouse = [];

        const ishomes = await GHome.find({ guild: interaction.guild.id, user: interaction.user.id });

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("confirm_clean")
                .setLabel("Confirm")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("cancel_clean")
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger),
            )

        const dataObjects = ["A_DATA", "B_DATA", "C_DATA", "D_DATA"];
        if (ishomes && ishomes.length > 0) {
        for (const home of ishomes) {
          for (const dataObj in dataObjects) {
            if (typeof home[dataObjects[dataObj]] === "object" && home[dataObjects[dataObj]] !== null && !Array.isArray(home[dataObjects[dataObj]])) {
              for (const key in home[dataObjects[dataObj]]) {
                if (home[dataObjects[dataObj]].hasOwnProperty(key)) {
                  const obj = home[dataObjects[dataObj]][key];
                  if (obj === "dogpoop_dogpoop.png") {
                    PoopInHouse.push(key);
                  } else if (obj !== "dogpoop_dogpoop.png"){

                  }
                }
              }
            }
            }
        } 
      }

      if (PoopInHouse.length > 0) {
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Pet`)
            .setDescription((
                ` \`\`\`fix\n${PoopInHouse}\`\`\`
                `))
            .setColor(client.color)
      
        await interaction.editReply({ content: " ", embeds: [embed], components: [button], ephemeral: true });
      } else {
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Pet`)
            .setDescription(("No poop found in the house!"))
            .setColor(client.color)
      
        await interaction.editReply({ content: " ", embeds: [embed], components: [], ephemeral: true });
      }

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
    
                if(menu.customId === "confirm_clean") {
                  await menu.deferUpdate();
                  for (const home of ishomes) {
                    for (const dataObj in dataObjects) {
                      if (typeof home[dataObjects[dataObj]] === "object" && home[dataObjects[dataObj]] !== null && !Array.isArray(home[dataObjects[dataObj]])) {
                        for (const key in home[dataObjects[dataObj]]) {
                          if (home[dataObjects[dataObj]].hasOwnProperty(key)) {
                            const obj = home[dataObjects[dataObj]][key];
                            if (obj === "dogpoop_dogpoop.png") {
                              home[dataObjects[dataObj]][key] = "";
                            }
                          }
                        }
                      }
                    }
                    await home.save();
                    const canvas = Canvas.createCanvas(300, 300);
                    const ctx = canvas.getContext("2d");
                
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                    const place_on = await Canvas.loadImage(`${home.house}`);
                    ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                    await replaceHouse_Poop (client, ctx, home)
                
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `house.png` })
                
                    // Replace with the ID of the channel you want to send the image to
                    const channel_list = ["1021744464550703195","1064131707667746837","1021744564031193211","1021744526081138728"]
                    const channel = client.channels.cache.get(channel_list[Math.floor(Math.random() * channel_list.length)]);
                    const sentMessage = await channel.send({ files: [build] });
                    sentMessage.delete();

                    home.house_poop = sentMessage.attachments.first().url;


                    await home.save();
                  }
                
                  const clean_s = new EmbedBuilder()
                    .setDescription(`Cleaned!`)
                    .setColor(client.color);
                
                  await interaction.editReply({ embeds: [clean_s], components: [], files: [], ephemeral: true });
                  await pet.save();
                  collector.stop();
                } else if (menu.customId === "cancel_clean") {
                  await menu.deferUpdate();
    
                    const clean_f = new EmbedBuilder()
                    .setDescription(`Canceled!`)
                    .setColor(client.color)
    
                await interaction.editReply({ embeds: [clean_f], components: [], files: [] , ephemeral: true });
                await delay(3000);
                await interaction.deleteReply();
                collector.stop();
                }
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)
    
                await interaction.editReply({ embeds: [timed], components: [], files: [] , ephemeral: true });
                await delay(3000);
                await interaction.deleteReply();
            }
        });
    }
}
