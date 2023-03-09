const { BaccaratGameEngine, RoadmapGenerator } = require('baccarat-engine');
const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder,  ButtonStyle, ButtonBuilder} = require("discord.js");
const Bacarat = require("../settings/models/bacarat.js");
const Member = require("../settings/models/profile.js");
const Canvas = require("@napi-rs/canvas");
const wait = require('node:timers/promises').setTimeout;

const giveMoney = async (interaction, guildId, player, amount) => {
    const db = await Member.findOne({ guild: guildId, user: player });
    db.money += amount; // ให้เงินผู้เล่น


    await db.save(); 

    return giveMoney;
}

const giveMoney2 = async (interaction, guildId, player, amount) => {
    const db = await Member.findOne({ guild: guildId, user: player });
    db.money += amount; // ให้เงินผู้เล่น


    await db.save(); 

    return giveMoney2;
}

const pushArray = async (guildId, player, amount, space) => {
    const db = await Bacarat.findOne({ guild: guildId });

    db.data.push(`<@${player}> **+${amount.toFixed(2)}**`)

    await db.save();

    return pushArray;
}

const pushArray2 = async (guildId, player, amount, space) => {
    const db = await Bacarat.findOne({ guild: guildId });

    db.data_pair.push(`<@${player}> **+${amount}** | **${space}** `)

    await db.save();

    return pushArray2;
}


const payoutWinners = async (interaction, guildId) => {
    const db = await Bacarat.findOne({ guild: guildId });

    for (let i = 0; i < db.history.length; i++) {
        /// Print

        const amount = db.history[i].bet;
        const type = db.history[i].place;
        const pair = db.history[i].pair;
        const player = db.history[i].author;;

        const pair_correct = db.ไพ่คู่;
    
        const place = db.space;

        if (type == place) { /// Support only red & black & green
            // give x2 multipier
            if (type == "player") {
                // give x2 multipier
                const formatMoney = amount * 2;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            } else if (type == "banker") {
                // give x2 multipier
                const formatMoney = amount * 1.95;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            } else if (type == "tie") {
                // give x9 multipier
                const formatMoney = amount * 8;

                await giveMoney(interaction, guildId, player, formatMoney);
                await pushArray(guildId, player, formatMoney, type);
            }  
        } 

        if (place == "tie") {
            if (type == "player" || type == "banker") {
                // give x1 multipier    
                const formatMoney = amount * 1;

                await giveMoney(interaction, guildId, player, formatMoney);

            }
        }

        if (pair_correct == "PLYAER ได้คู่") {
            if (pair == "1") {
                // give x11 multipier
                const formatMoney = amount * 11;

                await giveMoney2(interaction, guildId, player, formatMoney);
                await pushArray2(guildId, player, formatMoney, pair_correct);
            }
        } else if (pair_correct == "BANKER ได้คู่") {
            if (pair == "2") {

            // give x11 multipier
            const formatMoney = amount * 11;

            await giveMoney2(interaction, guildId, player, formatMoney);
            await pushArray2(guildId, player, formatMoney, pair_correct);
            }
        } else if (pair_correct == "PLYAER & BANKER ได้คู่") {
            if (pair == "1" || pair == "2") {

            // give x11 multipier
            const formatMoney = amount * 11;

            await giveMoney2(interaction, guildId, player, formatMoney);
            await pushArray2(guildId, player, formatMoney, pair_correct);
            }
        }
    }

    return payoutWinners;
}

