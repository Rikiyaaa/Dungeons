const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const GProfile = require("../../settings/models/cradprofile.js");
const delay = require("delay"); 
const pendings = {};

module.exports = { 
    name: ["fight"],
    description: "fight",
    options: [
                {
                    name: "who",
                    description: "who is that",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ],
    run: async (client, interaction) => {
        const member1 = interaction.options.getUser("who");
        const member2 = interaction.user;
        const attacker = member1;
        const defender = member2;

        const waitembed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("กำลังค้นหามอนเตอร์ | กรุณารอสักครู่... ")

        await interaction.reply({ embeds: [waitembed] });

        const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
        const cprofile_member = await GProfile.findOne({ user: member1.id });


        const cantdothat = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> | คุณไม่สามารถสู้กับตัวเองได้`)

         const amount_all = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> | คุณไม่สามารถสู้กับบอทได้ `)

        if (member1.id === interaction.user.id) return interaction.editReply({ embeds: [cantdothat] });
        if (member1.bot) return interaction.editReply({ embeds: [amount_all] });

        const inter_health_low = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> คุณมีพลังชีวิตไม่เพียงพอ`)

        const member_health_low = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> เขามีพลังชีวิตไม่เพียงพอ`)

        const no_profile = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription(`<a:907824800192397392:1022032199836512330> เขายังไม่ได้สร้างโปรไฟล์จึงไม่สามารถสู้ได้`)

        if (cprofile_inter.health <= 0) return interaction.editReply({ embeds: [inter_health_low] , ephemeral: true});
        if (cprofile_member === null) return interaction.editReply({ embeds: [no_profile], ephemeral: true });
        if (cprofile_member.health <= 0) return interaction.editReply({ embeds: [member_health_low], ephemeral: true });


        for(const requester in pendings) {
            const receiver = pendings[requester];
            if (requester === defender.id) { 
                const embed1 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | คุณมีคําสั่งที่กําลังดําเนินอยู่`) 

                interaction.editReply({ embeds: [embed1], ephemeral: true }); 
                return;
            } else if (receiver === defender.id) {
                const embed2 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | คุณมีคําสั่งที่กําลังดําเนินอยู่`) 

                interaction.editReply({ embeds: [embed2], ephemeral: true }); 
                return;
            } else if (requester === attacker.id) {
                const embed3 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | เขามีคําสั่งที่กําลังดําเนินอยู่`) 

                interaction.editReply({ embeds: [embed3] , ephemeral: true}); 
                return;
            } else if (receiver === attacker.id) {
                const embed4 = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | เขามีคําสั่งที่กําลังดําเนินอยู่`) 

                interaction.editReply({ embeds: [embed4], ephemeral: true }); 
                return;
            }
        }

        let isAttackerTurn = true;

        const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('attack')
            .setLabel('โจมตี')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
              .setCustomId('defend')
              .setLabel('ป้องกัน')  
              .setStyle(ButtonStyle.Primary),
        )
      
        const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
        const health_result_inter = cprofile_inter.health + defence_armor_inter;
       const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter;
        const pet_attack_chack_inter = (health_result_inter  / health_max_result_inter) * 100;
        const pet_attack_result_inter = Math.round(pet_attack_chack_inter);
        if(pet_attack_result_inter <= 0) {
        cprofile_inter.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 10 && pet_attack_result_inter > 0) {
        cprofile_inter.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 20) {
        cprofile_inter.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 30) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 40) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 50) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 60) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 70) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 80) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 90) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
       } else if(pet_attack_result_inter <= 100) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
       }  else if(pet_attack_result_inter > 100) {
        cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
         }

         const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
         const health_result_member = cprofile_member.health + defence_armor_member;
        const health_max_result_member = cprofile_member.health_max + defence_armor_member;
         const pet_attack_chack_member = (health_result_member  / health_max_result_member) * 100;
         const pet_attack_result_member = Math.round(pet_attack_chack_member);
         if(pet_attack_result_member <= 0) {
         cprofile_member.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 10 && pet_attack_result_member > 0) {
         cprofile_member.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 20) {
         cprofile_member.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 30) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 40) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 50) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 60) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 70) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 80) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 90) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
        } else if(pet_attack_result_member <= 100) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
        }  else if(pet_attack_result_member > 100) {
         cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
          }


        const embed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setFields(
            { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
            { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
        )
        .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
      
      const filter = (button) => {
        if (isAttackerTurn) {
          // add attack and defend buttons to the filter
          return button.user.id === attacker.id && (button.customId === "attack" || button.customId === "defend");
        } else {
          return button.user.id === defender.id && (button.customId === "attack" || button.customId === "defend");
        }
      };
      
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000  });
      pendings[defender.id] = attacker.id;
      await interaction.editReply({ content: `${member1} ตาคุณ`, embeds: [embed], components: [row] });
      
      collector.on('collect', async (button) => {
        if (button.customId === "attack") {
          await button.deferUpdate();
      
          if (isAttackerTurn) {
            const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
            const cprofile_member = await GProfile.findOne({ user: member1.id });

            cprofile_inter.health = cprofile_inter.health - cprofile_member.type[0].sword.damage_attack;

            if (cprofile_inter.type[0].sword.name == "หมัด") {
                cprofile_inter.type[0] = {
                    type: cprofile_inter.type[0].type,
                    type_system: cprofile_inter.type[0].type_system,
                    emoji: cprofile_inter.type[0].emoji,
                    sword: {
                        name: cprofile_inter.type[0].sword.name,
                        emoji: cprofile_inter.type[0].sword.emoji,
                        status: cprofile_inter.type[0].sword.status,
                        type: cprofile_inter.type[0].sword.type,
                        damage_attack: cprofile_inter.type[0].sword.damage_attack , 
                        critical: cprofile_inter.type[0].sword.critical,
                        durability: cprofile_inter.type[0].sword.durability,
                        level_upgade: cprofile_inter.type[0].sword.level_upgade,
                    },
                    armor_head: {
                        name: cprofile_inter.type[0].armor_head.name,
                        emoji: cprofile_inter.type[0].armor_head.emoji,
                        status: cprofile_inter.type[0].armor_head.status,
                        type: cprofile_inter.type[0].armor_head.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_inter.type[0].armor_body.name,
                        emoji: cprofile_inter.type[0].armor_body.emoji,
                        status: cprofile_inter.type[0].armor_body.status,
                        type: cprofile_inter.type[0].armor_body.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_inter.type[0].armor_leg.name,
                        emoji: cprofile_inter.type[0].armor_leg.emoji,
                        status: cprofile_inter.type[0].armor_leg.status,
                        type: cprofile_inter.type[0].armor_leg.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_inter.type[0].armor_foot.name,
                        emoji: cprofile_inter.type[0].armor_foot.emoji,
                        status: cprofile_inter.type[0].armor_foot.status,
                        type: cprofile_inter.type[0].armor_foot.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                    },
                };
            } else if (cprofile_inter.type[0].sword.name !== "หมัด") {

            cprofile_inter.type[0] = {
                type: cprofile_inter.type[0].type,
                type_system: cprofile_inter.type[0].type_system,
                emoji: cprofile_inter.type[0].emoji,
                sword: {
                    name: cprofile_inter.type[0].sword.name,
                    emoji: cprofile_inter.type[0].sword.emoji,
                    status: cprofile_inter.type[0].sword.status,
                    type: cprofile_inter.type[0].sword.type,
                    damage_attack: cprofile_inter.type[0].sword.damage_attack , 
                    critical: cprofile_inter.type[0].sword.critical,
                    durability: cprofile_inter.type[0].sword.durability -= 2,
                    level_upgade: cprofile_inter.type[0].sword.level_upgade,
                },
                armor_head: {
                    name: cprofile_inter.type[0].armor_head.name,
                    emoji: cprofile_inter.type[0].armor_head.emoji,
                    status: cprofile_inter.type[0].armor_head.status,
                    type: cprofile_inter.type[0].armor_head.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                },
                armor_body: {
                    name: cprofile_inter.type[0].armor_body.name,
                    emoji: cprofile_inter.type[0].armor_body.emoji,
                    status: cprofile_inter.type[0].armor_body.status,
                    type: cprofile_inter.type[0].armor_body.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                },
                armor_leg: {
                    name: cprofile_inter.type[0].armor_leg.name,
                    emoji: cprofile_inter.type[0].armor_leg.emoji,
                    status: cprofile_inter.type[0].armor_leg.status,
                    type: cprofile_inter.type[0].armor_leg.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                },
                armor_foot: {
                    name: cprofile_inter.type[0].armor_foot.name,
                    emoji: cprofile_inter.type[0].armor_foot.emoji,
                    status: cprofile_inter.type[0].armor_foot.status,
                    type: cprofile_inter.type[0].armor_foot.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                },
            };
            }

            if (cprofile_inter.type[0].sword.durability <= 20) {
                interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
            } else if (cprofile_inter.type[0].sword.durability <= 4) {
                interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
            }

            if (cprofile_inter.type[0].sword.durability == 0) {
                cprofile_inter.type[0] = {
                    type: cprofile_inter.type[0].type,
                    type_system: cprofile_inter.type[0].type_system,
                    emoji: cprofile_inter.type[0].emoji,
                    sword: {
                        name: "หมัด",
                        emoji: "✊",
                        status: "default",
                        type: cprofile_inter.type[0].sword.type,
                        damage_attack: 1, 
                        critical: 1,
                        durability: 100,
                        level_upgade: 1,
                    },
                    armor_head: {
                        name: cprofile_inter.type[0].armor_head.name,
                        emoji: cprofile_inter.type[0].armor_head.emoji,
                        status: cprofile_inter.type[0].armor_head.status,
                        type: cprofile_inter.type[0].armor_head.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_inter.type[0].armor_body.name,
                        emoji: cprofile_inter.type[0].armor_body.emoji,
                        status: cprofile_inter.type[0].armor_body.status,
                        type: cprofile_inter.type[0].armor_body.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_inter.type[0].armor_leg.name,
                        emoji: cprofile_inter.type[0].armor_leg.emoji,
                        status: cprofile_inter.type[0].armor_leg.status,
                        type: cprofile_inter.type[0].armor_leg.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_inter.type[0].armor_foot.name,
                        emoji: cprofile_inter.type[0].armor_foot.emoji,
                        status: cprofile_inter.type[0].armor_foot.status,
                        type: cprofile_inter.type[0].armor_foot.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                    },
                };
                interaction.followUp({content: `อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว`, ephemeral: true});
            }
            if (cprofile_member.type[0].sword.name == "หมัด") {
                cprofile_member.type[0] = {
                    type: cprofile_member.type[0].type,
                    type_system: cprofile_member.type[0].type_system,
                    emoji: cprofile_member.type[0].emoji,
                    sword: {
                        name: cprofile_member.type[0].sword.name,
                        emoji: cprofile_member.type[0].sword.emoji,
                        status: cprofile_member.type[0].sword.status,
                        type: cprofile_member.type[0].sword.type,
                        damage_attack: cprofile_member.type[0].sword.damage_attack , 
                        critical: cprofile_member.type[0].sword.critical,
                        durability: cprofile_member.type[0].sword.durability,
                        level_upgade: cprofile_member.type[0].sword.level_upgade,
                    },
                    armor_head: {
                        name: cprofile_member.type[0].armor_head.name,
                        emoji: cprofile_member.type[0].armor_head.emoji,
                        status: cprofile_member.type[0].armor_head.status,
                        type: cprofile_member.type[0].armor_head.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_member.type[0].armor_body.name,
                        emoji: cprofile_member.type[0].armor_body.emoji,
                        status: cprofile_member.type[0].armor_body.status,
                        type: cprofile_member.type[0].armor_body.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_member.type[0].armor_leg.name,
                        emoji: cprofile_member.type[0].armor_leg.emoji,
                        status: cprofile_member.type[0].armor_leg.status,
                        type: cprofile_member.type[0].armor_leg.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_member.type[0].armor_foot.name,
                        emoji: cprofile_member.type[0].armor_foot.emoji,
                        status: cprofile_member.type[0].armor_foot.status,
                        type: cprofile_member.type[0].armor_foot.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                    },
                };
            } else if (cprofile_member.type[0].sword.name !== "หมัด") {

            cprofile_member.type[0] = {
                type: cprofile_member.type[0].type,
                type_system: cprofile_member.type[0].type_system,
                emoji: cprofile_member.type[0].emoji,
                sword: {
                    name: cprofile_member.type[0].sword.name,
                    emoji: cprofile_member.type[0].sword.emoji,
                    status: cprofile_member.type[0].sword.status,
                    type: cprofile_member.type[0].sword.type,
                    damage_attack: cprofile_member.type[0].sword.damage_attack , 
                    critical: cprofile_member.type[0].sword.critical,
                    durability: cprofile_member.type[0].sword.durability -= 2,
                    level_upgade: cprofile_member.type[0].sword.level_upgade,
                },
                armor_head: {
                    name: cprofile_member.type[0].armor_head.name,
                    emoji: cprofile_member.type[0].armor_head.emoji,
                    status: cprofile_member.type[0].armor_head.status,
                    type: cprofile_member.type[0].armor_head.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                },
                armor_body: {
                    name: cprofile_member.type[0].armor_body.name,
                    emoji: cprofile_member.type[0].armor_body.emoji,
                    status: cprofile_member.type[0].armor_body.status,
                    type: cprofile_member.type[0].armor_body.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                },
                armor_leg: {
                    name: cprofile_member.type[0].armor_leg.name,
                    emoji: cprofile_member.type[0].armor_leg.emoji,
                    status: cprofile_member.type[0].armor_leg.status,
                    type: cprofile_member.type[0].armor_leg.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                },
                armor_foot: {
                    name: cprofile_member.type[0].armor_foot.name,
                    emoji: cprofile_member.type[0].armor_foot.emoji,
                    status: cprofile_member.type[0].armor_foot.status,
                    type: cprofile_member.type[0].armor_foot.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                },
            };
            }

            if (cprofile_member.type[0].sword.durability <= 20) {
                interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
            } else if (cprofile_member.type[0].sword.durability <= 4) {
                interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
            }

            if (cprofile_member.type[0].sword.durability == 0) {
                cprofile_member.type[0] = {
                    type: cprofile_member.type[0].type,
                    type_system: cprofile_member.type[0].type_system,
                    emoji: cprofile_member.type[0].emoji,
                    sword: {
                        name: "หมัด",
                        emoji: "✊",
                        status: "default",
                        type: cprofile_member.type[0].sword.type,
                        damage_attack: 1, 
                        critical: 1,
                        durability: 100,
                        level_upgade: 1,
                    },
                    armor_head: {
                        name: cprofile_member.type[0].armor_head.name,
                        emoji: cprofile_member.type[0].armor_head.emoji,
                        status: cprofile_member.type[0].armor_head.status,
                        type: cprofile_member.type[0].armor_head.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_member.type[0].armor_body.name,
                        emoji: cprofile_member.type[0].armor_body.emoji,
                        status: cprofile_member.type[0].armor_body.status,
                        type: cprofile_member.type[0].armor_body.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_member.type[0].armor_leg.name,
                        emoji: cprofile_member.type[0].armor_leg.emoji,
                        status: cprofile_member.type[0].armor_leg.status,
                        type: cprofile_member.type[0].armor_leg.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_member.type[0].armor_foot.name,
                        emoji: cprofile_member.type[0].armor_foot.emoji,
                        status: cprofile_member.type[0].armor_foot.status,
                        type: cprofile_member.type[0].armor_foot.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                    },
                };
                interaction.followUp({content: `อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว`, ephemeral: true});
            }

            await cprofile_member.save();
            await cprofile_inter.save();

            if (cprofile_inter.health <= 0) 
                cprofile_inter.health = 0;

            
            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
            const health_result_inter = cprofile_inter.health + defence_armor_inter;
           const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter;
            const pet_attack_chack_inter = (health_result_inter  / health_max_result_inter) * 100;
            const pet_attack_result_inter = Math.round(pet_attack_chack_inter);
            if(pet_attack_result_inter <= 0) {
            cprofile_inter.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 10 && pet_attack_result_inter > 0) {
            cprofile_inter.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 20) {
            cprofile_inter.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 30) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 40) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 50) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 60) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 70) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 80) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 90) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
           }  else if(pet_attack_result_inter > 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }

             const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
             const health_result_member = cprofile_member.health + defence_armor_member;
            const health_max_result_member = cprofile_member.health_max + defence_armor_member;
             const pet_attack_chack_member = (health_result_member  / health_max_result_member) * 100;
             const pet_attack_result_member = Math.round(pet_attack_chack_member);
             if(pet_attack_result_member <= 0) {
             cprofile_member.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 10 && pet_attack_result_member > 0) {
             cprofile_member.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 20) {
             cprofile_member.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 30) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 40) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 50) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 60) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 70) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 80) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 90) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(pet_attack_result_member > 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
 

            const attack = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setFields(
                { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
            )
            .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
      
            await interaction.editReply({ content: `${member2} ตาคุณ`, embeds: [attack], components: [row] });

            await cprofile_member.save();
            await cprofile_inter.save();

            if (cprofile_inter.health <= 0) {
                cprofile_inter.health = 0;

                const row_win = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('attack')
                    .setLabel('โจมตี')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),

                    new ButtonBuilder()
                    .setCustomId('defend')
                    .setLabel('ป้องกัน')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                )

                const win = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

                interaction.editReply({ content: `${member1} is a legendary fighter!`, embeds: [win], files: [], components: [row_win]})
                         // Delete pending request
                delete pendings[defender.id];
                await cprofile_inter.save();
                await cprofile_member.save();
            } else if (cprofile_member.health <= 0) {
                cprofile_member.health = 0;
                const row_lose = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('attack')
                    .setLabel('โจมตี')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),

                    new ButtonBuilder()
                    .setCustomId('defend')
                    .setLabel('ป้องกัน')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                )

                const lose = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

               await interaction.editReply({ content: `${member2} is a legendary fighter!`, embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                // Delete pending request
                delete pendings[defender.id];
            }
      
            isAttackerTurn = false;
          } else {
            const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
            const cprofile_member = await GProfile.findOne({ user: member1.id });

            cprofile_member.health = cprofile_member.health - cprofile_inter.type[0].sword.damage_attack;
            // attack logic for the defender
            if (cprofile_inter.type[0].sword.name == "หมัด") {
                cprofile_inter.type[0] = {
                    type: cprofile_inter.type[0].type,
                    type_system: cprofile_inter.type[0].type_system,
                    emoji: cprofile_inter.type[0].emoji,
                    sword: {
                        name: cprofile_inter.type[0].sword.name,
                        emoji: cprofile_inter.type[0].sword.emoji,
                        status: cprofile_inter.type[0].sword.status,
                        type: cprofile_inter.type[0].sword.type,
                        damage_attack: cprofile_inter.type[0].sword.damage_attack , 
                        critical: cprofile_inter.type[0].sword.critical,
                        durability: cprofile_inter.type[0].sword.durability,
                        level_upgade: cprofile_inter.type[0].sword.level_upgade,
                    },
                    armor_head: {
                        name: cprofile_inter.type[0].armor_head.name,
                        emoji: cprofile_inter.type[0].armor_head.emoji,
                        status: cprofile_inter.type[0].armor_head.status,
                        type: cprofile_inter.type[0].armor_head.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_inter.type[0].armor_body.name,
                        emoji: cprofile_inter.type[0].armor_body.emoji,
                        status: cprofile_inter.type[0].armor_body.status,
                        type: cprofile_inter.type[0].armor_body.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_inter.type[0].armor_leg.name,
                        emoji: cprofile_inter.type[0].armor_leg.emoji,
                        status: cprofile_inter.type[0].armor_leg.status,
                        type: cprofile_inter.type[0].armor_leg.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_inter.type[0].armor_foot.name,
                        emoji: cprofile_inter.type[0].armor_foot.emoji,
                        status: cprofile_inter.type[0].armor_foot.status,
                        type: cprofile_inter.type[0].armor_foot.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                    },
                };
            } else if (cprofile_inter.type[0].sword.name !== "หมัด") {

            cprofile_inter.type[0] = {
                type: cprofile_inter.type[0].type,
                type_system: cprofile_inter.type[0].type_system,
                emoji: cprofile_inter.type[0].emoji,
                sword: {
                    name: cprofile_inter.type[0].sword.name,
                    emoji: cprofile_inter.type[0].sword.emoji,
                    status: cprofile_inter.type[0].sword.status,
                    type: cprofile_inter.type[0].sword.type,
                    damage_attack: cprofile_inter.type[0].sword.damage_attack , 
                    critical: cprofile_inter.type[0].sword.critical,
                    durability: cprofile_inter.type[0].sword.durability -= 2,
                    level_upgade: cprofile_inter.type[0].sword.level_upgade,
                },
                armor_head: {
                    name: cprofile_inter.type[0].armor_head.name,
                    emoji: cprofile_inter.type[0].armor_head.emoji,
                    status: cprofile_inter.type[0].armor_head.status,
                    type: cprofile_inter.type[0].armor_head.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                },
                armor_body: {
                    name: cprofile_inter.type[0].armor_body.name,
                    emoji: cprofile_inter.type[0].armor_body.emoji,
                    status: cprofile_inter.type[0].armor_body.status,
                    type: cprofile_inter.type[0].armor_body.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                },
                armor_leg: {
                    name: cprofile_inter.type[0].armor_leg.name,
                    emoji: cprofile_inter.type[0].armor_leg.emoji,
                    status: cprofile_inter.type[0].armor_leg.status,
                    type: cprofile_inter.type[0].armor_leg.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                },
                armor_foot: {
                    name: cprofile_inter.type[0].armor_foot.name,
                    emoji: cprofile_inter.type[0].armor_foot.emoji,
                    status: cprofile_inter.type[0].armor_foot.status,
                    type: cprofile_inter.type[0].armor_foot.type,
                    defense: cprofile_inter.type[0].armor_head.defense ,
                    defense_max: cprofile_inter.type[0].armor_head.defense_max,
                    durability: cprofile_inter.type[0].armor_head.durability,
                    durability_max: cprofile_inter.type[0].armor_head.durability_max,
                    level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                },
            };
            }

            if (cprofile_inter.type[0].sword.durability <= 20) {
                interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
            } else if (cprofile_inter.type[0].sword.durability <= 4) {
                interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
            }

            if (cprofile_inter.type[0].sword.durability == 0) {
                cprofile_inter.type[0] = {
                    type: cprofile_inter.type[0].type,
                    type_system: cprofile_inter.type[0].type_system,
                    emoji: cprofile_inter.type[0].emoji,
                    sword: {
                        name: "หมัด",
                        emoji: "✊",
                        status: "default",
                        type: cprofile_inter.type[0].sword.type,
                        damage_attack: 1, 
                        critical: 1,
                        durability: 100,
                        level_upgade: 1,
                    },
                    armor_head: {
                        name: cprofile_inter.type[0].armor_head.name,
                        emoji: cprofile_inter.type[0].armor_head.emoji,
                        status: cprofile_inter.type[0].armor_head.status,
                        type: cprofile_inter.type[0].armor_head.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_inter.type[0].armor_body.name,
                        emoji: cprofile_inter.type[0].armor_body.emoji,
                        status: cprofile_inter.type[0].armor_body.status,
                        type: cprofile_inter.type[0].armor_body.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_inter.type[0].armor_leg.name,
                        emoji: cprofile_inter.type[0].armor_leg.emoji,
                        status: cprofile_inter.type[0].armor_leg.status,
                        type: cprofile_inter.type[0].armor_leg.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_inter.type[0].armor_foot.name,
                        emoji: cprofile_inter.type[0].armor_foot.emoji,
                        status: cprofile_inter.type[0].armor_foot.status,
                        type: cprofile_inter.type[0].armor_foot.type,
                        defense: cprofile_inter.type[0].armor_head.defense ,
                        defense_max: cprofile_inter.type[0].armor_head.defense_max,
                        durability: cprofile_inter.type[0].armor_head.durability,
                        durability_max: cprofile_inter.type[0].armor_head.durability_max,
                        level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                    },
                };
                interaction.followUp({content: `อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว`, ephemeral: true});
            }
            if (cprofile_member.type[0].sword.name == "หมัด") {
                cprofile_member.type[0] = {
                    type: cprofile_member.type[0].type,
                    type_system: cprofile_member.type[0].type_system,
                    emoji: cprofile_member.type[0].emoji,
                    sword: {
                        name: cprofile_member.type[0].sword.name,
                        emoji: cprofile_member.type[0].sword.emoji,
                        status: cprofile_member.type[0].sword.status,
                        type: cprofile_member.type[0].sword.type,
                        damage_attack: cprofile_member.type[0].sword.damage_attack , 
                        critical: cprofile_member.type[0].sword.critical,
                        durability: cprofile_member.type[0].sword.durability,
                        level_upgade: cprofile_member.type[0].sword.level_upgade,
                    },
                    armor_head: {
                        name: cprofile_member.type[0].armor_head.name,
                        emoji: cprofile_member.type[0].armor_head.emoji,
                        status: cprofile_member.type[0].armor_head.status,
                        type: cprofile_member.type[0].armor_head.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_member.type[0].armor_body.name,
                        emoji: cprofile_member.type[0].armor_body.emoji,
                        status: cprofile_member.type[0].armor_body.status,
                        type: cprofile_member.type[0].armor_body.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_member.type[0].armor_leg.name,
                        emoji: cprofile_member.type[0].armor_leg.emoji,
                        status: cprofile_member.type[0].armor_leg.status,
                        type: cprofile_member.type[0].armor_leg.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_member.type[0].armor_foot.name,
                        emoji: cprofile_member.type[0].armor_foot.emoji,
                        status: cprofile_member.type[0].armor_foot.status,
                        type: cprofile_member.type[0].armor_foot.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                    },
                };
            } else if (cprofile_member.type[0].sword.name !== "หมัด") {

            cprofile_member.type[0] = {
                type: cprofile_member.type[0].type,
                type_system: cprofile_member.type[0].type_system,
                emoji: cprofile_member.type[0].emoji,
                sword: {
                    name: cprofile_member.type[0].sword.name,
                    emoji: cprofile_member.type[0].sword.emoji,
                    status: cprofile_member.type[0].sword.status,
                    type: cprofile_member.type[0].sword.type,
                    damage_attack: cprofile_member.type[0].sword.damage_attack , 
                    critical: cprofile_member.type[0].sword.critical,
                    durability: cprofile_member.type[0].sword.durability -= 2,
                    level_upgade: cprofile_member.type[0].sword.level_upgade,
                },
                armor_head: {
                    name: cprofile_member.type[0].armor_head.name,
                    emoji: cprofile_member.type[0].armor_head.emoji,
                    status: cprofile_member.type[0].armor_head.status,
                    type: cprofile_member.type[0].armor_head.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                },
                armor_body: {
                    name: cprofile_member.type[0].armor_body.name,
                    emoji: cprofile_member.type[0].armor_body.emoji,
                    status: cprofile_member.type[0].armor_body.status,
                    type: cprofile_member.type[0].armor_body.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                },
                armor_leg: {
                    name: cprofile_member.type[0].armor_leg.name,
                    emoji: cprofile_member.type[0].armor_leg.emoji,
                    status: cprofile_member.type[0].armor_leg.status,
                    type: cprofile_member.type[0].armor_leg.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                },
                armor_foot: {
                    name: cprofile_member.type[0].armor_foot.name,
                    emoji: cprofile_member.type[0].armor_foot.emoji,
                    status: cprofile_member.type[0].armor_foot.status,
                    type: cprofile_member.type[0].armor_foot.type,
                    defense: cprofile_member.type[0].armor_head.defense ,
                    defense_max: cprofile_member.type[0].armor_head.defense_max,
                    durability: cprofile_member.type[0].armor_head.durability,
                    durability_max: cprofile_member.type[0].armor_head.durability_max,
                    level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                },
            };
            }

            if (cprofile_member.type[0].sword.durability <= 20) {
                interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
            } else if (cprofile_member.type[0].sword.durability <= 4) {
                interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
            }

            if (cprofile_member.type[0].sword.durability == 0) {
                cprofile_member.type[0] = {
                    type: cprofile_member.type[0].type,
                    type_system: cprofile_member.type[0].type_system,
                    emoji: cprofile_member.type[0].emoji,
                    sword: {
                        name: "หมัด",
                        emoji: "✊",
                        status: "default",
                        type: cprofile_member.type[0].sword.type,
                        damage_attack: 1, 
                        critical: 1,
                        durability: 100,
                        level_upgade: 1,
                    },
                    armor_head: {
                        name: cprofile_member.type[0].armor_head.name,
                        emoji: cprofile_member.type[0].armor_head.emoji,
                        status: cprofile_member.type[0].armor_head.status,
                        type: cprofile_member.type[0].armor_head.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_head.level_upgade ,
                    },
                    armor_body: {
                        name: cprofile_member.type[0].armor_body.name,
                        emoji: cprofile_member.type[0].armor_body.emoji,
                        status: cprofile_member.type[0].armor_body.status,
                        type: cprofile_member.type[0].armor_body.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_body.level_upgade ,
                    },
                    armor_leg: {
                        name: cprofile_member.type[0].armor_leg.name,
                        emoji: cprofile_member.type[0].armor_leg.emoji,
                        status: cprofile_member.type[0].armor_leg.status,
                        type: cprofile_member.type[0].armor_leg.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_leg.level_upgade ,
                    },
                    armor_foot: {
                        name: cprofile_member.type[0].armor_foot.name,
                        emoji: cprofile_member.type[0].armor_foot.emoji,
                        status: cprofile_member.type[0].armor_foot.status,
                        type: cprofile_member.type[0].armor_foot.type,
                        defense: cprofile_member.type[0].armor_head.defense ,
                        defense_max: cprofile_member.type[0].armor_head.defense_max,
                        durability: cprofile_member.type[0].armor_head.durability,
                        durability_max: cprofile_member.type[0].armor_head.durability_max,
                        level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                    },
                };
                interaction.followUp({content: `อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว`, ephemeral: true});
            }

            await cprofile_member.save();
            await cprofile_inter.save();

            if (cprofile_member.health <= 0) 
                cprofile_member.health = 0;
            
            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
            const health_result_inter = cprofile_inter.health + defence_armor_inter;
           const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter;
            const pet_attack_chack_inter = (health_result_inter  / health_max_result_inter) * 100;
            const pet_attack_result_inter = Math.round(pet_attack_chack_inter);
            if(pet_attack_result_inter <= 0) {
            cprofile_inter.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 10 && pet_attack_result_inter > 0) {
            cprofile_inter.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 20) {
            cprofile_inter.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 30) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 40) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 50) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 60) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 70) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 80) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 90) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
           }  else if(pet_attack_result_inter > 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }

             const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
             const health_result_member = cprofile_member.health + defence_armor_member;
            const health_max_result_member = cprofile_member.health_max + defence_armor_member;
             const pet_attack_chack_member = (health_result_member  / health_max_result_member) * 100;
             const pet_attack_result_member = Math.round(pet_attack_chack_member);
             if(pet_attack_result_member <= 0) {
             cprofile_member.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 10 && pet_attack_result_member > 0) {
             cprofile_member.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 20) {
             cprofile_member.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 30) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 40) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 50) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 60) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 70) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 80) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 90) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(pet_attack_result_member > 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
 

            const attack = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setFields(
                { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
            )
            .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
      
            await interaction.editReply({ content: `${member1} ตาคุณ`,embeds: [attack], components: [row] });

            if (cprofile_member.health <= 0) {
                cprofile_member.health = 0;
                const row_win = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('attack')
                    .setLabel('โจมตี')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),

                    new ButtonBuilder()
                    .setCustomId('defend')
                    .setLabel('ป้องกัน')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                )


                const win = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

                await interaction.editReply({ content: `${member2} is a legendary fighter!`, embeds: [win], files: [], components: [row_win]})
                   // Delete pending request
                delete pendings[defender.id];
                await cprofile_inter.save();
                await cprofile_member.save();
            } else if (cprofile_inter.health <= 0) {
                cprofile_inter.health = 0;
                const row_lose = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('attack')
                    .setLabel('โจมตี')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),

                    new ButtonBuilder()
                    .setCustomId('defend')
                    .setLabel('ป้องกัน')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                )

                const lose = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

               await interaction.editReply({ content: `${member1} is a legendary fighter!`,embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                    // Delete pending request
                delete pendings[defender.id];
            }
      
            isAttackerTurn = true;
          }
        } else if (button.customId === "defend") {
          // defend logic
          await button.deferUpdate();
      
          if (isAttackerTurn) {
              // if defender clicked the button, return reply to the defender
            const newEmbed = new EmbedBuilder()
              .setColor("#bdc6e9")
              .setTitle(`1`)
              .setDescription(`${attacker} ป้องกัน ${defender} แล้ว`);
      
            await interaction.editReply({ embeds: [newEmbed], components: [row] });
      
            isAttackerTurn = false;
          } else {
            // attack logic for the defender
            const newEmbed = new EmbedBuilder()
              .setColor("#bdc6e9")
              .setTitle(`1`)
              .setDescription(`${defender} ป้องกัน ${attacker} แล้ว`);
      
            await interaction.editReply({ embeds: [newEmbed], components: [row] });
      
            isAttackerTurn = true;
          }
        }
      });

















      collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const row_end = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('attack')
                .setLabel('โจมตี')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),

                new ButtonBuilder()
                .setCustomId('defend')
                .setLabel('ป้องกัน')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            )
            const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
            const cprofile_member = await GProfile.findOne({ user: member1.id });

            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
            const health_result_inter = cprofile_inter.health + defence_armor_inter;
           const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter;
            const pet_attack_chack_inter = (health_result_inter  / health_max_result_inter) * 100;
            const pet_attack_result_inter = Math.round(pet_attack_chack_inter);
            if(pet_attack_result_inter <= 0) {
            cprofile_inter.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 10 && pet_attack_result_inter > 0) {
            cprofile_inter.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 20) {
            cprofile_inter.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 30) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 40) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 50) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 60) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 70) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 80) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 90) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
           } else if(pet_attack_result_inter <= 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
           }  else if(pet_attack_result_inter > 100) {
            cprofile_inter.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }

             const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
             const health_result_member = cprofile_member.health + defence_armor_member;
            const health_max_result_member = cprofile_member.health_max + defence_armor_member;
             const pet_attack_chack_member = (health_result_member  / health_max_result_member) * 100;
             const pet_attack_result_member = Math.round(pet_attack_chack_member);
             if(pet_attack_result_member <= 0) {
             cprofile_member.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 10 && pet_attack_result_member > 0) {
             cprofile_member.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 20) {
             cprofile_member.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 30) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 40) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 50) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 60) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 70) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 80) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 90) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(pet_attack_result_member <= 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(pet_attack_result_member > 100) {
             cprofile_member.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
 

            const embed_end = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setFields(
                { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%`, inline: true },
                { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%`, inline: true },
            )
            .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")


                await interaction.editReply({ content: `หมดเวลาการต่อสู้`,embeds: [embed_end], components: [row_end] });
                     // Delete pending request
                delete pendings[defender.id];
            }
    });
        }
}

    
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};
