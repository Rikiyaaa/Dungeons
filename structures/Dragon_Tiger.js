const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder,  ButtonStyle, ButtonBuilder} = require("discord.js");
const Member = require("../settings/models/profile.js");
const Canvas = require("@napi-rs/canvas");
const Dragon_T = require('../settings/models/Dragon_T.js');
const wait = require('node:timers/promises').setTimeout;
// get image from assests

const giveMoney = async (interaction, guildId, player, amount) => {
    const db = await Member.findOne({ guild: guildId, user: player });
    db.money += amount; // ให้เงินผู้เล่น
    
    await db.save(); 

    return giveMoney;
}

const pushArray = async (guildId, player, amount, space) => {
    const db = await Dragon_T.findOne({ guild: guildId });

    db.data.push(`<@${player}> **+${amount}** `)

    await db.save();

    return pushArray;
}

const payoutWinners = async (interaction, guildId) => {
    const db = await Dragon_T.findOne({ guild: guildId });

    for (let i = 0; i < db.history.length; i++) {
        /// Print

        const amount = db.history[i].bet;
        const type = db.history[i].place;
        const player = db.history[i].author;;;
    
        const place = db.space;

        if (type == place) { /// Support only red & black & green
            // give x2 multipier
            if (type == "tiger") {
                // give x2 multipier
                const formatMoney = amount * 2;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            } else if (type == "dragon") {
                // give x2 multipier
                const formatMoney = amount * 2;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            } else if (type == "tie") {
                // give x9 multipier
                const formatMoney = amount * 11;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            } 

            if (place == "tie") {
                if (type == "player" || type == "banker") {
                    // give x1 multipier    
                    const formatMoney = amount * 0.5;
    
                    await giveMoney(interaction, guildId, player, formatMoney);
    
                }
            }

        } 

        
    }

    return payoutWinners;
}

const sendMsg = async (interaction, guildId) => {
    const db = await Dragon_T.findOne({ guild: guildId });

    const place = db.space;
    const str = db.data.join("\n");

    const tigerSuit1 = db.tiger_s1
    const tigerCard1 = db.tiger_c1
    const dargonSuit1 = db.dargon_s1
    const dargonCard1 = db.dargon_c1

    const cardImages = {
        "1-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079288598106493058/1_RED.png",
        "1-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079288597900968016/1_BLACK.png",
        "2-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084809713885334/2_BLACK.png",
        "2-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084809911013446/2_RED.png",
        "3-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084810359808061/3_RED.png",
        "3-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084810154299442/3_BLACK.png",
        "4-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084810775056507/4_RED.png", 
        "4-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084810565324921/4_BLACK.png",
        "5-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084854928490557/5_RED.png",
        "5-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084809046990869/5_BLACK.png",
        "6-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084855318548551/6_RED.png",
        "6-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084855125627010/6_BLACK.png",
        "7-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084855746383993/7_RED.png",
        "7-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084855515693186/7_BLACK.png",
        "8-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084856182587533/8_RED.png",
        "8-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084855985442916/8_BLACK.png",
        "9-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084854697791568/9_RED.png",
        "9-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084856400695336/9_BLACK.png",
        "10-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904345780324/10_RED.png",
        "10-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904161218610/10_BLACK.png",
        "11-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904979120199/J_RED.png",
        "11-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904979120199/J_RED.png",
        "12-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084903922147338/Q_RED.png",
        "12-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905562128434/Q_BLACK.png",
        "13-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905377566812/K_RED.png",
        "13-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905172049940/K_BLACK.png",
      };

        const canvas = Canvas.createCanvas(970, 532);
        const ctx = canvas.getContext('2d');

        // 32 น้อย = ขึ้น, มาก = ลง 
        // 67 น้อย = ซ้าย, มาก = ขวา 

        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1071294052630270023/1079346916770447360/Dargon_Tiger2.png');
        ctx.drawImage(background, 0, 0, 970, 532);

        const attachment_start = new AttachmentBuilder(await canvas.encode("png"), { name: "Dargon_Tiger.png" })
        
        const embed_start = new EmbedBuilder()
          .setColor('#bdc6e9')
          .setImage("attachment://Dargon_Tiger.png")
        
      const initialMsg = await interaction.channel.send({ embeds: [embed_start], files: [attachment_start] });

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds

        const cardPath_P1 = cardImages[`${tigerCard1}-${tigerSuit1}`];
        const cardImage_P1 = await Canvas.loadImage(cardPath_P1);

        ctx.drawImage(cardImage_P1, 565, 110, 284, 378);
        
        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "Dargon_Tiger.png" })
        
        const embed = new EmbedBuilder()
          .setColor('#bdc6e9')
          .setImage("attachment://Dargon_Tiger.png")
        
          await initialMsg.edit({ embeds: [embed], files: [attachment] })
  
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds
  
      const cardPath_B1 = cardImages[`${dargonCard1}-${dargonSuit1}`];
      const cardImage_B1 = await Canvas.loadImage(cardPath_B1);
      
      ctx.drawImage(cardImage_B1, 100, 110, 284, 378);;
      
      const attachment2 = new AttachmentBuilder(await canvas.encode("png"), { name: "Dargon_Tiger.png" })
      
      const embed2 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setDescription(`${place} ชนะ!`)
        .setImage("attachment://Dargon_Tiger.png")
  
      await initialMsg.edit({ embeds: [embed2], files: [attachment2] });

      await new Promise(resolve => setTimeout(resolve, 25000)); // Wait for 4 seconds
      await initialMsg.delete();
  


    

    return sendMsg;
}

const getResult = async (guildId) => {
    const db = await Dragon_T.findOne({ guild: guildId });

    const P = Array.from({ length: 13 }, (_, i) => i + 1);
    const B = Array.from({ length: 13 }, (_, i) => i + 1);
    
    const player = P[Math.floor(Math.random() * P.length)]
    
    const banker = B[Math.floor(Math.random() * B.length)]


    const suit = ["diamond", "spade"]
     // random suit
    const tigerSuit1 = suit[Math.floor(Math.random() * suit.length)];
    const dargonSuit1 = suit[Math.floor(Math.random() * suit.length)];

    db.tiger_s1 = tigerSuit1;
    db.dargon_s1 = dargonSuit1;
    db.tiger_c1 = player;
    db.dargon_c1 = banker;
      
      if (banker < player) {
        db.space = "tiger";
        console.log(banker , player, "tiger")
      } else if (banker > player) {
        db.space = "dargon";
        console.log(banker , player, "dargon")
        } else if (banker === player) {
            db.space = "tie";
            console.log(banker , player, "tie")
        }

        await db.save();

    return getResult;
}


const betSave = async (guildId, space, money,  userId) => {
    const db = await Dragon_T.findOne({ guild: guildId });
    const data = {
        place: space,
        bet: money,
        author: userId
    };
    db.history.push(data);
    await db.save();

    return betSave;
}

const revMoney = async (interaction, guildId, userId, money,) => {
    const db = await Member.findOne({ guild: guildId, user: userId });

    db.money -= parseInt(money);

    await db.save();

    return revMoney;
}



module.exports = { betSave, revMoney, getResult, payoutWinners, sendMsg, };