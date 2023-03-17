const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../settings/defaults.js");
const Ginv = require("../../settings/models/inventory.js");
const GMonter = require("../../settings/models/monter.js");
const GProfile = require("../../settings/models/cradprofile.js");
const delay = require("delay"); 

module.exports = { 
    name: ["fram"],
    description: "fram",
    run: async (client, interaction) => {

        const waitembed = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setTitle("กำลังค้นหามอนเตอร์ | กรุณารอสักครู่... ")

        await interaction.reply({ embeds: [waitembed], ephemeral: true });

          const cprofile = await GProfile.findOne({ user: interaction.user.id });
          
        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });


        const nohealth = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription("คุณต้องรักษาสุขภาพก่อนใช้คำสั่งนี้")

        if (cprofile.health <= 0) return interaction.editReply({ embeds: [nohealth], ephemeral: true });


        const nosword = new EmbedBuilder()
        .setColor("#bdc6e9")
        .setDescription("อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้ออาวุธใหม่")

        if (cprofile.type[0].sword.durability <= 0) return interaction.editReply({ embeds: [nosword], ephemeral: true });
        

        const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if(profile.location == "ที่ราบป่าสีเขียว") {
            const name_monter = config.monter[0].green_forest_plains.map(x => x.name);
        const random = Math.floor(Math.random() * name_monter.length);
        const monter_name = name_monter[random];

        const monter = config.monter[0].green_forest_plains.find(x => x.name === monter_name);

        const monter_name_get = monter.name;
        const monter_type = monter.type;
        const monter_level = monter.level;
        const monter_image = monter.image;
        const monter_damage = monter.damage_attack;
        const monter_health = monter.health;    
        const monter_health_max = monter.health_max;
        const monter_health_emoji = monter.health_emoji;
        const monter_exp = monter.exp;
        const monter_location = monter.location;
        const monter_location_image = monter.location_image;
        const monter_drop_name = monter.drop_name;
        const monter_drop_type = monter.drop_type;
        const monter_drop_image = monter.drop_image;


            monter_data.name = monter_name_get;
            monter_data.type = monter_type;
            monter_data.level = monter_level;
            monter_data.image = monter_image;
            monter_data.damage_attack = monter_damage;
            monter_data.health = monter_health;
            monter_data.health_max = monter_health_max;
            monter_data.health_emoji = monter_health_emoji;
            monter_data.exp = monter_exp;
            monter_data.location = monter_location;
            monter_data.location_image = monter_location_image;
            monter_data.drop = [
                {
                    name: monter_drop_name,
                    type: monter_drop_type,
                    image: monter_drop_image,
                }
            ];
    
    
            await monter_data.save();

             //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย

             if (cprofile.stamina > 100) 
             cprofile.stamina = 100;
             if (cprofile.stamina < 0)
             cprofile.stamina = 0;

             const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

              const stamina_s_inter =  cprofile.stamina_s;
              const stamina_inter =  cprofile.stamina + stamina_s_inter;
             const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
              const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
              const result_stamina_inter = Math.round(chack_stamina_inter);
              if(result_stamina_inter <= 0) {
               cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
               cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 20) {
               cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 30) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 40) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 50) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 60) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 70) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 80) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 90) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_inter > 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`1`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

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
            .setStyle(ButtonStyle.Danger)
        )


        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 * 2});
    
        const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
    
        collector.on('collect', async (menu) => {
            if(menu.isButton()) {
                if(menu.customId === "attack") {
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                    const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์
                    const damage_cprofile = cprofile.type[0].sword.damage_attack + cprofile.attack;
                    monter_data.health =  monter_data.health - damage_cprofile;

                    cprofile.stamina = cprofile.stamina - cprofile.type[0].sword.use_stamina;

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }

                    if (cprofile.type[0].sword.name == "หมัด") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                    } else if (cprofile.type[0].sword.name !== "หมัด") {
                    cprofile.type[0] = {
                        type: cprofile.type[0].type,
                        type_system: cprofile.type[0].type_system,
                        emoji: cprofile.type[0].emoji,
                        sword: {
                            name: cprofile.type[0].sword.name,
                            emoji: cprofile.type[0].sword.emoji,
                            status: cprofile.type[0].sword.status,
                            type: cprofile.type[0].sword.type,
                            damage_attack: cprofile.type[0].sword.damage_attack , 
                            critical: cprofile.type[0].sword.critical,
                            durability: cprofile.type[0].sword.durability -= 2,
                            use_stamina: cprofile.type[0].sword.use_stamina,
                            level_upgade: cprofile.type[0].sword.level_upgade,
                        },
                        armor_head: {
                            name: cprofile.type[0].armor_head.name,
                            emoji: cprofile.type[0].armor_head.emoji,
                            status: cprofile.type[0].armor_head.status,
                            type: cprofile.type[0].armor_head.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_head.level_upgade ,
                        },
                        armor_body: {
                            name: cprofile.type[0].armor_body.name,
                            emoji: cprofile.type[0].armor_body.emoji,
                            status: cprofile.type[0].armor_body.status,
                            type: cprofile.type[0].armor_body.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_body.level_upgade ,
                        },
                        armor_leg: {
                            name: cprofile.type[0].armor_leg.name,
                            emoji: cprofile.type[0].armor_leg.emoji,
                            status: cprofile.type[0].armor_leg.status,
                            type: cprofile.type[0].armor_leg.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                        },
                        armor_foot: {
                            name: cprofile.type[0].armor_foot.name,
                            emoji: cprofile.type[0].armor_foot.emoji,
                            status: cprofile.type[0].armor_foot.status,
                            type: cprofile.type[0].armor_foot.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                        },
                    };
                    }

                    if (cprofile.type[0].sword.durability <= 20) {
                        interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
                    } else if (cprofile.type[0].sword.durability <= 4) {
                        interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
                    }

                    if (cprofile.type[0].sword.durability == 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: "หมัด",
                                emoji: "✊",
                                status: "default",
                                type: cprofile.type[0].sword.type,
                                damage_attack: 1, 
                                critical: 1,
                                durability: 100,
                                use_stamina: 1,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp(`อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้ออาวุธใหม่`);
                    }
                    //โจมตีคุณ

                    await monter_data.save();
                    await cprofile.save();
                    
                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }


                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`2`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(2000)

                    cprofile.health = cprofile.health - monter_data.damage_attack;

                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;

                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }

                    await cprofile.save();
                    await monter_data.save();

                    if (cprofile.health <= 0) 
                    cprofile.health = 0;


                    const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result_2 = cprofile.health + defence_armor_2;
                   const health_max_result_2 = cprofile.health_max + defence_armor_2;
                    const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100;
                           const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                           if(pet_attack_result_2 <= 0) {
                           cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                           cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 20) {
                           cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 30) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 40) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 50) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 60) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 70) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 80) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 90) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }  else if(pet_attack_result_2 > 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                            }

                            const stamina_s_inter_2 =  cprofile.stamina_s;
                            const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                           const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                            const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                            const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                            if(result_stamina_inter_2 <= 0) {
                             cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                             cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 20) {
                             cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 30) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 40) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 50) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 60) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 70) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 80) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 90) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                           }  else if(result_stamina_inter_2 > 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                             }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`3`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });
                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`4`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result_2}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`5`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                        await interaction.editReply({ embeds: [embed], files: [], components: [row] , ephemeral: true });
                    } 

                } else if (menu.customId === "run") {
                    await menu.deferUpdate();
                    const run = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(` \`\`\` - คุณหลบมอนเตอร์ \`\`\` `)

                    interaction.editReply({ embeds: [run], files: [], components: [], ephemeral: true})
                    await monter_data.deleteOne();
                    cprofile.stamina = cprofile.stamina_max;
                    await cprofile.save();
                    collector.stop();
                } else if (menu.customId === "defend"){
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                      const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์

                    await monter_data.save();
                    await cprofile.save();

                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result = cprofile.health + defence_armor;
                   const health_max_result = cprofile.health_max + defence_armor;
                    const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`6`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(3000)

                    cprofile.health = cprofile.health - (monter_data.damage_attack * 0.4);

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }
        
                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;
                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
                    //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย
                    //ค่า durability ของชุดเกราะ จะถูกสุ่มลดครึ่งนึงของ damage ที่มอนเตอร์ทำ
                    //ค่า status ที่อัพจะเพิ่มค่า str def luk ให้ผู้เล่น status ละ 2
                    if (cprofile.health <= 0) 
                        cprofile.health = 0;

                        await cprofile.save();
                        await monter_data.save();

                       const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result_2 = cprofile.health + defence_armor_2;
                       const health_max_result_2 = cprofile.health_max + defence_armor_2;
                        const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100; 
                        const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                        if(pet_attack_result_2 <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_attack_result_2 > 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }

                          const stamina_s_inter_2 =  cprofile.stamina_s;
                     const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                    const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                     const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                     const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                     if(result_stamina_inter_2 <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter_2 > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`7`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });

                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`8`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result = cprofile.health + defence_armor;
                       const health_max_result = cprofile.health_max + defence_armor;
                        const pet_attack_chack = (health_result  / health_max_result) * 100;
                        const pet_attack_result = Math.round(pet_attack_chack);
                        if(pet_attack_result <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`9`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                       await  interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
                    } 

                } 
            }
     });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {

                const cprofile = await GProfile.findOne({ user: interaction.user.id });
                const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`10`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`มอนเตอร์ ${monter_name_get} หนีไปเเล้ว!!`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
        cprofile.stamina = cprofile.stamina_max;
        await cprofile.save();
            }
        });
        } else if(profile.location == "ที่ราบสูงป่าสีเขียว") {
            const name_monter = config.monter[0].green_forest_plateau.map(x => x.name);
        const random = Math.floor(Math.random() * name_monter.length);
        const monter_name = name_monter[random];

        const monter = config.monter[0].green_forest_plains.find(x => x.name === monter_name);

        const monter_name_get = monter.name;
        const monter_type = monter.type;
        const monter_level = monter.level;
        const monter_image = monter.image;
        const monter_damage = monter.damage_attack;
        const monter_health = monter.health;    
        const monter_health_max = monter.health_max;
        const monter_health_emoji = monter.health_emoji;
        const monter_exp = monter.exp;
        const monter_location = monter.location;
        const monter_location_image = monter.location_image;
        const monter_drop_name = monter.drop_name;
        const monter_drop_type = monter.drop_type;
        const monter_drop_image = monter.drop_image;


            monter_data.name = monter_name_get;
            monter_data.type = monter_type;
            monter_data.level = monter_level;
            monter_data.image = monter_image;
            monter_data.damage_attack = monter_damage;
            monter_data.health = monter_health;
            monter_data.health_max = monter_health_max;
            monter_data.health_emoji = monter_health_emoji;
            monter_data.exp = monter_exp;
            monter_data.location = monter_location;
            monter_data.location_image = monter_location_image;
            monter_data.drop = [
                {
                    name: monter_drop_name,
                    type: monter_drop_type,
                    image: monter_drop_image,
                }
            ];
    
    
            await monter_data.save();

             //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย

             if (cprofile.stamina > 100) 
             cprofile.stamina = 100;
             if (cprofile.stamina < 0)
             cprofile.stamina = 0;

             const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

              const stamina_s_inter =  cprofile.stamina_s;
              const stamina_inter =  cprofile.stamina + stamina_s_inter;
             const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
              const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
              const result_stamina_inter = Math.round(chack_stamina_inter);
              if(result_stamina_inter <= 0) {
               cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
               cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 20) {
               cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 30) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 40) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 50) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 60) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 70) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 80) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 90) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_inter > 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`1`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

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
            .setStyle(ButtonStyle.Danger)
        )


        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 * 2});
    
        const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
    
        collector.on('collect', async (menu) => {
            if(menu.isButton()) {
                if(menu.customId === "attack") {
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                    const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์
                    const damage_cprofile = cprofile.type[0].sword.damage_attack + cprofile.attack;
                    monter_data.health =  monter_data.health - damage_cprofile;

                    cprofile.stamina = cprofile.stamina - cprofile.type[0].sword.use_stamina;

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }

                    if (cprofile.type[0].sword.name == "หมัด") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                    } else if (cprofile.type[0].sword.name !== "หมัด") {
                    cprofile.type[0] = {
                        type: cprofile.type[0].type,
                        type_system: cprofile.type[0].type_system,
                        emoji: cprofile.type[0].emoji,
                        sword: {
                            name: cprofile.type[0].sword.name,
                            emoji: cprofile.type[0].sword.emoji,
                            status: cprofile.type[0].sword.status,
                            type: cprofile.type[0].sword.type,
                            damage_attack: cprofile.type[0].sword.damage_attack , 
                            critical: cprofile.type[0].sword.critical,
                            durability: cprofile.type[0].sword.durability -= 2,
                            use_stamina: cprofile.type[0].sword.use_stamina,
                            level_upgade: cprofile.type[0].sword.level_upgade,
                        },
                        armor_head: {
                            name: cprofile.type[0].armor_head.name,
                            emoji: cprofile.type[0].armor_head.emoji,
                            status: cprofile.type[0].armor_head.status,
                            type: cprofile.type[0].armor_head.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_head.level_upgade ,
                        },
                        armor_body: {
                            name: cprofile.type[0].armor_body.name,
                            emoji: cprofile.type[0].armor_body.emoji,
                            status: cprofile.type[0].armor_body.status,
                            type: cprofile.type[0].armor_body.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_body.level_upgade ,
                        },
                        armor_leg: {
                            name: cprofile.type[0].armor_leg.name,
                            emoji: cprofile.type[0].armor_leg.emoji,
                            status: cprofile.type[0].armor_leg.status,
                            type: cprofile.type[0].armor_leg.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                        },
                        armor_foot: {
                            name: cprofile.type[0].armor_foot.name,
                            emoji: cprofile.type[0].armor_foot.emoji,
                            status: cprofile.type[0].armor_foot.status,
                            type: cprofile.type[0].armor_foot.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                        },
                    };
                    }

                    if (cprofile.type[0].sword.durability <= 20) {
                        interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
                    } else if (cprofile.type[0].sword.durability <= 4) {
                        interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
                    }

                    if (cprofile.type[0].sword.durability == 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: "หมัด",
                                emoji: "✊",
                                status: "default",
                                type: cprofile.type[0].sword.type,
                                damage_attack: 1, 
                                critical: 1,
                                durability: 100,
                                use_stamina: 1,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp(`อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้ออาวุธใหม่`);
                    }
                    //โจมตีคุณ

                    await monter_data.save();
                    await cprofile.save();
                    
                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }


                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`2`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(2000)

                    cprofile.health = cprofile.health - monter_data.damage_attack;

                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;

                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }

                    await cprofile.save();
                    await monter_data.save();

                    if (cprofile.health <= 0) 
                    cprofile.health = 0;


                    const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result_2 = cprofile.health + defence_armor_2;
                   const health_max_result_2 = cprofile.health_max + defence_armor_2;
                    const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100;
                           const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                           if(pet_attack_result_2 <= 0) {
                           cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                           cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 20) {
                           cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 30) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 40) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 50) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 60) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 70) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 80) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 90) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }  else if(pet_attack_result_2 > 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                            }

                            const stamina_s_inter_2 =  cprofile.stamina_s;
                            const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                           const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                            const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                            const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                            if(result_stamina_inter_2 <= 0) {
                             cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                             cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 20) {
                             cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 30) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 40) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 50) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 60) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 70) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 80) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 90) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                           }  else if(result_stamina_inter_2 > 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                             }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`3`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });
                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`4`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result_2}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`5`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                        await interaction.editReply({ embeds: [embed], files: [], components: [row] , ephemeral: true });
                    } 

                } else if (menu.customId === "run") {
                    await menu.deferUpdate();
                    const run = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(` \`\`\` - คุณหลบมอนเตอร์ \`\`\` `)

                    interaction.editReply({ embeds: [run], files: [], components: [], ephemeral: true})
                    await monter_data.deleteOne();
                    cprofile.stamina = cprofile.stamina_max;
                    await cprofile.save();
                    collector.stop();
                } else if (menu.customId === "defend"){
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                      const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์

                    await monter_data.save();
                    await cprofile.save();

                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result = cprofile.health + defence_armor;
                   const health_max_result = cprofile.health_max + defence_armor;
                    const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`6`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(3000)

                    cprofile.health = cprofile.health - (monter_data.damage_attack * 0.4);

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }
        
                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;
                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
                    //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย
                    //ค่า durability ของชุดเกราะ จะถูกสุ่มลดครึ่งนึงของ damage ที่มอนเตอร์ทำ
                    //ค่า status ที่อัพจะเพิ่มค่า str def luk ให้ผู้เล่น status ละ 2
                    if (cprofile.health <= 0) 
                        cprofile.health = 0;

                        await cprofile.save();
                        await monter_data.save();

                       const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result_2 = cprofile.health + defence_armor_2;
                       const health_max_result_2 = cprofile.health_max + defence_armor_2;
                        const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100; 
                        const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                        if(pet_attack_result_2 <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_attack_result_2 > 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }

                          const stamina_s_inter_2 =  cprofile.stamina_s;
                     const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                    const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                     const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                     const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                     if(result_stamina_inter_2 <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter_2 > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`7`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });

                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`8`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result = cprofile.health + defence_armor;
                       const health_max_result = cprofile.health_max + defence_armor;
                        const pet_attack_chack = (health_result  / health_max_result) * 100;
                        const pet_attack_result = Math.round(pet_attack_chack);
                        if(pet_attack_result <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`9`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                       await  interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
                    } 

                } 
            }
     });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {

                const cprofile = await GProfile.findOne({ user: interaction.user.id });
                const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`10`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`มอนเตอร์ ${monter_name_get} หนีไปเเล้ว!!`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
        cprofile.stamina = cprofile.stamina_max;
        await cprofile.save();
            }
        });
        } else if(profile.location == "น้ำตกป่าสีเขียว") {
            const name_monter = config.monter[0].greengreen_forest_waterfall_forest_plains.map(x => x.name);
        const random = Math.floor(Math.random() * name_monter.length);
        const monter_name = name_monter[random];

        const monter = config.monter[0].green_forest_plains.find(x => x.name === monter_name);

        const monter_name_get = monter.name;
        const monter_type = monter.type;
        const monter_level = monter.level;
        const monter_image = monter.image;
        const monter_damage = monter.damage_attack;
        const monter_health = monter.health;    
        const monter_health_max = monter.health_max;
        const monter_health_emoji = monter.health_emoji;
        const monter_exp = monter.exp;
        const monter_location = monter.location;
        const monter_location_image = monter.location_image;
        const monter_drop_name = monter.drop_name;
        const monter_drop_type = monter.drop_type;
        const monter_drop_image = monter.drop_image;


            monter_data.name = monter_name_get;
            monter_data.type = monter_type;
            monter_data.level = monter_level;
            monter_data.image = monter_image;
            monter_data.damage_attack = monter_damage;
            monter_data.health = monter_health;
            monter_data.health_max = monter_health_max;
            monter_data.health_emoji = monter_health_emoji;
            monter_data.exp = monter_exp;
            monter_data.location = monter_location;
            monter_data.location_image = monter_location_image;
            monter_data.drop = [
                {
                    name: monter_drop_name,
                    type: monter_drop_type,
                    image: monter_drop_image,
                }
            ];
    
    
            await monter_data.save();

             //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย

             if (cprofile.stamina > 100) 
             cprofile.stamina = 100;
             if (cprofile.stamina < 0)
             cprofile.stamina = 0;

             const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

              const stamina_s_inter =  cprofile.stamina_s;
              const stamina_inter =  cprofile.stamina + stamina_s_inter;
             const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
              const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
              const result_stamina_inter = Math.round(chack_stamina_inter);
              if(result_stamina_inter <= 0) {
               cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
               cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 20) {
               cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 30) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 40) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 50) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 60) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 70) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 80) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 90) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_inter > 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`1`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

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
            .setStyle(ButtonStyle.Danger)
        )


        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 * 2});
    
        const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
    
        collector.on('collect', async (menu) => {
            if(menu.isButton()) {
                if(menu.customId === "attack") {
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                    const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์
                    const damage_cprofile = cprofile.type[0].sword.damage_attack + cprofile.attack;
                    monter_data.health =  monter_data.health - damage_cprofile;

                    cprofile.stamina = cprofile.stamina - cprofile.type[0].sword.use_stamina;

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }

                    if (cprofile.type[0].sword.name == "หมัด") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                    } else if (cprofile.type[0].sword.name !== "หมัด") {
                    cprofile.type[0] = {
                        type: cprofile.type[0].type,
                        type_system: cprofile.type[0].type_system,
                        emoji: cprofile.type[0].emoji,
                        sword: {
                            name: cprofile.type[0].sword.name,
                            emoji: cprofile.type[0].sword.emoji,
                            status: cprofile.type[0].sword.status,
                            type: cprofile.type[0].sword.type,
                            damage_attack: cprofile.type[0].sword.damage_attack , 
                            critical: cprofile.type[0].sword.critical,
                            durability: cprofile.type[0].sword.durability -= 2,
                            use_stamina: cprofile.type[0].sword.use_stamina,
                            level_upgade: cprofile.type[0].sword.level_upgade,
                        },
                        armor_head: {
                            name: cprofile.type[0].armor_head.name,
                            emoji: cprofile.type[0].armor_head.emoji,
                            status: cprofile.type[0].armor_head.status,
                            type: cprofile.type[0].armor_head.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_head.level_upgade ,
                        },
                        armor_body: {
                            name: cprofile.type[0].armor_body.name,
                            emoji: cprofile.type[0].armor_body.emoji,
                            status: cprofile.type[0].armor_body.status,
                            type: cprofile.type[0].armor_body.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_body.level_upgade ,
                        },
                        armor_leg: {
                            name: cprofile.type[0].armor_leg.name,
                            emoji: cprofile.type[0].armor_leg.emoji,
                            status: cprofile.type[0].armor_leg.status,
                            type: cprofile.type[0].armor_leg.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                        },
                        armor_foot: {
                            name: cprofile.type[0].armor_foot.name,
                            emoji: cprofile.type[0].armor_foot.emoji,
                            status: cprofile.type[0].armor_foot.status,
                            type: cprofile.type[0].armor_foot.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                        },
                    };
                    }

                    if (cprofile.type[0].sword.durability <= 20) {
                        interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
                    } else if (cprofile.type[0].sword.durability <= 4) {
                        interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
                    }

                    if (cprofile.type[0].sword.durability == 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: "หมัด",
                                emoji: "✊",
                                status: "default",
                                type: cprofile.type[0].sword.type,
                                damage_attack: 1, 
                                critical: 1,
                                durability: 100,
                                use_stamina: 1,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp(`อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้ออาวุธใหม่`);
                    }
                    //โจมตีคุณ

                    await monter_data.save();
                    await cprofile.save();
                    
                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }


                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`2`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(2000)

                    cprofile.health = cprofile.health - monter_data.damage_attack;

                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;

                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }

                    await cprofile.save();
                    await monter_data.save();

                    if (cprofile.health <= 0) 
                    cprofile.health = 0;


                    const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result_2 = cprofile.health + defence_armor_2;
                   const health_max_result_2 = cprofile.health_max + defence_armor_2;
                    const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100;
                           const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                           if(pet_attack_result_2 <= 0) {
                           cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                           cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 20) {
                           cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 30) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 40) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 50) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 60) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 70) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 80) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 90) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }  else if(pet_attack_result_2 > 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                            }

                            const stamina_s_inter_2 =  cprofile.stamina_s;
                            const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                           const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                            const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                            const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                            if(result_stamina_inter_2 <= 0) {
                             cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                             cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 20) {
                             cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 30) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 40) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 50) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 60) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 70) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 80) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 90) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                           }  else if(result_stamina_inter_2 > 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                             }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`3`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });
                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`4`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result_2}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`5`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                        await interaction.editReply({ embeds: [embed], files: [], components: [row] , ephemeral: true });
                    } 

                } else if (menu.customId === "run") {
                    await menu.deferUpdate();
                    const run = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(` \`\`\` - คุณหลบมอนเตอร์ \`\`\` `)

                    interaction.editReply({ embeds: [run], files: [], components: [], ephemeral: true})
                    await monter_data.deleteOne();
                    cprofile.stamina = cprofile.stamina_max;
                    await cprofile.save();
                    collector.stop();
                } else if (menu.customId === "defend"){
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                      const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์

                    await monter_data.save();
                    await cprofile.save();

                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result = cprofile.health + defence_armor;
                   const health_max_result = cprofile.health_max + defence_armor;
                    const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`6`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(3000)

                    cprofile.health = cprofile.health - (monter_data.damage_attack * 0.4);

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }
        
                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;
                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
                    //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย
                    //ค่า durability ของชุดเกราะ จะถูกสุ่มลดครึ่งนึงของ damage ที่มอนเตอร์ทำ
                    //ค่า status ที่อัพจะเพิ่มค่า str def luk ให้ผู้เล่น status ละ 2
                    if (cprofile.health <= 0) 
                        cprofile.health = 0;

                        await cprofile.save();
                        await monter_data.save();

                       const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result_2 = cprofile.health + defence_armor_2;
                       const health_max_result_2 = cprofile.health_max + defence_armor_2;
                        const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100; 
                        const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                        if(pet_attack_result_2 <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_attack_result_2 > 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }

                          const stamina_s_inter_2 =  cprofile.stamina_s;
                     const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                    const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                     const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                     const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                     if(result_stamina_inter_2 <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter_2 > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`7`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });

                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`8`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result = cprofile.health + defence_armor;
                       const health_max_result = cprofile.health_max + defence_armor;
                        const pet_attack_chack = (health_result  / health_max_result) * 100;
                        const pet_attack_result = Math.round(pet_attack_chack);
                        if(pet_attack_result <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`9`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                       await  interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
                    } 

                } 
            }
     });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {

                const cprofile = await GProfile.findOne({ user: interaction.user.id });
                const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`10`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`มอนเตอร์ ${monter_name_get} หนีไปเเล้ว!!`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
        cprofile.stamina = cprofile.stamina_max;
        await cprofile.save();
            }
        });
        } else if(profile.location == "ป่าลึกสีเขียว") {
            const name_monter = config.monter[0].green_forest_depths.map(x => x.name);
        const random = Math.floor(Math.random() * name_monter.length);
        const monter_name = name_monter[random];

        const monter = config.monter[0].green_forest_plains.find(x => x.name === monter_name);

        const monter_name_get = monter.name;
        const monter_type = monter.type;
        const monter_level = monter.level;
        const monter_image = monter.image;
        const monter_damage = monter.damage_attack;
        const monter_health = monter.health;    
        const monter_health_max = monter.health_max;
        const monter_health_emoji = monter.health_emoji;
        const monter_exp = monter.exp;
        const monter_location = monter.location;
        const monter_location_image = monter.location_image;
        const monter_drop_name = monter.drop_name;
        const monter_drop_type = monter.drop_type;
        const monter_drop_image = monter.drop_image;


            monter_data.name = monter_name_get;
            monter_data.type = monter_type;
            monter_data.level = monter_level;
            monter_data.image = monter_image;
            monter_data.damage_attack = monter_damage;
            monter_data.health = monter_health;
            monter_data.health_max = monter_health_max;
            monter_data.health_emoji = monter_health_emoji;
            monter_data.exp = monter_exp;
            monter_data.location = monter_location;
            monter_data.location_image = monter_location_image;
            monter_data.drop = [
                {
                    name: monter_drop_name,
                    type: monter_drop_type,
                    image: monter_drop_image,
                }
            ];
    
    
            await monter_data.save();

             //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย

             if (cprofile.stamina > 100) 
             cprofile.stamina = 100;
             if (cprofile.stamina < 0)
             cprofile.stamina = 0;

             const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

              const stamina_s_inter =  cprofile.stamina_s;
              const stamina_inter =  cprofile.stamina + stamina_s_inter;
             const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
              const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
              const result_stamina_inter = Math.round(chack_stamina_inter);
              if(result_stamina_inter <= 0) {
               cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
               cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 20) {
               cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 30) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 40) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 50) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 60) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 70) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 80) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 90) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
             } else if(result_stamina_inter <= 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
             }  else if(result_stamina_inter > 100) {
               cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
               }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`1`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

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
            .setStyle(ButtonStyle.Danger)
        )


        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 * 2});
    
        const inv = await Ginv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
    
        collector.on('collect', async (menu) => {
            if(menu.isButton()) {
                if(menu.customId === "attack") {
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                    const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์
                    const damage_cprofile = cprofile.type[0].sword.damage_attack + cprofile.attack;
                    monter_data.health =  monter_data.health - damage_cprofile;

                    cprofile.stamina = cprofile.stamina - cprofile.type[0].sword.use_stamina;

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }

                    if (cprofile.type[0].sword.name == "หมัด") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                    } else if (cprofile.type[0].sword.name !== "หมัด") {
                    cprofile.type[0] = {
                        type: cprofile.type[0].type,
                        type_system: cprofile.type[0].type_system,
                        emoji: cprofile.type[0].emoji,
                        sword: {
                            name: cprofile.type[0].sword.name,
                            emoji: cprofile.type[0].sword.emoji,
                            status: cprofile.type[0].sword.status,
                            type: cprofile.type[0].sword.type,
                            damage_attack: cprofile.type[0].sword.damage_attack , 
                            critical: cprofile.type[0].sword.critical,
                            durability: cprofile.type[0].sword.durability -= 2,
                            use_stamina: cprofile.type[0].sword.use_stamina,
                            level_upgade: cprofile.type[0].sword.level_upgade,
                        },
                        armor_head: {
                            name: cprofile.type[0].armor_head.name,
                            emoji: cprofile.type[0].armor_head.emoji,
                            status: cprofile.type[0].armor_head.status,
                            type: cprofile.type[0].armor_head.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_head.level_upgade ,
                        },
                        armor_body: {
                            name: cprofile.type[0].armor_body.name,
                            emoji: cprofile.type[0].armor_body.emoji,
                            status: cprofile.type[0].armor_body.status,
                            type: cprofile.type[0].armor_body.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_body.level_upgade ,
                        },
                        armor_leg: {
                            name: cprofile.type[0].armor_leg.name,
                            emoji: cprofile.type[0].armor_leg.emoji,
                            status: cprofile.type[0].armor_leg.status,
                            type: cprofile.type[0].armor_leg.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                        },
                        armor_foot: {
                            name: cprofile.type[0].armor_foot.name,
                            emoji: cprofile.type[0].armor_foot.emoji,
                            status: cprofile.type[0].armor_foot.status,
                            type: cprofile.type[0].armor_foot.type,
                            defense: cprofile.type[0].armor_head.defense ,
                            defense_max: cprofile.type[0].armor_head.defense_max,
                            durability: cprofile.type[0].armor_head.durability,
                            durability_max: cprofile.type[0].armor_head.durability_max,
                            level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                        },
                    };
                    }

                    if (cprofile.type[0].sword.durability <= 20) {
                        interaction.followUp({content: `อาวุธของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`, ephemeral: true})
                    } else if (cprofile.type[0].sword.durability <= 4) {
                        interaction.followUp({content: `คุณสามารถตีได้อีก 2 ครั้งก่อนอาวุธของคุณจะพัง`, ephemeral: true})
                    }

                    if (cprofile.type[0].sword.durability == 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: "หมัด",
                                emoji: "✊",
                                status: "default",
                                type: cprofile.type[0].sword.type,
                                damage_attack: 1, 
                                critical: 1,
                                durability: 100,
                                use_stamina: 1,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp(`อาวุธของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้ออาวุธใหม่`);
                    }
                    //โจมตีคุณ

                    await monter_data.save();
                    await cprofile.save();
                    
                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }


                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`2`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(2000)

                    cprofile.health = cprofile.health - monter_data.damage_attack;

                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;

                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }

                    await cprofile.save();
                    await monter_data.save();

                    if (cprofile.health <= 0) 
                    cprofile.health = 0;


                    const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result_2 = cprofile.health + defence_armor_2;
                   const health_max_result_2 = cprofile.health_max + defence_armor_2;
                    const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100;
                           const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                           if(pet_attack_result_2 <= 0) {
                           cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                           cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 20) {
                           cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 30) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 40) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 50) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 60) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 70) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 80) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 90) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                          } else if(pet_attack_result_2 <= 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }  else if(pet_attack_result_2 > 100) {
                           cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                            }

                            const stamina_s_inter_2 =  cprofile.stamina_s;
                            const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                           const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                            const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                            const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                            if(result_stamina_inter_2 <= 0) {
                             cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                             cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 20) {
                             cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 30) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 40) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 50) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 60) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 70) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 80) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 90) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                           } else if(result_stamina_inter_2 <= 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                           }  else if(result_stamina_inter_2 > 100) {
                             cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                             }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`3`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });
                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`4`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result_2}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result_2}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`5`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                        await interaction.editReply({ embeds: [embed], files: [], components: [row] , ephemeral: true });
                    } 

                } else if (menu.customId === "run") {
                    await menu.deferUpdate();
                    const run = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(` \`\`\` - คุณหลบมอนเตอร์ \`\`\` `)

                    interaction.editReply({ embeds: [run], files: [], components: [], ephemeral: true})
                    await monter_data.deleteOne();
                    cprofile.stamina = cprofile.stamina_max;
                    await cprofile.save();
                    collector.stop();
                } else if (menu.customId === "defend"){
                    await menu.deferUpdate();
                    const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                      const cprofile = await GProfile.findOne({ user: interaction.user.id });

                    const row = new ActionRowBuilder()
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

                    //โจมตีมอนเตอร์

                    await monter_data.save();
                    await cprofile.save();

                    const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                    const health_result = cprofile.health + defence_armor;
                   const health_max_result = cprofile.health_max + defence_armor;
                    const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const attack = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`6`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

                    await menu.editReply({ embeds: [attack], files: [], components: [row], ephemeral: true })
                    await delay(3000)

                    cprofile.health = cprofile.health - (monter_data.damage_attack * 0.4);

                    if (cprofile.stamina < cprofile.type[0].sword.use_stamina) {
                        row.components[0].setDisabled(true);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    } else {
                        row.components[0].setDisabled(false);
                        row.components[1].setDisabled(false);
                        row.components[2].setDisabled(false);
                    }
        
                    cprofile.stamina = cprofile.stamina + 15;
                    if (cprofile.stamina > 100) 
                    cprofile.stamina = 100;
                    if (cprofile.stamina < 0)
                    cprofile.stamina = 0;
                    const armor_result = ["armor_head", "armor_body", "armor_leg", "armor_foot"]
                    const armor_random = armor_result[Math.floor(Math.random() * armor_result.length)]
                    if (armor_random == "armor_head") {
                        if(cprofile.type[0].armor_head.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_head.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_body") {
                        if(cprofile.type[0].armor_body.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_body.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_leg") {
                        if(cprofile.type[0].armor_leg.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_leg.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    } else if (armor_random == "armor_foot") {
                        if(cprofile.type[0].armor_foot.name == "ไม่มี") {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability ,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        } else if (cprofile.type[0].armor_foot.name !== "ไม่มี"){
                            const damage_monter = monter_data.damage_attack / 2
                        const damage_result = Math.round(damage_monter);
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        }
                    }

                    if (cprofile.type[0].armor_head.durability <= 20) {
                        return interaction.followUp(`เกราะหัวของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_body.durability <= 20) {
                        return interaction.followUp(`เกราะเเขนของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_leg.durability <= 20) {
                        return interaction.followUp(`เกราะขาของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } else if (cprofile.type[0].armor_foot.durability <= 20) {
                        return interaction.followUp(`เกราะเท้าของคุณใกล้จะพังเเล้วกรุณาซ้อมด้วย`)
                    } 

                    if (cprofile.type[0].armor_head.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_head.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะหัวของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_body.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_body.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะเเขนของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_leg.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_leg.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: cprofile.type[0].armor_foot.name,
                                emoji: cprofile.type[0].armor_foot.emoji,
                                status: cprofile.type[0].armor_foot.status,
                                type: cprofile.type[0].armor_foot.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability -= damage_result,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_foot.level_upgade ,
                            },
                        };
                        interaction.followUp({ content: `เกราะขาของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    } else if (cprofile.type[0].armor_foot.durability <= 0) {
                        cprofile.type[0] = {
                            type: cprofile.type[0].type,
                            type_system: cprofile.type[0].type_system,
                            emoji: cprofile.type[0].emoji,
                            sword: {
                                name: cprofile.type[0].sword.name,
                                emoji: cprofile.type[0].sword.emoji,
                                status: cprofile.type[0].sword.status,
                                type: cprofile.type[0].sword.type,
                                damage_attack: cprofile.type[0].sword.damage_attack , 
                                critical: cprofile.type[0].sword.critical,
                                durability: cprofile.type[0].sword.durability,
                                use_stamina: cprofile.type[0].sword.use_stamina,
                                level_upgade: cprofile.type[0].sword.level_upgade,
                            },
                            armor_head: {
                                name: cprofile.type[0].armor_head.name,
                                emoji: cprofile.type[0].armor_head.emoji,
                                status: cprofile.type[0].armor_head.status,
                                type: cprofile.type[0].armor_head.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_head.level_upgade ,
                            },
                            armor_body: {
                                name: cprofile.type[0].armor_body.name,
                                emoji: cprofile.type[0].armor_body.emoji,
                                status: cprofile.type[0].armor_body.status,
                                type: cprofile.type[0].armor_body.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_body.level_upgade ,
                            },
                            armor_leg: {
                                name: cprofile.type[0].armor_leg.name,
                                emoji: cprofile.type[0].armor_leg.emoji,
                                status: cprofile.type[0].armor_leg.status,
                                type: cprofile.type[0].armor_leg.type,
                                defense: cprofile.type[0].armor_head.defense ,
                                defense_max: cprofile.type[0].armor_head.defense_max,
                                durability: cprofile.type[0].armor_head.durability,
                                durability_max: cprofile.type[0].armor_head.durability_max,
                                level_upgade: cprofile.type[0].armor_leg.level_upgade ,
                            },
                            armor_foot: {
                                name: "ไม่มี",
                                emoji: "🚫",
                                status: "default",
                                type: cprofile.type[0].armor_foot.type,
                                defense: 0,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                         interaction.followUp({ content: `เกราะเท้าของคุณเสียหายจนหมดความสามารถในการใช้งานแล้ว กรุณาซื้อเกราะใหม่`, ephemeral: true});   
                    }
                    //ค่า defence ของชุดเกราะ จะเพิ่มเลือดให้ผู้ใส่ ปล ต้องปรับ % ของเลือดใหม่ด้วย
                    //ค่า durability ของชุดเกราะ จะถูกสุ่มลดครึ่งนึงของ damage ที่มอนเตอร์ทำ
                    //ค่า status ที่อัพจะเพิ่มค่า str def luk ให้ผู้เล่น status ละ 2
                    if (cprofile.health <= 0) 
                        cprofile.health = 0;

                        await cprofile.save();
                        await monter_data.save();

                       const defence_armor_2 = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result_2 = cprofile.health + defence_armor_2;
                       const health_max_result_2 = cprofile.health_max + defence_armor_2;
                        const pet_attack_chack_2 = (health_result_2  / health_max_result_2) * 100; 
                        const pet_attack_result_2 = Math.round(pet_attack_chack_2);
                        if(pet_attack_result_2 <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 10 && pet_attack_result_2 > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result_2 <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_attack_result_2 > 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }

                          const stamina_s_inter_2 =  cprofile.stamina_s;
                     const stamina_inter_2 =  cprofile.stamina + stamina_s_inter_2;
                    const stamina_max_inter_2 =  cprofile.stamina_max + stamina_s_inter_2 ;
                     const chack_stamina_inter_2 = (stamina_inter_2  / stamina_max_inter_2) * 100;
                     const result_stamina_inter_2 = Math.round(chack_stamina_inter_2);
                     if(result_stamina_inter_2 <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 10 && result_stamina_inter_2 > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter_2 <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter_2 > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }
    
                       const pet_monter_chack_2 = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result_2 = Math.round(pet_monter_chack_2);
                        if(pet_monter_result_2 <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 10 && pet_monter_result_2 > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result_2 <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } else if(pet_monter_result_2 > 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                          }
    
                        const attack_2 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`7`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter_2}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)
    
                        await menu.editReply({ embeds: [attack_2], files: [], components: [row], ephemeral: true })


                    if (monter_data.health <= 0) {
                        const win = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(` \`\`\` - คุณชนะมอนเตอร์ \`\`\` `)

                        interaction.editReply({ embeds: [win], files: [], components: []})

                        //เพิ่ม exp
                        cprofile.exp = cprofile.exp + monter_data.exp;

                        if(cprofile.exp >= cprofile.nextexp) {
                            let diff = cprofile.exp - cprofile.nextexp;
        
                            cprofile.level += 1;
                            cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
                            cprofile.exp = diff;

                            const embed = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(` \`\`\` - level Up to ${cprofile.level} \`\`\` `)

                            await interaction.channel.send({ embeds: [embed], files: [], components: []})
                            await cprofile.save();
                        }
                        //drop item
                        inv.item.push({
                            name: monter_data.drop[0].name,
                            type: monter_data.drop[0].type,
                            image: monter_data.drop[0].image,
                            id: generateID,
                        });

                        cprofile.stamina = cprofile.stamina_max;

                        await inv.save();
                        await cprofile.save();
                        await monter_data.deleteOne();
                    } else if (cprofile.health <= 0) {
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
                        .setTitle(`8`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`คุณเเพ้มอนเตอร์ ${monter_name_get} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/1021744464550703195/1085107097273897031/1029829993301291059.png")

                       await interaction.editReply({ embeds: [lose], files: [], components: [row_lose], ephemeral: true })
                       cprofile.stamina = cprofile.stamina_max;
                       await cprofile.save();
                    } else {

                        const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
                        const health_result = cprofile.health + defence_armor;
                       const health_max_result = cprofile.health_max + defence_armor;
                        const pet_attack_chack = (health_result  / health_max_result) * 100;
                        const pet_attack_result = Math.round(pet_attack_chack);
                        if(pet_attack_result <= 0) {
                        cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                        cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 20) {
                        cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 30) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 40) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 50) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 60) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 70) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 80) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 90) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_attack_result <= 100) {
                        cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                       const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                       const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                        const pet_monter_result = Math.round(pet_monter_chack);
                        if(pet_monter_result <= 0) {
                            monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                        monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 20) {
                        monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 30) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 40) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 50) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 60) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 70) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 80) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 90) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_monter_result <= 100) {
                        monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 

                        const embed = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setTitle(`9`)
                        .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                        .setDescription(`เจอมอนเตอร์ชื่อ ${monter_name_get} ระดับ ${monter_level} แล้ว`)
                        .setFields(
                            { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                            { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                        )
                        .setThumbnail(monter_image)
                
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
                            .setStyle(ButtonStyle.Danger)
                        )
                    
                       await  interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
                    } 

                } 
            }
     });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {

                const cprofile = await GProfile.findOne({ user: interaction.user.id });
                const monter_data = await GMonter.findOne({ guild: interaction.guild.id, user: interaction.user.id });

                const defence_armor = cprofile.type[0].armor_head.defense + cprofile.type[0].armor_body.defense +  cprofile.type[0].armor_leg.defense + cprofile.type[0].armor_foot.defense;
             const health_result = cprofile.health + defence_armor;
            const health_max_result = cprofile.health_max + defence_armor;
             const pet_attack_chack = (health_result  / health_max_result) * 100;
                    const pet_attack_result = Math.round(pet_attack_chack);
                    if(pet_attack_result <= 0) {
                    cprofile.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                    cprofile.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 20) {
                    cprofile.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 30) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 40) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 50) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 60) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 70) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 80) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 90) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_attack_result <= 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   }  else if(pet_attack_result > 100) {
                    cprofile.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                     const stamina_s_inter =  cprofile.stamina_s;
                     const stamina_inter =  cprofile.stamina + stamina_s_inter;
                    const stamina_max_inter =  cprofile.stamina_max + stamina_s_inter ;
                     const chack_stamina_inter = (stamina_inter  / stamina_max_inter) * 100;
                     const result_stamina_inter = Math.round(chack_stamina_inter);
                     if(result_stamina_inter <= 0) {
                      cprofile.stamina_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 10 && result_stamina_inter > 0) {
                      cprofile.stamina_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 20) {
                      cprofile.stamina_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 30) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 40) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 50) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 60) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 70) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 80) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 90) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                    } else if(result_stamina_inter <= 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                    }  else if(result_stamina_inter > 100) {
                      cprofile.stamina_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                      }

                   const pet_monter_chack = (monter_data.health / monter_data.health_max) * 100;
                    const pet_monter_result = Math.round(pet_monter_chack);
                    if(pet_monter_result <= 0) {
                        monter_data.health_emoji = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 10 && pet_monter_result > 0) {
                    monter_data.health_emoji = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 20) {
                    monter_data.health_emoji = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 30) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 40) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 50) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 60) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 70) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 80) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 90) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                   } else if(pet_monter_result <= 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                   } else if(pet_monter_result > 100) {
                    monter_data.health_emoji = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                     }

                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setTitle(`10`)
                    .setAuthor({ name: `เจอมอนเตอร์ ที่ ${monter_location}`, iconURL: `${monter_location_image}` })
                    .setDescription(`มอนเตอร์ ${monter_name_get} หนีไปเเล้ว!!`)
                    .setFields(
                        { name: `${cprofile.username}`, value: `❤️${cprofile.health_emoji} ${pet_attack_result}%\n💙${cprofile.stamina_emoji} ${result_stamina_inter}%`, inline: true },
                        { name: `${monter_data.name}`, value: `❤️${monter_data.health_emoji} ${pet_monter_result}%`, inline: true },
                    )
                    .setThumbnail(monter_image)

        await interaction.editReply({ embeds: [embed], files: [], components: [row], ephemeral: true  });
        cprofile.stamina = cprofile.stamina_max;
        await cprofile.save();
            }
        });
        }
    } 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};
