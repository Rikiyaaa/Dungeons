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

        if (cprofile_inter.stamina > 100) 
            cprofile_inter.stamina = 100;
        if (cprofile_inter.stamina < 0)
            cprofile_inter.stamina = 0;
        if (cprofile_member.stamina > 100)
            cprofile_member.stamina = 100;
        if (cprofile_member.stamina < 0)
            cprofile_member.stamina = 0;


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
        new ButtonBuilder()
            .setCustomId('run')
            .setLabel('หลบ')
            .setStyle(ButtonStyle.Danger),
        )
      
        const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
        const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
       const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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

         const stamina_s_inter = cprofile_inter.stamina_s;
         const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
        const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
         const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
         const result_stamina_inter = Math.round(chack_stamina_inter);
         if(result_stamina_inter <= 0) {
         cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
         cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 20) {
         cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 30) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 40) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 50) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 60) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 70) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 80) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 90) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
        } else if(result_stamina_inter <= 100) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
        }  else if(result_stamina_inter > 100) {
         cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
          }

         const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
         const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
        const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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

          const stamina_s_member = cprofile_member.stamina_s;
          const stamina_member = cprofile_member.stamina + stamina_s_member;
         const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
          const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
          const result_stamina_member = Math.round(chack_stamina_member);
          if(result_stamina_member <= 0) {
            cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
            cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 20) {
            cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 30) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 40) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 50) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 60) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 70) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 80) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 90) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
         } else if(result_stamina_member <= 100) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
         }  else if(result_stamina_member > 100) {
            cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
           }


        const embed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setFields(
            { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
            { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
        )
        .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
      
      const filter = (button) => {
        if (isAttackerTurn) {
          // add attack and defend buttons to the filter
          return button.user.id === attacker.id && (button.customId === "attack" || button.customId === "defend" || button.customId === "run");
        } else {
          return button.user.id === defender.id && (button.customId === "attack" || button.customId === "defend" || button.customId === "run");
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

            const damage_member = cprofile_member.type[0].sword.damage_attack + cprofile_member.attack;
            cprofile_inter.health = cprofile_inter.health - damage_member;

            cprofile_member.stamina = cprofile_member.stamina - cprofile_member.type[0].sword.use_stamina;
            if (cprofile_member.stamina < cprofile_member.type[0].sword.use_stamina) {
                row.components[0].setDisabled(true);
                row.components[1].setDisabled(false);
                row.components[2].setDisabled(false);
            } else {
                row.components[0].setDisabled(false);
                row.components[1].setDisabled(false);
                row.components[2].setDisabled(false);
            }

            cprofile_inter.stamina = cprofile_inter.stamina + 15;
            if (cprofile_inter.stamina > 100) 
                cprofile_inter.stamina = 100;
            if (cprofile_inter.stamina < 0)
                cprofile_inter.stamina = 0;


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
                        use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                    use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        use_stamina: 1,
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
                        use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                    use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                        use_stamina: 1,
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
                const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
               const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
        
                 const stamina_s_inter = cprofile_inter.stamina_s;
                 const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
                const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
                 const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                 const result_stamina_inter = Math.round(chack_stamina_inter);
                 if(result_stamina_inter <= 0) {
                 cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                 cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 20) {
                 cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 30) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 40) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 50) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 60) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 70) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 80) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 90) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                }  else if(result_stamina_inter > 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                  }
        
                 const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
                 const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
                const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
        
                  const stamina_s_member = cprofile_member.stamina_s;
                  const stamina_member = cprofile_member.stamina + stamina_s_member;
                 const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
                  const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
                  const result_stamina_member = Math.round(chack_stamina_member);
                  if(result_stamina_member <= 0) {
                    cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                    cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 20) {
                    cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 30) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 40) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 50) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 60) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 70) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 80) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 90) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                 }  else if(result_stamina_member > 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }
        
        
                const attack = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )

                const win = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )

                const lose = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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

            const damage_inter = cprofile_inter.type[0].sword.damage_attack + cprofile_inter.attack;
            cprofile_member.health = cprofile_member.health - damage_inter;

            cprofile_inter.stamina = cprofile_inter.stamina - cprofile_inter.type[0].sword.use_stamina;
            if (cprofile_inter.stamina < cprofile_inter.type[0].sword.use_stamina) {
                row.components[0].setDisabled(true);
                row.components[1].setDisabled(false);
                row.components[2].setDisabled(false);
            } else {
                row.components[0].setDisabled(false);
                row.components[1].setDisabled(false);
                row.components[2].setDisabled(false);
            }

            cprofile_member.stamina = cprofile_member.stamina + 15;
            if (cprofile_member.stamina > 100) 
            cprofile_member.stamina = 100;
            if (cprofile_member.stamina < 0)
            cprofile_member.stamina = 0;
            
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
                        use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                    use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        use_stamina: 1,
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
                        use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                    use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                        use_stamina: 1,
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
                const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
               const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
        
                 const stamina_s_inter = cprofile_inter.stamina_s;
                 const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
                const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
                 const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                 const result_stamina_inter = Math.round(chack_stamina_inter);
                 if(result_stamina_inter <= 0) {
                 cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                 cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 20) {
                 cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 30) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 40) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 50) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 60) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 70) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 80) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 90) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                }  else if(result_stamina_inter > 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                  }
        
                 const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
                 const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
                const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
        
                  const stamina_s_member = cprofile_member.stamina_s;
                  const stamina_member = cprofile_member.stamina + stamina_s_member;
                 const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
                  const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
                  const result_stamina_member = Math.round(chack_stamina_member);
                  if(result_stamina_member <= 0) {
                    cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                    cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 20) {
                    cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 30) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 40) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 50) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 60) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 70) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 80) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 90) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                 }  else if(result_stamina_member > 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }
        
        
                const attack = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
      
            await interaction.editReply({ content: `${member1} ตาคุณ`,embeds: [attack], components: [row] });

            if (cprofile_member.health <= 0) {
                cprofile_member.health = 0;

                cprofile_inter.stamina = cprofile_inter.stamina_max;
                cprofile_member.stamina = cprofile_member.stamina_max;
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )


                const win = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

                await interaction.editReply({ content: `${member2} is a legendary fighter!`, embeds: [win], files: [], components: [row_win]})
                   // Delete pending request
                delete pendings[defender.id];
                await cprofile_inter.save();
                await cprofile_member.save();
            } else if (cprofile_inter.health <= 0) {
                cprofile_inter.health = 0;

                cprofile_inter.stamina = cprofile_inter.stamina_max;
                cprofile_member.stamina = cprofile_member.stamina_max;

                    
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                    
                )

                const lose = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

               await interaction.editReply({ content: `${member1} is a legendary fighter!`,embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                    // Delete pending request
                delete pendings[defender.id];
                await cprofile_inter.save();
                await cprofile_member.save();
            }
      
            isAttackerTurn = true;
          }
        } else if (button.customId === "defend") {
            await button.deferUpdate();
      
            if (isAttackerTurn) {
              const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
              const cprofile_member = await GProfile.findOne({ user: member1.id });

           const damage_inter = cprofile_inter.type[0].sword.damage_attack + cprofile_inter.attack;
           cprofile_member.health = cprofile_member.health - (damage_inter * 0.5);


              if (cprofile_member.stamina < cprofile_member.type[0].sword.use_stamina) {
                  row.components[0].setDisabled(true);
                  row.components[1].setDisabled(false);
                  row.components[2].setDisabled(false);
              } else {
                  row.components[0].setDisabled(false);
                  row.components[1].setDisabled(false);
                  row.components[2].setDisabled(false);
              }
  
              cprofile_member.stamina = cprofile_member.stamina + 15;
              if (cprofile_member.stamina > 100) 
              cprofile_member.stamina = 100;
              if (cprofile_member.stamina < 0)
              cprofile_member.stamina = 0;
  
  
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                      use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          use_stamina: 1,
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
                          use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                      use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                          use_stamina: 1,
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
                  const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
                 const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
          
                   const stamina_s_inter = cprofile_inter.stamina_s;
                   const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
                  const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
                   const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                   const result_stamina_inter = Math.round(chack_stamina_inter);
                   if(result_stamina_inter <= 0) {
                   cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                   cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 20) {
                   cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 30) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 40) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 50) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 60) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 70) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 80) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 90) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 100) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                  }  else if(result_stamina_inter > 100) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }
          
                   const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
                   const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
                  const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
          
                    const stamina_s_member = cprofile_member.stamina_s;
                    const stamina_member = cprofile_member.stamina + stamina_s_member;
                   const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
                    const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
                    const result_stamina_member = Math.round(chack_stamina_member);
                    if(result_stamina_member <= 0) {
                      cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                      cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 20) {
                      cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 30) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 40) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 50) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 60) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 70) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 80) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 90) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 100) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(result_stamina_member > 100) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }
          
          
                  const attack = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                  )
                  .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
        
              await interaction.editReply({ content: `${member2} ตาคุณ`, embeds: [attack], components: [row] });

               
              const armor_result_member = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
              const armor_random_member = armor_result_member[Math.floor(Math.random() * armor_result_member.length)]
              if (armor_random_member == "armor_head") {
                  if(cprofile_inter.type[0].armor_head.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                  } else if (cprofile_inter.type[0].armor_head.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_member == "armor_body") {
                  if(cprofile_inter.type[0].armor_body.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                  } else if (cprofile_inter.type[0].armor_body.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_inter == "armor_leg") {
                  if(cprofile_inter.type[0].armor_leg.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability ,
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
                  } else if (cprofile_inter.type[0].armor_leg.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_member == "armor_foot") {
                  if(cprofile_inter.type[0].armor_foot.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability ,
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
                  } else if (cprofile_inter.type[0].armor_foot.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              }

              if (cprofile_inter.type[0].armor_head.durability <= 20) {
                  return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_body.durability <= 20) {
                  return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_leg.durability <= 20) {
                  return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_foot.durability <= 20) {
                  return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } 

              if (cprofile_inter.type[0].armor_head.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
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
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_body.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_body.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
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
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_leg.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_leg.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
                      },
                      armor_foot: {
                          name: cprofile_inter.type[0].armor_foot.name,
                          emoji: cprofile_inter.type[0].armor_foot.emoji,
                          status: cprofile_inter.type[0].armor_foot.status,
                          type: cprofile_inter.type[0].armor_foot.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_foot.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_foot.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
                      },
                  };
                   interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              }

               
                    const armor_result_inter = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random_inter = armor_result_inter[Math.floor(Math.random() * armor_result_inter.length)]
                    if (armor_random_inter == "armor_head") {
                        if(cprofile_member.type[0].armor_head.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        } else if (cprofile_member.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_body") {
                        if(cprofile_member.type[0].armor_body.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        } else if (cprofile_member.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_leg") {
                        if(cprofile_member.type[0].armor_leg.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability ,
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
                        } else if (cprofile_member.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_foot") {
                        if(cprofile_member.type[0].armor_foot.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability ,
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
                        } else if (cprofile_member.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    }

                    if (cprofile_member.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile_member.type[0].armor_head.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
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
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_body.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
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
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_leg.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile_member.type[0].armor_foot.name,
                                emoji: cprofile_member.type[0].armor_foot.emoji,
                                status: cprofile_member.type[0].armor_foot.status,
                                type: cprofile_member.type[0].armor_foot.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_foot.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
  
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
  
                      new ButtonBuilder()
                      .setCustomId('run')
                      .setLabel('หลบ')
                      .setStyle(ButtonStyle.Danger)
                      .setDisabled(true),
                  )
  
                  const win = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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
  
                      new ButtonBuilder()
                      .setCustomId('run')
                      .setLabel('หลบ')
                      .setStyle(ButtonStyle.Danger)
                      .setDisabled(true),
                  )
  
                  const lose = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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
  
              const damage_member = cprofile_member.type[0].sword.damage_attack + cprofile_member.attack;
             cprofile_inter.health = cprofile_inter.health - (damage_member * 0.5);


              if (cprofile_inter.stamina < cprofile_inter.type[0].sword.use_stamina) {
                  row.components[0].setDisabled(true);
                  row.components[1].setDisabled(false);
                  row.components[2].setDisabled(false);
              } else {
                  row.components[0].setDisabled(false);
                  row.components[1].setDisabled(false);
                  row.components[2].setDisabled(false);
              }
  
              cprofile_inter.stamina = cprofile_inter.stamina + 15;
              if (cprofile_inter.stamina > 100) 
              cprofile_inter.stamina = 100;
              if (cprofile_inter.stamina < 0)
              cprofile_inter.stamina = 0;
              
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                      use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          use_stamina: 1,
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
                          use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                      use_stamina: cprofile_member.type[0].sword.use_stamina,
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
                          use_stamina: 1,
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
                  const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
                 const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
          
                   const stamina_s_inter = cprofile_inter.stamina_s;
                   const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
                  const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
                   const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                   const result_stamina_inter = Math.round(chack_stamina_inter);
                   if(result_stamina_inter <= 0) {
                   cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                   cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 20) {
                   cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 30) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 40) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 50) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 60) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 70) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 80) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 90) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                  } else if(result_stamina_inter <= 100) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                  }  else if(result_stamina_inter > 100) {
                   cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }
          
                   const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
                   const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
                  const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
          
                    const stamina_s_member = cprofile_member.stamina_s;
                    const stamina_member = cprofile_member.stamina + stamina_s_member;
                   const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
                    const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
                    const result_stamina_member = Math.round(chack_stamina_member);
                    if(result_stamina_member <= 0) {
                      cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                      cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 20) {
                      cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 30) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 40) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 50) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 60) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 70) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 80) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 90) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(result_stamina_member <= 100) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(result_stamina_member > 100) {
                      cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }
          
          
                  const attack = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                  )
                  .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
        
              await interaction.editReply({ content: `${member1} ตาคุณ`,embeds: [attack], components: [row] });

               
              const armor_result_member = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
              const armor_random_member = armor_result_member[Math.floor(Math.random() * armor_result_member.length)]
              if (armor_random_member == "armor_head") {
                  if(cprofile_inter.type[0].armor_head.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                  } else if (cprofile_inter.type[0].armor_head.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_member == "armor_body") {
                  if(cprofile_inter.type[0].armor_body.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                  } else if (cprofile_inter.type[0].armor_body.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_inter == "armor_leg") {
                  if(cprofile_inter.type[0].armor_leg.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability ,
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
                  } else if (cprofile_inter.type[0].armor_leg.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              } else if (armor_random_member == "armor_foot") {
                  if(cprofile_inter.type[0].armor_foot.name == "ไม่มี") {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability ,
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
                  } else if (cprofile_inter.type[0].armor_foot.name !== "ไม่มี"){
                      const damage_monter = monter_data.damage_attack / 2
                  const damage_result = Math.round(damage_monter);
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: cprofile_inter.type[0].armor_head.name,
                          emoji: cprofile_inter.type[0].armor_head.emoji,
                          status: cprofile_inter.type[0].armor_head.status,
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
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
              }

              if (cprofile_inter.type[0].armor_head.durability <= 20) {
                  return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_body.durability <= 20) {
                  return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_leg.durability <= 20) {
                  return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } else if (cprofile_inter.type[0].armor_foot.durability <= 20) {
                  return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
              } 

              if (cprofile_inter.type[0].armor_head.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
                          level_upgade: cprofile_inter.type[0].sword.level_upgade,
                      },
                      armor_head: {
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_head.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
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
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_body.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_body.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
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
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_leg.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_leg.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
                      },
                      armor_foot: {
                          name: cprofile_inter.type[0].armor_foot.name,
                          emoji: cprofile_inter.type[0].armor_foot.emoji,
                          status: cprofile_inter.type[0].armor_foot.status,
                          type: cprofile_inter.type[0].armor_foot.type,
                          defense: cprofile_inter.type[0].armor_head.defense ,
                          defense_max: cprofile_inter.type[0].armor_head.defense_max,
                          durability: cprofile_inter.type[0].armor_head.durability -= damage_result,
                          durability_max: cprofile_inter.type[0].armor_head.durability_max,
                          level_upgade: cprofile_inter.type[0].armor_foot.level_upgade ,
                      },
                  };
                  interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              } else if (cprofile_inter.type[0].armor_foot.durability <= 0) {
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
                          use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                          name: "ไม่มี",
                          emoji: "🚫",
                          status: "default",
                          type: cprofile_inter.type[0].armor_foot.type,
                          defense: 0,
                          defense_max: 100,
                          durability: 100,
                          durability_max: 100,
                          level_upgade: 1,
                      },
                  };
                   interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
              }

               
                    const armor_result_inter = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random_inter = armor_result_inter[Math.floor(Math.random() * armor_result_inter.length)]
                    if (armor_random_inter == "armor_head") {
                        if(cprofile_member.type[0].armor_head.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        } else if (cprofile_member.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_body") {
                        if(cprofile_member.type[0].armor_body.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                        } else if (cprofile_member.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_leg") {
                        if(cprofile_member.type[0].armor_leg.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability ,
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
                        } else if (cprofile_member.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    } else if (armor_random_inter == "armor_foot") {
                        if(cprofile_member.type[0].armor_foot.name == "ไม่มี") {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability ,
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
                        } else if (cprofile_member.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile_member.type[0].armor_head.name,
                                emoji: cprofile_member.type[0].armor_head.emoji,
                                status: cprofile_member.type[0].armor_head.status,
                                type: cprofile_member.type[0].armor_head.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
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
                    }

                    if (cprofile_member.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile_member.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile_member.type[0].armor_head.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
                                level_upgade: cprofile_member.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
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
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_body.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
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
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_leg.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile_member.type[0].armor_foot.name,
                                emoji: cprofile_member.type[0].armor_foot.emoji,
                                status: cprofile_member.type[0].armor_foot.status,
                                type: cprofile_member.type[0].armor_foot.type,
                                defense: cprofile_member.type[0].armor_head.defense ,
                                defense_max: cprofile_member.type[0].armor_head.defense_max,
                                durability: cprofile_member.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile_member.type[0].armor_head.durability_max,
                                level_upgade: cprofile_member.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile_member.type[0].armor_foot.durability <= 0) {
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
                                use_stamina: cprofile_inter.type[0].sword.use_stamina,
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
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile_member.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
  

              
              if (cprofile_member.health <= 0) {
                  cprofile_member.health = 0;
  
                  cprofile_inter.stamina = cprofile_inter.stamina_max;
                  cprofile_member.stamina = cprofile_member.stamina_max;
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
  
                      new ButtonBuilder()
                      .setCustomId('run')
                      .setLabel('หลบ')
                      .setStyle(ButtonStyle.Danger)
                      .setDisabled(true),
                  )
  
  
                  const win = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                  )
                  .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
  
                  await interaction.editReply({ content: `${member2} is a legendary fighter!`, embeds: [win], files: [], components: [row_win]})
                     // Delete pending request
                  delete pendings[defender.id];
                  await cprofile_inter.save();
                  await cprofile_member.save();
              } else if (cprofile_inter.health <= 0) {
                  cprofile_inter.health = 0;
  
                  cprofile_inter.stamina = cprofile_inter.stamina_max;
                  cprofile_member.stamina = cprofile_member.stamina_max;
  
                      
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
  
                      new ButtonBuilder()
                      .setCustomId('run')
                      .setLabel('หลบ')
                      .setStyle(ButtonStyle.Danger)
                      .setDisabled(true),
                      
                  )
  
                  const lose = new EmbedBuilder()
                  .setColor("#bdc6e9")
                  .setFields(
                      { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                      { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                  )
                  .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")
  
                 await interaction.editReply({ content: `${member1} is a legendary fighter!`,embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                      // Delete pending request
                  delete pendings[defender.id];
                  await cprofile_inter.save();
                  await cprofile_member.save();
              }
        
              isAttackerTurn = true;
            }
        } else if (button.customId === "run") {
            await button.deferUpdate();

            if (isAttackerTurn) {
            const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
            const cprofile_member = await GProfile.findOne({ user: member1.id });
            const profile_inter = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
            const profile_member = await Member.findOne({ guild: interaction.guild.id, user: member1.id });

            profile_inter.battled_win = profile_inter.battled_win + 1;
            profile_member.battled_lose = profile_member.battled_lose + 1;

            cprofile_inter.stamina = cprofile_inter.stamina_max;
            cprofile_member.stamina = cprofile_member.stamina_max;

            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
                const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
               const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
        
                 const stamina_s_inter = cprofile_inter.stamina_s;
                 const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
                const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
                 const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                 const result_stamina_inter = Math.round(chack_stamina_inter);
                 if(result_stamina_inter <= 0) {
                 cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                 cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 20) {
                 cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 30) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 40) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 50) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 60) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 70) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 80) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 90) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                } else if(result_stamina_inter <= 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                }  else if(result_stamina_inter > 100) {
                 cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                  }
        
                 const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
                 const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
                const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
        
                  const stamina_s_member = cprofile_member.stamina_s;
                  const stamina_member = cprofile_member.stamina + stamina_s_member;
                 const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
                  const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
                  const result_stamina_member = Math.round(chack_stamina_member);
                  if(result_stamina_member <= 0) {
                    cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                    cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 20) {
                    cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 30) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 40) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 50) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 60) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 70) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 80) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 90) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                 } else if(result_stamina_member <= 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                 }  else if(result_stamina_member > 100) {
                    cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }
    

            const row_run = new ActionRowBuilder()
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )


                const run = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

            await interaction.editReply({ content: `${member1} ยอมเเพ้`, embeds: [run], files: [], components: [row_run]})

            await cprofile_inter.save();
            await cprofile_member.save();
            // Delete pending request
            delete pendings[defender.id];
            isAttackerTurn = false;
            collector.stop();
        } else {
            const cprofile_inter = await GProfile.findOne({ user: interaction.user.id });
            const cprofile_member = await GProfile.findOne({ user: member1.id });
            const profile_inter = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
            const profile_member = await Member.findOne({ guild: interaction.guild.id, user: member1.id });

            profile_member.battled_win = profile_member.battled_win + 1;
            profile_inter.battled_lose = profile_inter.battled_lose + 1;

            cprofile_inter.stamina = cprofile_inter.stamina_max;
            cprofile_member.stamina = cprofile_member.stamina_max;

            

            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
            const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
           const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
    
             const stamina_s_inter = cprofile_inter.stamina_s;
             const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
            const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
             const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
             const result_stamina_inter = Math.round(chack_stamina_inter);
             if(result_stamina_inter <= 0) {
             cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
             cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 20) {
             cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 30) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 40) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 50) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 60) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 70) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 80) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 90) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 100) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(result_stamina_inter > 100) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
    
             const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
             const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
            const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
    
              const stamina_s_member = cprofile_member.stamina_s;
              const stamina_member = cprofile_member.stamina + stamina_s_member;
             const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
              const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
              const result_stamina_member = Math.round(chack_stamina_member);
              if(result_stamina_member <= 0) {
                cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 20) {
                cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 30) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 40) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 50) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 60) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 70) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 80) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 90) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 100) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_member > 100) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }

            const row_run = new ActionRowBuilder()
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

                    new ButtonBuilder()
                    .setCustomId('run')
                    .setLabel('หลบ')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
                )


            const run = new EmbedBuilder()
            .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
                )
                .setThumbnail("https://cdn.discordapp.com/emojis/860196324570038302.png")

            await interaction.editReply({ content: `${member2} ยอมเเพ้`, embeds: [run], files: [], components: [row_run]})

            await cprofile_inter.save();
            await cprofile_member.save();
            // Delete pending request
            delete pendings[defender.id];
            // stop collector
            isAttackerTurn = true;
            collector.stop();

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

            cprofile_inter.stamina = cprofile_inter.stamina_max;
            cprofile_member.stamina = cprofile_member.stamina_max;

            const defence_armor_inter = cprofile_inter.type[0].armor_head.defense + cprofile_inter.type[0].armor_body.defense +  cprofile_inter.type[0].armor_leg.defense + cprofile_inter.type[0].armor_foot.defense;
            const health_result_inter = cprofile_inter.health + defence_armor_inter + cprofile_inter.defense;
           const health_max_result_inter = cprofile_inter.health_max + defence_armor_inter + cprofile_inter.defense;
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
    
             const stamina_s_inter = cprofile_inter.stamina_s;
             const stamina_inter = cprofile_inter.stamina + stamina_s_inter;
            const stamina_max_inter = cprofile_inter.stamina_max + stamina_s_inter ;
             const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
             const result_stamina_inter = Math.round(chack_stamina_inter);
             if(result_stamina_inter <= 0) {
             cprofile_inter.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
             cprofile_inter.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 20) {
             cprofile_inter.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 30) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 40) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 50) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 60) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 70) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 80) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 90) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
            } else if(result_stamina_inter <= 100) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
            }  else if(result_stamina_inter > 100) {
             cprofile_inter.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
              }
    
             const defence_armor_member = cprofile_member.type[0].armor_head.defense + cprofile_member.type[0].armor_body.defense +  cprofile_member.type[0].armor_leg.defense + cprofile_member.type[0].armor_foot.defense;
             const health_result_member = cprofile_member.health + defence_armor_member + cprofile_member.defense;
            const health_max_result_member = cprofile_member.health_max + defence_armor_member + cprofile_member.defense;
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
    
              const stamina_s_member = cprofile_member.stamina_s;
              const stamina_member = cprofile_member.stamina + stamina_s_member;
             const stamina_max_member = cprofile_member.stamina_max + stamina_s_member ;
              const chack_stamina_member = (stamina_member  / stamina_max_member) * 100;
              const result_stamina_member = Math.round(chack_stamina_member);
              if(result_stamina_member <= 0) {
                cprofile_member.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 10 && result_stamina_member > 0) {
                cprofile_member.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 20) {
                cprofile_member.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 30) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 40) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 50) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 60) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 70) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 80) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 90) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_member <= 100) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_member > 100) {
                cprofile_member.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }
 

            const embed_end = new EmbedBuilder()
            .setColor("#bdc6e9")
                .setFields(
                    { name: `${cprofile_inter.username}`, value: `❤️${cprofile_inter.health_emoji} ${pet_attack_result_inter}%\n💙${cprofile_inter.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                    { name: `${cprofile_member.username}`, value: `❤️${cprofile_member.health_emoji} ${pet_attack_result_member}%\n💙${cprofile_member.stamina_emoji} ${result_stamina_member}%`, inline: true },
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
