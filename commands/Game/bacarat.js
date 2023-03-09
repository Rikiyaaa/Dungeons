const Member = require("../../settings/models/profile.js");
const Bacarat = require("../../settings/models/bacarat.js")
const { betSave, revMoney, getResult, payoutWinners, sendMsg } = require("../../structures/Bacarat.js")
const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder,  ButtonStyle, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require("discord.js");
const config = require("../../settings/defaults.js");
const delay = require("delay");

module.exports = { 
    name: ["บาคาร่า"],
    description: "Play the Bacarat game.",
    options: [
        {
            name: "เงินเดิมพัน",
            description: "How much money you want to bet.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "ลงไพ่คู่",
            description: "How much money you want to bet.",
            // create choice v14
            type: ApplicationCommandOptionType.Integer,
            required: false,
            choices: [
                {
                    name: "Player",
                    value: 1,


                },
                {
                    name: "Banker",
                    value: 2,
                },
            ],
        },
        {
            name: "จำนวนเงิน",
            description: "How much money you want to bet.",
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
       

                
    ],
    run: async (client, interaction) => {

        const args = interaction.options.getInteger("เงินเดิมพัน");
        if (args < config.general.coinflip_start) return interaction.reply(`You can't bet less than \`$${numberWithCommas(config.general.coinflip_start)}\``);

        // get choices v14
        const pair = interaction.options.getInteger("ลงไพ่คู่");

        const pair_money = interaction.options.getInteger("จำนวนเงิน");
        

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (args > user.money) {
            const embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setDescription(`You don't have enough money.`)
                .setTimestamp();

            return interaction.reply({ embeds: [embed], ephemeral: true});
        }

     //   const string = interaction.options.getString("side");
     //   const space = string.toLowerCase();

        // create button heads and tails and tie v14
        const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("player")
            .setLabel("Player")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId("banker")
            .setLabel("Banker")  
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder() 
            .setCustomId("tie")
            .setLabel("Tie")    
            .setStyle(ButtonStyle.Success),
    );
    
        const embed = new EmbedBuilder()    
            .setTitle('บาคาร่า พารวย')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription('Choose your side!')    
            .setColor(client.color)

          await  interaction.reply({ embeds: [embed], components: [button],  ephemeral: true});   

        const filter = (button) => button.user.id === interaction.user.id;  
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
                await menu.deferUpdate();
            if (menu.customId === 'player') {
                const space = "player";
               

                await runBacarat(interaction, space, args, pair, pair_money, client, );

                collector.stop();

            } else if (menu.customId === 'banker') {
                const space = "banker";

                await runBacarat(interaction, space, args, pair, pair_money, client, );

                collector.stop();
            } else if (menu.customId === 'tie') {
                const space = "tie";

                await runBacarat(interaction, space, args, pair, pair_money, client, );

                collector.stop();
            } 
        }});
        collector.on('end', async (menu) => {
            // set button disbaled true\

            const embed = new EmbedBuilder()
            .setTitle('Bacarat')
            .setDescription('You did not choose your side in time!')
            .setColor(client.color)

            await interaction.editReply({ embeds: [embed], components: [] });
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 4 seconds
              await interaction.deleteReply();

        });


    //     if (space == "heads" || space == "น้ำเงิน" || space == "tie") {
    //        /// Fill here
    //        await runCoinflip(interaction, space, args, client);
    //    } else {
    //        return interaction.editReply({ content: "You can only place `heads/tails` side." });
    //    }

    }// notificaiton error v14 and send message v14
    , error: async (client, interaction, error) => {
        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`An error occurred: ${error.message}`)
            .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },



    
}



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function runBacarat(interaction, space, args, pair, pair_money, client ) {
    //// Run Coinflip!
    const db = await Bacarat.findOne({ guild: interaction.guild.id });
    
    if (db.bacarat) {
        // True
		
		const data = await Bacarat.findOne({ guild: interaction.guild.id });

        if(data.time_limit < Date.now()) {
            const embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setDescription(`You can't bet, you run out of time.`)
            return interaction.followUp({ embeds: [embed], ephemeral: true});
        }

        const obj = data.history.some(element => element.author === interaction.user.id);
        if(obj) {
            const embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setDescription(`You can't bet, you already bet.`)
            return interaction.followUp({ embeds: [embed], ephemeral: true});
        }

        /// Save History bets
        await betSave(interaction.guild.id, space, args, pair, interaction.user.id);

        /// Remove Money
        await revMoney(interaction.guild.id, interaction.user.id, args);

        const cooldown = new Date(data.time);
        const time = new Date(cooldown - new Date());
        const time_format = `${time.getUTCSeconds()} seconds`;

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("player")
            .setLabel("Player")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId("banker")
            .setLabel("Banker")  
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true),
        new ButtonBuilder() 
            .setCustomId("tie")
            .setLabel("Tie")    
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId("share")
            .setLabel("Share")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(false),
        );

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`You have place a bet of \`$${numberWithCommas(args)}\` on \`${space}\``)
            .setFooter({ text: `Time remaining: ${time_format}` });

            interaction.editReply({ embeds: [embed], components: [button], ephemeral: true});
    } else {
        // False
        
        /// Save History bets
        await betSave(interaction.guild.id, space, args, pair, interaction.user.id);
        console.log("Save History bets");

        /// Remove Money
        await revMoney(interaction, interaction.guild.id, interaction.user.id, args, pair, pair_money);
        console.log("Remove Money");


        /// Run Random side coinflip
        await getResult(interaction.guild.id);
        console.log("Run Random side coinflip");

        /// Update time!
        const data = await Bacarat.findOne({ guild: interaction.guild.id });

        if (data.time == 0) {
            await Bacarat.findOneAndUpdate({ guild: interaction.guild.id }, { time: Date.now() + (data.time_remaining * 1000), time_limit: Date.now() + (25 * 1000) });
        }

        await Bacarat.findOneAndUpdate({ guild: interaction.guild.id }, { bacarat: true });

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("player")
            .setLabel("Player")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId("banker")
            .setLabel("Banker")  
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true),
        new ButtonBuilder() 
            .setCustomId("tie")
            .setLabel("Tie")    
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId("share")
            .setLabel("Share")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(false),
        );


        const embed = new EmbedBuilder()
            .setColor("#FF0000")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`You have place a bet of \`$${numberWithCommas(args)}\` on \`${space}\``)
            .setFooter({ text: `Time remaining: 30 seconds` });

            interaction.editReply({ embeds: [embed], components: [button], ephemeral: true});
            
            const filter = (button) => button.user.id === interaction.user.id;  
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async (button) => {
                await button.deferUpdate();
                if (button.customId === 'share') {

                    const embed_share = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setDescription(`You have place a bet of \`$${numberWithCommas(args)}\` on \`${space}\``)
                    .setFooter({ text: `Time remaining: 30 seconds` });
        
                    interaction.channel.send({ embeds: [embed_share], });


                    collector.stop();
                } 
            });

        /// wait 30 seconds!
        await delay(10000);

        /// give money to winners
        await payoutWinners(interaction, interaction.guild.id);
        console.log("Payout winners");

        /// send msg winners
        await sendMsg(interaction, interaction.guild.id);
        console.log("Send msg");

        /// Delete database
        await data.delete();
    }
}


function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}