const sendMsg = async (interaction, guildId) => {
    const db = await Bacarat.findOne({ guild: guildId });

    const place = db.space;
    const str = db.data.join("\n")

    const str2 = db.data_pair.join("\n")

    const playerSuit1 = db.player_s1
    const playerSuit2 = db.player_s2
    const playerSuit3 = db.player_s3
    const playerCard1 = db.player_c1
    const playerCard2 = db.player_c2
    const playerCard3 = db.player_c3

    const bankerSuit1 = db.banker_s1
    const bankerSuit2 = db.banker_s2
    const bankerSuit3 = db.banker_s3
    const bankerCard1 = db.banker_c1
    const bankerCard2 = db.banker_c2
    const bankerCard3 = db.banker_c3

    const ไพ่คู่ = db.ไพ่คู่
    const ไพ่ป๊อก = db.ไพ่ป๊อก 

    const canvas = Canvas.createCanvas(1898, 1100);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1071294052630270023/1079047030938280016/templae.png");
    ctx.drawImage(background, 0, 0, 1898, 1100);

    const cardImages = {
        "A-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084809487405127/1_RED.png",
        "A-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084809281867837/1_BLACK.png",
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
        "J-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904979120199/J_RED.png",
        "J-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084904979120199/J_RED.png",
        "Q-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084903922147338/Q_RED.png",
        "Q-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905562128434/Q_BLACK.png",
        "K-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905377566812/K_RED.png",
        "K-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079084905172049940/K_BLACK.png",
      };

      const cardImages_filp = {
        "A-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092251688456222/1_RED.png",
        "A-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092251440971807/1_BLACK.png",
        "2-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092252145614918/2_RED.png",
        "2-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092251914936480/2_BLACK.png",
        "3-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092252707659937/3_RED.png",
        "3-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092252397293668/3_BLACK.png",
        "4-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092253206794280/4_RED.png", 
        "4-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092252955115550/4_BLACK.png",
        "5-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092330847543417/5_RED.png",
        "5-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092251206098974/5_BLACK.png",
        "6-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092331443126335/6_RED.png",
        "6-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092331141152858/6_BLACK.png",
        "7-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092332084854834/7_RED.png",
        "7-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092331766096023/7_BLACK.png",
        "8-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092330017071114/8_RED.png",
        "8-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092332466544740/8_BLACK.png",
        "9-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092330583293985/9_RED.png",
        "9-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092330268737636/9_BLACK.png",
        "10-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092353777795096/10_RED.png",
        "10-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092353521958922/10_BLACK.png",
        "J-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092351970050088/J_RED.png",
        "J-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092354255962193/J_BLACK.png",
        "Q-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092353278681178/Q_RED.png",
        "Q-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092352775356456/Q_BLACK.png",
        "K-diamond": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092352536297472/K_RED.png",
        "K-spade": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092352263659571/K_BLACK.png",
        "BACK": "https://cdn.discordapp.com/attachments/1071294052630270023/1079092354012684419/BACK.png",
      };

      const cardPath_P1 = cardImages[`${playerCard1}-${playerSuit1}`];
      const cardImage_P1 = await Canvas.loadImage(cardPath_P1);
      
      ctx.drawImage(cardImage_P1, 65, 200, 373, 501);
      
      const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })
      
      const embed = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setImage("attachment://Bacarat.png")
      
    const initialMsg = await interaction.channel.send({ embeds: [embed], files: [attachment] });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds

    const cardPath_B1 = cardImages[`${bankerCard1}-${bankerSuit1}`];
    const cardImage_B1 = await Canvas.loadImage(cardPath_B1);
    
    ctx.drawImage(cardImage_B1, 1050, 200, 373, 501);
    
    const attachment2 = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })
    
    const embed2 = new EmbedBuilder()
      .setColor('#bdc6e9')
      .setImage("attachment://Bacarat.png")

    await initialMsg.edit({ embeds: [embed2], files: [attachment2] });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds

    const cardPath_P2 = cardImages[`${playerCard2}-${playerSuit2}`];
    const cardImage_P2 = await Canvas.loadImage(cardPath_P2);

    ctx.drawImage(cardImage_P2, 450, 200, 373, 501);

    const attachment3 = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })

    const embed3 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setImage("attachment://Bacarat.png")    

    await initialMsg.edit({ embeds: [embed3], files: [attachment3] });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds

    const cardPath_B2 = cardImages[`${bankerCard2}-${bankerSuit2}`];
    const cardImage_B2 = await Canvas.loadImage(cardPath_B2);

    ctx.drawImage(cardImage_B2, 1436, 200, 373, 501);

    const attachment4 = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })

    const embed4 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setImage("attachment://Bacarat.png")    

    await initialMsg.edit({ embeds: [embed4], files: [attachment4] });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds
    const cardPath_P3 = cardImages_filp[`${playerCard3}-${playerSuit3}`] || cardImages_filp[`BACK`];
    const cardImage_P3 = await Canvas.loadImage(cardPath_P3);

    ctx.drawImage(cardImage_P3, 65, 703, 501, 373);

    const attachment5 = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })

    const embed5 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setImage("attachment://Bacarat.png")

    await initialMsg.edit({ embeds: [embed5], files: [attachment5] });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 4 seconds

    const cardPath_B3 = cardImages_filp[`${bankerCard3}-${bankerSuit3}`] || cardImages_filp[`BACK`];
    const cardImage_B3 = await Canvas.loadImage(cardPath_B3);

    ctx.drawImage(cardImage_B3, 1050, 703, 501, 373);

    const attachment6 = new AttachmentBuilder(await canvas.encode("png"), { name: "Bacarat.png" })

    const embed6 = new EmbedBuilder()
        .setColor('#bdc6e9')
        .setAuthor({ name: `Place: ${place}` })
        .setDescription(`**คนที่ชนะ:** \n${str || "ไม่มี :("}\n\n **คนที่ได้ไพ่คู่:** \n${str2 || "ไม่มี :("}\n`)
        .setImage("attachment://Bacarat.png")

    await initialMsg.edit({ embeds: [embed6], files: [attachment6] });
    await new Promise(resolve => setTimeout(resolve, 25000)); // Wait for 4 seconds
    await initialMsg.delete();
    

    return sendMsg;
}

