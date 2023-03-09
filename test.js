const cache = new Map();


module.exports = async(client, interaction) => {
    // Check if the interaction is a command and in a guild
  if (!interaction.isCommand || !interaction.guild) return;

  // Check if the user has already triggered this command recently
  const cacheKey = `${interaction.guild.id}:${interaction.user.id}:${interaction.commandName}`;
  if (cache.has(cacheKey)) {
    const lastInteractionTime = cache.get(cacheKey);
    if (Date.now() - lastInteractionTime < 5000) {
      return interaction.reply({
        content: 'Please wait a few seconds before running this command again.',
        ephemeral: true,
      });
    }
  }

  // Update the cache with the current interaction time
  cache.set(cacheKey, Date.now());

  // Create a home, profile, and inv for the user who triggered the interaction
  await Promise.all([
    client.createHome(interaction.guild.id, interaction.user.id),
    client.createProfile(interaction.guild.id, interaction.user.id),
    client.createInv(interaction.guild.id, interaction.user.id),
  ]);

  if (interaction.isModalSubmit) {
    if (interaction.customId == "topup_modal") {
      const code = interaction.fields.getTextInputValue("topup_code");
      voucher("0957121967", code).then(redeem => {

        const topup = Topup_data.findOne({ guild: interaction.guild.id, user: interaction.user.id, username: interaction.user.username, discriminator: interaction.user.discriminator});

        topup.รายการเติมเงิน.push({
          code: redeem.code,
          owner_full_name: redeem.owner_full_name,
          amount: redeem.amount,
          date: new Date()
        });

        topup.รายการเติมเงินทั้งหมด += redeem.amount;

        topup.save();

        const embed = new EmbedBuilder()
            .setAuthor("Topup Success")
            .setDescription(`Redeem: ${redeem.code}\nFrom: ${redeem.owner_full_name}\nAmount: ${redeem.amount} BATH`)
            .setColor(client.color)
            .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();


        interaction.reply({ embeds: [embed] , ephemeral: true});
      }).catch(err => {
        if (err == "Error: INVAILD_VOUCHER") {

          const embed = new EmbedBuilder()
            .setDescription(`ลิ้งซองของคุณไม่ถูกต้อง หรือถูกใช้ไปเเล้ว`)
            .setColor(client.color)
            .setTimestamp();

          interaction.reply({ embeds: [embed] , ephemeral: true });
        }  else {
          const embed = new EmbedBuilder()
            .setDescription(`เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง`)
            .setColor(client.color)
            .setTimestamp();

          interaction.reply({ embeds: [embed] , ephemeral: true });
        }
      });
    }  else if (interaction.customId == "dragon_tiger") {
      const args = interaction.fields.getTextInputValue("bet_amount");
      
      if (args < config.general.dragon_tiger_start) return interaction.reply(`You can't bet less than \`$${numberWithCommas(config.general.coinflip_start)}\``);
      if (args > config.general.coinflip_max) return interaction.reply(`You can't bet more than \`$${numberWithCommas(config.general.coinflip_max)}\``);

      const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id, username: interaction.user.username, discriminator: interaction.user.discriminator});

      if (args > user.money) {
        const dont_have = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`You don't have enough money.`)
            .setTimestamp();

        return interaction.reply({ embeds: [dont_have], ephemeral: true});
    }

    const button = new ActionRowBuilder()
    .addComponents(
       
        new ButtonBuilder()
            .setCustomId("dragon")
            .setLabel("Dragon") 
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder() 
            .setCustomId("tie")
            .setLabel("Tie")    
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId("tiger")
            .setLabel("Tiger")
            .setStyle(ButtonStyle.Primary),
    );
    
        const Dragon_Tiger = new EmbedBuilder()    
            .setTitle('Dragon Tiger')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription('Choose your side!')    
            .setColor(client.color)

        await interaction.reply({ embeds: [Dragon_Tiger], components: [button],  ephemeral: true});   

        const filter = (button) => button.user.id === interaction.user.id;  
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
                await menu.deferUpdate();
            if (menu.customId === 'tiger') {
                const space = "tiger";
               

                await runDragonTiger(interaction, space, args, client, );

                collector.stop();

            } else if (menu.customId === 'dragon') {
                const space = "dragon";

                await runDragonTiger(interaction, space, args, client, );

                collector.stop();
            } else if (menu.customId === 'tie') {
                const space = "tie";

                await runDragonTiger(interaction, space, args, client, );

                collector.stop();
            } 
        }});
        collector.on('end', async (menu) => {
            // embed timeout

            const embed = new EmbedBuilder()
            .setTitle('Dragon Tiger')
            .setDescription('You did not choose your side in time!')
            .setColor(client.color)

            await interaction.editReply({ embeds: [embed], components: [] });
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 4 seconds
            await interaction.deleteReply();

        });

    } else if (interaction.customId == "slot_game") {
      const bet = interaction.fields.getTextInputValue("bet_slot");
      
      if (bet < config.general.coinflip_start) return interaction.editReply(`You can't bet less than \`$${numberWithCommas(config.general.coinflip_start)}\``);
  
          const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
          if (bet > user.money) {
              const embed = new EmbedBuilder()
                  .setColor(client.color)
                  .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                  .setDescription(`You don't have enough money.`)
                  .setTimestamp();
  
              return interaction.editReply({ embeds: [embed] });
          }

          let slots = {
              "apple":{emoji: '🍏', name: 'apple', points: 0.1},
              "pear":{emoji: '🍐', name: 'pear', points: 0.2},
              "cherry":{emoji: '🍒', name: 'cherry', points: 0.3},
              "pineapple":{emoji: '🍍', name: 'pineapple', points: 0.3},
              "potato":{emoji: '🥔', name: 'potato', points: 0.5},
              "lollypop":{emoji: '🍭', name: 'lollypop', points: 1},
              "jackpot":{emoji: '🤑', name: 'jackpot', points: 3}
            };
            let options = ["apple","pear","cherry","pineapple","potato","lollypop","jackpot"]
            let msg = '';
            try{

              const embed = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`Loading...`)

              await interaction.reply({ embeds: [embed] });
              user.money -= bet;

          await user.save();
          
              slotMachine(bet);
              
            }catch(err){console.log('[ERROR] - at SLOTS', err.stack)}
            
            
            async function slotMachine(bet){
              let game = [];
              let names = []
              for(let x=0;x<1;x++){
                  game = [];
                  for(let i=0;i < 3;i++){
                      let temp = ''
                      let tempnames = []
                      for(let j=0;j<3;j++){
                          let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                          temp+=s.emoji
                          tempnames.push(s.name)
                      }
                      if(i==1) temp+='⬅'
                      game.push(temp);
                      names.push(tempnames)
                  }
            
                  let game2 = [];
                  let names2 = []
                  for(let x=0;x<1;x++){
                      game2 = [];
                      for(let i=0;i < 3;i++){
                          let temp2 = ''
                          let tempnames2 = []
                          for(let j=0;j<3;j++){
                              let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                              temp2+=s.emoji
                              tempnames2.push(s.name)
                          }
                          if(i==1) temp2+='⬅'
                          game2.push(temp2);
                          names2.push(tempnames2)
                      }
                    }

                    let game3 = [];
                    let names3 = []
                    for(let x=0;x<1;x++){
                        game3 = [];
                        for(let i=0;i < 3;i++){
                            let temp3 = ''
                            let tempnames3 = []
                            for(let j=0;j<3;j++){
                                let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                                temp3+=s.emoji
                                tempnames3.push(s.name)
                            }
                            if(i==1) temp3+='⬅'
                            game3.push(temp3);
                            names3.push(tempnames3)
                        }
                      }

                      let game4 = [];
                      let names4 = []
                      for(let x=0;x<1;x++){
                          game4 = [];
                          for(let i=0;i < 3;i++){
                              let temp4 = ''
                              let tempnames4 = []
                              for(let j=0;j<3;j++){
                                  let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                                  temp4+=s.emoji
                                  tempnames4.push(s.name)
                              }
                              if(i==1) temp4+='⬅'
                              game4.push(temp4);
                              names4.push(tempnames4)
                          }
                          }
                          let game5 = [];
                          let names5 = []
                          for(let x=0;x<1;x++){
                              game5 = [];

                              for(let i=0;i < 3;i++){
                                  let temp5 = ''
                                  let tempnames5 = []
                                  for(let j=0;j<3;j++){
                                      let s = slots[options[ Math.floor(Math.random() * Math.floor(6))]];
                                      temp5+=s.emoji
                                      tempnames5.push(s.name)
                                  }
                                  if(i==1) temp5+='⬅'
                                  game5.push(temp5);
                                  names5.push(tempnames5)
                              }
                              }
               
                  console.log(game2.join('\n'));
                  const embed = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`${game2.join('\n')}`)

              await interaction.editReply({ embeds: [embed] });
              await delay(1000)

              console.log(game3.join('\n'));
              const embed1 = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`${game3.join('\n')}`)
              await interaction.editReply({ embeds: [embed1] });
              await delay(1000)

              console.log(game4.join('\n'));
              const embed3 = new EmbedBuilder()
                              
                  .setColor(client.color)
                  .setDescription(`${game4.join('\n')}`)
              await interaction.editReply({ embeds: [embed3] });  
              await delay(1000)   

              console.log(game5.join('\n'));
              const embed4 = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`${game5.join('\n')}`)  
              await interaction.editReply({ embeds: [embed4] });  
              await delay(1000)   

              const embed2 = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`${game.join('\n')}`)
              await interaction.editReply({ embeds: [embed2] });
                  console.log(game.join('\n'));
              }
              results(names[1],bet)
            }
            
            function results(a,amount){
              let e = a
              let three = e[0] == e[1] && e[0] == e[2];
              let two = e[0] == e[1] || e[0] == e[2] || e[1] == e[2];
              console.log(e)
             console.log((slots[e[0]].emoji+slots[e[1]].emoji+slots[e[2]].emoji))
              if(three){
                  if(e.includes('jackpot')){
                      let newMoney = Math.floor(amount * 10);


                      user.money += newMoney;

                      user.save();

                      const embed = new EmbedBuilder()
                      .setColor(client.color)
                      .setDescription(`**Kitsakorn you won \`$${newMoney}\`!**`)

                      return interaction.followUp({ embeds: [embed], });
                  }
                  else{
                      let newMoney = Math.floor(amount * (slots[e[0]].points))

                      user.money += newMoney * 10;
                      user.save();
                      const embed = new EmbedBuilder()
                      .setColor(client.color)
                      .setDescription(`**Kitsakorn you won \`$${newMoney * 10}\`!**`)
                      return interaction.followUp({ embeds: [embed] });
                  }
                  
              }
              else if(two){
                  let newMoney = Math.floor(amount * ((slots[e[0]].points + slots[e[1]].points + slots[e[2]].points)))

                  user.money += newMoney;
                  user.save();
                  const embed = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`**Kitsakorn you won \`$${newMoney}\`!**`)
                  return interaction.followUp({ embeds: [embed] });
              }
              else{
                  const embed = new EmbedBuilder()
                  .setColor(client.color)
                  .setDescription(`**Kitsakorn you lost !**`)
                  return interaction.followUp({ embeds: [embed] });
              }
            }

    } else if (interaction.customId == "coinflip_modal") {
      const args = interaction.fields.getTextInputValue("coinflip_amount");
      
      if (args < config.general.coinflip_start) return interaction.reply(`You can't bet less than \`$${numberWithCommas(config.general.coinflip_start)}\``);
      if (args > config.general.coinflip_max) return interaction.reply(`You can't bet more than \`$${numberWithCommas(config.general.coinflip_max)}\``);

      const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id, username: interaction.user.username, discriminator: interaction.user.discriminator});

      if (args > user.money) {
        const dont_have = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`You don't have enough money.`)
            .setTimestamp();

        return interaction.reply({ embeds: [dont_have], ephemeral: true});
    }

    const button = new ActionRowBuilder()
    .addComponents(
       
        new ButtonBuilder()
            .setCustomId("heads")
            .setLabel("หัว") 
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("tails")
            .setLabel("ก้อย")
            .setStyle(ButtonStyle.Secondary),
    );
    
        const Coinflip = new EmbedBuilder()    
            .setTitle('Coinflip')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription('Choose your side!')    
            .setColor(client.color)

        await interaction.reply({ embeds: [Coinflip], components: [button],  ephemeral: true});   

        const filter = (button) => button.user.id === interaction.user.id;  
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
                await menu.deferUpdate();
            if (menu.customId === 'heads') {
                const space = "หัว";
               

                await runCoinflip(interaction, space, args, client, );

                collector.stop();

            } else if (menu.customId === 'tails') {
                const space = "ก้อย";

                await runCoinflip(interaction, space, args, client, );

                collector.stop();
            } 
        }});
        collector.on('end', async (menu) => {
            // embed timeout

            const embed = new EmbedBuilder()
            .setTitle('Coinflip')
            .setDescription('You did not choose your side in time!')
            .setColor(client.color)

            await interaction.editReply({ embeds: [embed], components: [] });
            // delete embed timeout
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 4 seconds
            await interaction.deleteReply();

        });

    } else if (interaction.customId == "rename_modal") {
      await interaction.deferUpdate();
      const args = interaction.fields.getTextInputValue("rename_input");

      if (args.length > 20) return interaction.reply(`Your name is too long!`);
      if (args.length < 3) return interaction.reply(`Your name is too short!`);

      const pet = await Cprofile.findOne({ user: interaction.user.id});

      pet.username = args;
      pet.save();

        const button = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setCustomId("rename_id")
          .setLabel("rename ")   
          .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
              .setCustomId("train_id")
              .setLabel("train")
              .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
              .setCustomId("item_id")
              .setLabel("item")
              .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
              .setCustomId("close_id")
              .setLabel("close")
              .setStyle(ButtonStyle.Danger),
      );


      const canvas = Canvas.createCanvas(270, 110);
      const ctx = canvas.getContext("2d");

      const profile = await Canvas.loadImage("./assests/pet/profile.png");
      ctx.drawImage(profile, 0, 0, canvas.width, canvas.height);

      if (pet.hungry >= 10) {
          const happy = await Canvas.loadImage(`./assests/pet/happy/dog.png`);
          ctx.drawImage(happy, 20, 20, 49, 53);
      } else if (pet.hungry == 0) {
          const sleep = await Canvas.loadImage(`./assests/pet/sleep/dog.png`);
          ctx.drawImage(sleep, 20, 20, 49, 53);
      } else if (pet.hungry <= 10) {
          const hungry = await Canvas.loadImage(`./assests/pet/hungry/dog.png`);
          ctx.drawImage(hungry, 20, 20, 49, 53);
      }

      // persentage exp bar match nextexp
      const exp = pet.exp / pet.nextexp;
      const expbar = Math.round(159 * exp);
      ctx.fillStyle = "#EFB42E";
      ctx.fillRect(92, 20, expbar, 14);
      // write text level
      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "#000001";
      ctx.fillText(`LV: ${pet.level}`, 92, 30);
      // write text exp persentage
      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "#000001";
      const expbar2 = exp > 1 ? 100 : Math.round(100 * exp);
      ctx.fillText(`XP: ${expbar2 || "0"}%`, 190, 30);
      // persentage red bar heal
      const health = pet.health;
      const healthbar = (health / 100) * 57;
      ctx.fillStyle = "#AD2323";
      ctx.fillRect(108, 47, healthbar, 10);
      // persentage green bar hungry
      const hungry = pet.hungry;
      const hungrybar = (hungry / 100) * 57;
      ctx.fillStyle = "#508451";
      ctx.fillRect(187, 47, hungrybar, 10);

      const energy = pet.energy;
      const energybar = (energy / 100) * 57;
      ctx.fillStyle = "blue";
      ctx.fillRect(108, 63, energybar, 10);

      const attac = new AttachmentBuilder(await canvas.encode("png"), { name: "profile.png" })

      const embed = new EmbedBuilder()
          .setAuthor({ name: `${pet.username}`, iconURL: interaction.user.avatarURL() })
          .addFields(
              {
                  name: "Pet Health", value: `${pet.health}/100`, inline: true
              },
              {
                  name: "Pet Hunger", value: `${pet.hungry}/100`, inline: true
              },
              {
                  name: "Pet Energy", value: `${pet.energy}/100`, inline: true
              },
              {
                  name: "Pet Level", value: `${pet.level}`, inline: true
              },
              {
                  name: "Pet Exp", value: `${pet.exp}/${pet.nextexp}`, inline: true
              },
          )
          .setImage("attachment://profile.png")
          .setColor(client.color)

          await interaction.editReply({ content: " ", embeds: [embed], components: [button], files: [attac] });

      }
  } 

 

  if (interaction.isButton()) {
    if (interaction.customId == "topup_button") {
      const modal = new ModalBuilder()
  .setTitle('เติมเงินด้วยซองอังเปา')
  .setCustomId('topup_modal')
  .setComponents(
    new ActionRowBuilder().setComponents(
      new TextInputBuilder()
        .setLabel('ลิ้งซองอังเปา')
        .setCustomId('topup_code')
        .setPlaceholder('https://gift.truemoney.com/campaign/?v=xxxxxxxxxxxxxxxxxxx')
          .setMinLength(1)
          .setMaxLength(50)
          .setRequired(true)
        .setStyle(TextInputStyle.Short)
    ),
  );

  // fix showModal  is not defined
       await interaction.showModal(modal, interaction);
    } else if (interaction.customId == "wall_right") {
      const embed = new EmbedBuilder()
        .setDescription(`**ของที่คุณจะได้รัย**\n\n1. ควย`)
        .setColor(client.color)

      await interaction.reply({ content: " ", embeds: [embed], ephemeral: true });
    }
  
  }

  // Find the command object for the interaction
  const command = client.slash.find((command) => {
    switch (command.name.length) {
      case 1:
        return command.name[0] == interaction.commandName;
      case 2:
        return (
          command.name[0] == interaction.commandName &&
          command.name[1] == interaction.options.getSubcommand()
        );
      case 3:
        return (
          command.name[0] == interaction.commandName &&
          command.name[1] == interaction.options.getSubcommandGroup() &&
          command.name[2] == interaction.options.getSubcommand()
        );
    }
  });

  // If the command object is not found, return
  if (!command) return;

  // Check if the user is a developer
  if (
    !client.dev.includes(interaction.user.id) &&
    client.dev.length > 0
  ) {
    return interaction.reply({
      content: 'You are not authorized to run this command.',
      ephemeral: true,
    });
  }

  // Execute the command
  try {
    await command.run(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'An error occurred while running this command.',
      ephemeral: true,
    });
  }
  }