const getResult = async (guildId) => {
    const db = await Bacarat.findOne({ guild: guildId });

    const roadmapGenerator = new RoadmapGenerator();
    const gameEngine = new BaccaratGameEngine();
    gameEngine.shoe.createDecks();
    gameEngine.shoe.shuffle();
    
    const gameResults = [];
    for (let i = 0; i < 1; i += 1) {
      if (gameEngine.isBurnNeeded) {
        gameEngine.shoe.shuffle();
      }

      const hand = gameEngine.dealGame();
    if (hand.playerCards[2] === undefined) {
        db.player_s1 = `${(hand.playerCards[0].suit)}`
        db.player_c1 = `${(hand.playerCards[0].value)}`
        db.player_s2 = `${(hand.playerCards[1].suit)}`
        db.player_c2 = `${(hand.playerCards[1].value)}`
    } else if (hand.playerCards[2] !== undefined) {
        db.player_s1 = `${(hand.playerCards[0].suit)}`
        db.player_c1 = `${(hand.playerCards[0].value)}`
        db.player_s2 = `${(hand.playerCards[1].suit)}`
        db.player_c2 = `${(hand.playerCards[1].value)}`
        db.player_s3 = `${(hand.playerCards[2].suit)}`
        db.player_c3 = `${(hand.playerCards[2].value)}`
    }


    if (hand.bankerCards[2] === undefined) {
        db.banker_s1 = `${(hand.bankerCards[0].suit)}`
        db.banker_c1 = `${(hand.bankerCards[0].value)}`
        db.banker_s2 = `${(hand.bankerCards[1].suit)}`
        db.banker_c2 = `${(hand.bankerCards[1].value)}`
    } else if (hand.bankerCards[2] !== undefined) {
        db.banker_s1 = `${(hand.bankerCards[0].suit)}`
        db.banker_c1 = `${(hand.bankerCards[0].value)}`
        db.banker_s2 = `${(hand.bankerCards[1].suit)}`
        db.banker_c2 = `${(hand.bankerCards[1].value)}`
        db.banker_s3 = `${(hand.bankerCards[2].suit)}`
        db.banker_c3 = `${(hand.bankerCards[2].value)}`
    }

      const result = gameEngine.resultsEngine.calculateGameResult(hand);
    
      gameResults.push(result)
      const beadPlate = roadmapGenerator.beadPlate(gameResults, {
        columns: 20,
        rows: 6,
      });

    if (gameResults[0].outcome === 'player') {
        winner = 'player';
    } else if (gameResults[0].outcome === 'banker') {
        winner = 'banker';
    } else if (gameResults[0].outcome === 'tie') {
        winner = 'tie';
    } else {
        winner = '';
    }
  
    if (gameResults[0].natural === 'player9') {
        db.ไพ่ป๊อก = 'PLYAER ป๊อก 9';
    } else if (gameResults[0].natural === 'banker9') {
        db.ไพ่ป๊อก = 'BANKER ป๊อก 9';
    } else if (gameResults[0].natural === 'player8') {
        db.ไพ่ป๊อก = 'PLYAER ป๊อก 8';
    } else if (gameResults[0].natural === 'banker8') {
        db.ไพ่ป๊อก = 'BANKER ป๊อก 8';
    } else {
        db.ไพ่ป๊อก = '';
    }
    
    
    if (gameResults[0].pair === 'player') {
        db.ไพ่คู่ = 'PLYAER ได้คู่';
    } else if (gameResults[0].pair === 'banker') {
        db.ไพ่คู่ = 'BANKER ได้คู่';
    } else if (gameResults[0].pair === 'both') {
        db.ไพ่คู่ = 'PLYAER & BANKER ได้คู่';
    } else { 
        db.ไพ่คู่ = '';
    }

    db.space = winner;

    await db.save();

    return getResult;
}
}

const betSave = async (guildId, space, money, pair, userId) => {
    const db = await Bacarat.findOne({ guild: guildId });
    const data = {
        place: space,
        bet: money,
        pair: pair,
        author: userId
    };
    db.history.push(data);
    await db.save();

    return betSave;
}

const revMoney = async (interaction, guildId, userId, money, pair, pair_money) => {
    const db = await Member.findOne({ guild: guildId, user: userId });
    db.money -= parseInt(money);

    if (pair_money !== 0) {
        db.money -= (pair_money);
    } else {
        db.money -= 0;
    }

    await db.save();

    return revMoney;
}


module.exports = { betSave, revMoney, getResult, payoutWinners, sendMsg };