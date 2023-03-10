const { EmbedBuilder, AttachmentBuilder,ActionRowBuilder,ButtonStyle, ButtonBuilder,ModalBuilder, TextInputBuilder, TextInputStyle ,StringSelectMenuBuilder,SelectMenuOptionBuilder } = require("discord.js");
const GPet = require("../../settings/models/cradprofile.js");
const Iteminv = require("../../settings/models/iteminventory.js");
const GInv = require("../../settings/models/inventory.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
    name: ["profile", "display"],
    description: "Display your profile.",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.reply("Loading please wait...");

        const pet = await GPet.findOne({ user: interaction.user.id });
        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const iteminv = await Iteminv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        //create button1 
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("rename_id")
                .setLabel("rename")
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

        const button1 = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("remove_id_5_1")
         .setLabel("-5 ")   
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("remove_id_1_1")
         .setLabel("-1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("Attack")
         .setLabel("Att.")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
         .setCustomId("add_id_1_1")
         .setLabel("+1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("add_id_5_1")
         .setLabel("+5")
         .setStyle(ButtonStyle.Primary),
     );

     const button_change_remove_sword = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("change_item_sword_id")
         .setLabel("Change")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
         .setCustomId("remove_item_sword_id")
         .setLabel("Remove")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
        .setCustomId("update_item_sword_id")
        .setLabel("Update")
        .setStyle(ButtonStyle.Secondary),
     );

        const button_change_remove_head = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("change_item_armor_head_id")
            .setLabel("Change")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("remove_item_armor_head_id")
            .setLabel("Remove")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("update_item_armor_head_id")
            .setLabel("Update")
            .setStyle(ButtonStyle.Secondary),
        );

        const button_change_remove_body = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("change_item_armor_body_id")
            .setLabel("Change")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("remove_item_armor_body_id")
            .setLabel("Remove")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("update_item_armor_body_id")
            .setLabel("Update")
            .setStyle(ButtonStyle.Secondary),
        );

        const button_change_remove_leg = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("change_item_armor_leg_id")
            .setLabel("Change")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("remove_item_armor_leg_id")
            .setLabel("Remove")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("update_item_armor_leg_id")
            .setLabel("Update")
            .setStyle(ButtonStyle.Secondary),
        );

        const button_change_remove_foot = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("change_item_armor_foot_id")
            .setLabel("Change")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("remove_item_armor_foot_id")
            .setLabel("Remove")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("update_item_armor_foot_id")
            .setLabel("Update")
            .setStyle(ButtonStyle.Secondary),
        );

        const gosword = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("go_sword_id")
            .setLabel("Go Back")
            .setStyle(ButtonStyle.Secondary),
        );

        const goarmor_head = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("go_armor_head_id")
            .setLabel("Go Back")
            .setStyle(ButtonStyle.Secondary),
        );

        const goarmor_body = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("go_armor_body_id")
            .setLabel("Go Back")
            .setStyle(ButtonStyle.Secondary),
        );

        const goarmor_leg = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("go_armor_leg_id")
            .setLabel("Go Back")
            .setStyle(ButtonStyle.Secondary),
        );

        const goarmor_foot = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("go_armor_foot_id")
            .setLabel("Go Back")
            .setStyle(ButtonStyle.Secondary),
        );

     const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("item_select_id")
                    .setPlaceholder("Select an item")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                        {
                            label: "Main",
                            description: "select a main",
                            value: "main_id"
                        },
                        {
                            label: "sword",
                            description: "select a sword",
                            value: "sword_id"
                        },
                        { 
                            label: "armor_head",
                            description: "select a armor head",
                            value: "armor_head_id"
                        },
                        {
                            label: "armor_body",
                            description: "select a armor body",
                            value: "armor_body_id"
                        },
                        {
                            label: "armor_leg",
                            description: "select a armor leg",
                            value: "armor_leg_id"
                        },
                        {
                            label: "armor_foot",
                            description: "select a armor foot",
                            value: "armor_foot_id"
                        }
                    ])
                    
                ])

     if (pet.point == 0 && pet.attack == 0) {
        button1.components[0].setDisabled(true);
        button1.components[1].setDisabled(true);
        button1.components[3].setDisabled(true);
        button1.components[4].setDisabled(true);
      } else if (pet.point >=1 && pet.attack >=1) {
        button1.components[0].setDisabled(false);
        button1.components[1].setDisabled(false);
        button1.components[3].setDisabled(false);
        button1.components[4].setDisabled(true);
     } else if(pet.attack == 0 && pet.point >= 5) {
        button1.components[0].setDisabled(true);
        button1.components[1].setDisabled(true);
        button1.components[3].setDisabled(false);
        button1.components[4].setDisabled(false);
  } else if(pet.attack == 0 && pet.point <= 5) {
        button1.components[0].setDisabled(true);
        button1.components[1].setDisabled(true);
        button1.components[3].setDisabled(false);
        button1.components[4].setDisabled(true);
  }  else if(pet.attack >= 1 && pet.point == 0) {
    button1.components[0].setDisabled(false);
    button1.components[1].setDisabled(false);
    button1.components[3].setDisabled(true);
    button1.components[4].setDisabled(true);
  }

     const button2 = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("remove_id_5_2")
         .setLabel("-5 ")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("remove_id_1_2")
         .setLabel("-1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("Defense")
         .setLabel("Def.")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
         .setCustomId("add_id_1_2")
         .setLabel("+1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("add_id_5_2")
         .setLabel("+5")
         .setStyle(ButtonStyle.Primary),
     );

        if (pet.point == 0 && pet.defense == 0) {   
        button2.components[0].setDisabled(true);
        button2.components[1].setDisabled(true);
        button2.components[3].setDisabled(true);
        button2.components[4].setDisabled(true);
        } else if (pet.point >=1 && pet.defense >=1) {
        button2.components[0].setDisabled(false);
        button2.components[1].setDisabled(false);
        button2.components[3].setDisabled(false);
        button2.components[4].setDisabled(true);
        } else if(pet.defense == 0 && pet.point >= 5) {
        button2.components[0].setDisabled(true);
        button2.components[1].setDisabled(true);
        button2.components[3].setDisabled(false);
        button2.components[4].setDisabled(false);
        } else if(pet.defense == 0 && pet.point <= 5) {
        button2.components[0].setDisabled(true);
        button2.components[1].setDisabled(true);
        button2.components[3].setDisabled(false);
        button2.components[4].setDisabled(true);
        } else if(pet.defense >= 1 && pet.point == 0) {
        button2.components[0].setDisabled(false);
        button2.components[1].setDisabled(false);
        button2.components[3].setDisabled(true);
        button2.components[4].setDisabled(true);
        }

     const button3 = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("remove_id_5_3")
         .setLabel("-5 ")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("remove_id_1_3")
         .setLabel("-1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("Speed")
         .setLabel("Spd.")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
         .setCustomId("add_id_1_3")
         .setLabel("+1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("add_id_5_3")
         .setLabel("+5")
         .setStyle(ButtonStyle.Primary),
     );

     if (pet.point == 0 && pet.speed == 0) {   
        button3.components[0].setDisabled(true);
        button3.components[1].setDisabled(true);
        button3.components[3].setDisabled(true);
        button3.components[4].setDisabled(true);
        } else if (pet.point >=1 && pet.speed >=1) {
        button3.components[0].setDisabled(false);
        button3.components[1].setDisabled(false);
        button3.components[3].setDisabled(false);
        button3.components[4].setDisabled(true);
        } else if(pet.speed == 0 && pet.point >= 5) {
        button3.components[0].setDisabled(true);
        button3.components[1].setDisabled(true);
        button3.components[3].setDisabled(false);
        button3.components[4].setDisabled(false);
        } else if(pet.speed == 0 && pet.point <= 5) {
        button3.components[0].setDisabled(true);
        button3.components[1].setDisabled(true);
        button3.components[3].setDisabled(false);
        button3.components[4].setDisabled(true);
        } else if(pet.speed >= 1 && pet.point == 0) {
        button3.components[0].setDisabled(false);
        button3.components[1].setDisabled(false);
        button3.components[3].setDisabled(true);
        button3.components[4].setDisabled(true);
        }
     
     const button4 = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("remove_id_5_4")
         .setLabel("-5 ")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("remove_id_1_4")
         .setLabel("-1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("Luck")
         .setLabel("Lck.")
         .setStyle(ButtonStyle.Secondary),
         new ButtonBuilder()
         .setCustomId("add_id_1_4")
         .setLabel("+1")
         .setStyle(ButtonStyle.Primary),
         new ButtonBuilder()
         .setCustomId("add_id_5_4")
         .setLabel("+5")
         .setStyle(ButtonStyle.Primary),
     );

     if (pet.point == 0 && pet.luck == 0) {   
        button4.components[0].setDisabled(true);
        button4.components[1].setDisabled(true);
        button4.components[3].setDisabled(true);
        button4.components[4].setDisabled(true);
        } else if (pet.point >=1 && pet.luck >=1) {
        button4.components[0].setDisabled(false);
        button4.components[1].setDisabled(false);
        button4.components[3].setDisabled(false);
        button4.components[4].setDisabled(true);
        } else if(pet.luck == 0 && pet.point >= 5) {
        button4.components[0].setDisabled(true);
        button4.components[1].setDisabled(true);
        button4.components[3].setDisabled(false);
        button4.components[4].setDisabled(false);
        } else if(pet.luck == 0 && pet.point <= 5) {
        button4.components[0].setDisabled(true);
        button4.components[1].setDisabled(true);
        button4.components[3].setDisabled(false);
        button4.components[4].setDisabled(true);
        } else if(pet.luck >= 1 && pet.point == 0) {
        button4.components[0].setDisabled(false);
        button4.components[1].setDisabled(false);
        button4.components[3].setDisabled(true);
        button4.components[4].setDisabled(true);
        }

     const button_back = new ActionRowBuilder()
     .addComponents(
         new ButtonBuilder()
         .setCustomId("back_train_id")
         .setLabel("Back")
         .setStyle(ButtonStyle.Secondary),
     );

     const pet_attack_chack = (pet.attack / pet.attack_max) * 100;
     const pet_attack_result = Math.round(pet_attack_chack);
     if(pet_attack_result <= 0) {
        pet.emoji_attack = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
        pet.emoji_attack = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 20) {
        pet.emoji_attack = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 30) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 40) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 50) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 60) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 70) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 80) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 90) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
    } else if(pet_attack_result <= 100) {
        pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
    } 

    const pet_defense_chack = (pet.defense / pet.defense_max) * 100;
    const pet_defense_result = Math.round(pet_defense_chack);
    if(pet_defense_result <= 0) {
        pet.emoji_defense = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 10 && pet_defense_result > 0) {
        pet.emoji_defense = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 20) {
        pet.emoji_defense = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 30) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 40) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 50) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 60) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 70) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 80) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 90) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
    } else if(pet_defense_result <= 100) {
        pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
    } 

    const pet_speed_chack = (pet.speed / pet.speed_max) * 100;
    const pet_speed_result = Math.round(pet_speed_chack);
    if(pet_speed_result <= 0) {
        pet.emoji_speed = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 10 && pet_speed_result > 0) {
        pet.emoji_speed = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 20) {
        pet.emoji_speed = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 30) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 40) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 50) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 60) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 70) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 80) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 90) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
    } else if(pet_speed_result <= 100) {
        pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
    } 

    const pet_luck_chack = (pet.luck / pet.luck_max) * 100;
    const pet_luck_result = Math.round(pet_luck_chack);
    if(pet_luck_result <= 0) {
        pet.emoji_luck = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 10 && pet_luck_result > 0) {
        pet.emoji_luck = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 20) {
        pet.emoji_luck = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 30) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 40) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 50) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 60) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 70) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 80) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 90) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
    } else if(pet_luck_result <= 100) {
        pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
    } 

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

            if (client.pendingCommands[interaction.user.id]) {
                const embed = new EmbedBuilder()
                .setDescription("กรุณาปิดคำสั่งโปรไฟล์อันเก่าก่อนใช้คำสั่งใหม่")
                .setColor(client.color)
                await interaction.editReply({ content: "", embeds: [embed], components: [], files: [] });
            } else {
                await interaction.editReply({ content: " ", embeds: [embed], components: [button], files: [attac] });
    
                let filter = (m) => m.user.id === interaction.user.id;
                // Create a new message component collector and add it to the dictionary of pending commands
                let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                client.pendingCommands[interaction.user.id] = collector;

                collector.on('collect', async (menu) => {
                    if(menu.isButton()) { 
                        if(menu.customId === "close_id") {
                           await menu.deferUpdate();
                           
                           const embed = new EmbedBuilder()
                           .setTitle(" Closed")
                           .setDescription("You have closed the menu")
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [], files: [] });
                           delete client.pendingCommands[interaction.user.id];
                           collector.stop();
                        } else if(menu.customId === "train_id") {
                           await menu.deferUpdate();
   
   
                           const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                        } else if(menu.customId === "back_train_id") {
                           await menu.deferUpdate();
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
                   
                                await menu.editReply({ content: " ", embeds: [embed], components: [button], files: [attac] });
                           } else if (menu.customId == "remove_id_5_1") {
                               await menu.deferUpdate();
                   
                               if (pet.attack < 5) {
                                   pet.point += pet.attack;
                                   pet.attack -= pet.attack;
                               }
                               if (pet.attack >= 5) {
                                   pet.attack -= 5;
                                   pet.point += 5;
                               }
                   
                               await pet.save();
                               
                   
                               const pet_attack_chack = (pet.attack / pet.attack_max) * 100;
                               const pet_attack_result = Math.round(pet_attack_chack);
                               if(pet_attack_result <= 0) {
                                  pet.emoji_attack = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                                  pet.emoji_attack = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 20) {
                                  pet.emoji_attack = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 30) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 40) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 50) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 60) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 70) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 80) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 90) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 100) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                              } 
                   
                               if (pet.point == 0 && pet.attack == 0) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(true);
                                   button1.components[4].setDisabled(true);
                                 } else if (pet.point >=1 && pet.attack >=1) {
                                   button1.components[0].setDisabled(false);
                                   button1.components[1].setDisabled(false);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                                } else if(pet.attack == 0 && pet.point >= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(false);
                             } else if(pet.attack == 0 && pet.point <= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                             }  else if(pet.attack >= 1 && pet.point == 0) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             }
                   
                             if (pet.point == 0 && pet.defense == 0) {   
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.defense >=1) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense == 0 && pet.point >= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(false);
                               } else if(pet.defense == 0 && pet.point <= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense >= 1 && pet.point == 0) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               }
                   
                               if (pet.point == 0 && pet.speed == 0) {   
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.speed >=1) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed == 0 && pet.point >= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(false);
                                   } else if(pet.speed == 0 && pet.point <= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed >= 1 && pet.point == 0) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   }
                   
                                   if (pet.point == 0 && pet.luck == 0) {   
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       } else if (pet.point >=1 && pet.luck >=1) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck == 0 && pet.point >= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(false);
                                       } else if(pet.luck == 0 && pet.point <= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck >= 1 && pet.point == 0) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       }
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                   
                           } else if (menu.customId == "remove_id_1_1") {
                   
                               await menu.deferUpdate();
                   
                   
                               pet.attack -= 1;
                               pet.point += 1;
                               await pet.save();
                   
                               const pet_attack_chack = (pet.attack / pet.attack_max) * 100;
                               const pet_attack_result = Math.round(pet_attack_chack);
                               if(pet_attack_result <= 0) {
                                  pet.emoji_attack = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                                  pet.emoji_attack = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 20) {
                                  pet.emoji_attack = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 30) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 40) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 50) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 60) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 70) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 80) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 90) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 100) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                              } 
                   
                              if (pet.point == 0 && pet.attack == 0) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             } else if (pet.point >=1 && pet.attack >=1) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                            } else if(pet.attack == 0 && pet.point >= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(false);
                         } else if(pet.attack == 0 && pet.point <= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                         }  else if(pet.attack >= 1 && pet.point == 0) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         }
                   
                         if (pet.point == 0 && pet.defense == 0) {   
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.defense >=1) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense == 0 && pet.point >= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(false);
                           } else if(pet.defense == 0 && pet.point <= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense >= 1 && pet.point == 0) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.speed == 0) {   
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.speed >=1) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed == 0 && pet.point >= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(false);
                               } else if(pet.speed == 0 && pet.point <= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed >= 1 && pet.point == 0) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               }
                   
                               if (pet.point == 0 && pet.luck == 0) {   
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.luck >=1) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck == 0 && pet.point >= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(false);
                                   } else if(pet.luck == 0 && pet.point <= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck >= 1 && pet.point == 0) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   }
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                           } else if (menu.customId == "add_id_1_1") {
                               await menu.deferUpdate();
                   
                               if (pet.attack >= pet.attack_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.attack += 1;
                               pet.point -= 1;
                               await pet.save();
                   
                               const pet_attack_chack = (pet.attack / pet.attack_max) * 100;
                               const pet_attack_result = Math.round(pet_attack_chack);
                               if(pet_attack_result <= 0) {
                                  pet.emoji_attack = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                                  pet.emoji_attack = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 20) {
                                  pet.emoji_attack = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 30) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 40) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 50) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 60) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 70) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 80) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 90) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 100) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                              } 
                   
                              if (pet.point == 0 && pet.attack == 0) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             } else if (pet.point >=1 && pet.attack >=1) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                            } else if(pet.attack == 0 && pet.point >= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(false);
                         } else if(pet.attack == 0 && pet.point <= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                         }  else if(pet.attack >= 1 && pet.point == 0) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         }
                   
                         if (pet.point == 0 && pet.defense == 0) {   
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.defense >=1) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense == 0 && pet.point >= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(false);
                           } else if(pet.defense == 0 && pet.point <= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense >= 1 && pet.point == 0) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.speed == 0) {   
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.speed >=1) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed == 0 && pet.point >= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(false);
                               } else if(pet.speed == 0 && pet.point <= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed >= 1 && pet.point == 0) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               }
                   
                               if (pet.point == 0 && pet.luck == 0) {   
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.luck >=1) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck == 0 && pet.point >= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(false);
                                   } else if(pet.luck == 0 && pet.point <= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck >= 1 && pet.point == 0) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   }
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "add_id_5_1") {
                               await menu.deferUpdate();
                   
                               if (pet.attack >= pet.attack_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               pet.attack += 5;
                               pet.point -= 5;
                               await pet.save();
                   
                               const pet_attack_chack = (pet.attack / pet.attack_max) * 100;
                               const pet_attack_result = Math.round(pet_attack_chack);
                               if(pet_attack_result <= 0) {
                                  pet.emoji_attack = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 10 && pet_attack_result > 0) {
                                  pet.emoji_attack = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 20) {
                                  pet.emoji_attack = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 30) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 40) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 50) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 60) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 70) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 80) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 90) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                              } else if(pet_attack_result <= 100) {
                                  pet.emoji_attack = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                              } 
                              if (pet.point == 0 && pet.attack == 0) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             } else if (pet.point >=1 && pet.attack >=1) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                            } else if(pet.attack == 0 && pet.point >= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(false);
                         } else if(pet.attack == 0 && pet.point <= 5) {
                               button1.components[0].setDisabled(true);
                               button1.components[1].setDisabled(true);
                               button1.components[3].setDisabled(false);
                               button1.components[4].setDisabled(true);
                         }  else if(pet.attack >= 1 && pet.point == 0) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         }
                   
                         if (pet.point == 0 && pet.defense == 0) {   
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.defense >=1) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense == 0 && pet.point >= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(false);
                           } else if(pet.defense == 0 && pet.point <= 5) {
                           button2.components[0].setDisabled(true);
                           button2.components[1].setDisabled(true);
                           button2.components[3].setDisabled(false);
                           button2.components[4].setDisabled(true);
                           } else if(pet.defense >= 1 && pet.point == 0) {
                           button2.components[0].setDisabled(false);
                           button2.components[1].setDisabled(false);
                           button2.components[3].setDisabled(true);
                           button2.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.speed == 0) {   
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.speed >=1) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed == 0 && pet.point >= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(false);
                               } else if(pet.speed == 0 && pet.point <= 5) {
                               button3.components[0].setDisabled(true);
                               button3.components[1].setDisabled(true);
                               button3.components[3].setDisabled(false);
                               button3.components[4].setDisabled(true);
                               } else if(pet.speed >= 1 && pet.point == 0) {
                               button3.components[0].setDisabled(false);
                               button3.components[1].setDisabled(false);
                               button3.components[3].setDisabled(true);
                               button3.components[4].setDisabled(true);
                               }
                   
                               if (pet.point == 0 && pet.luck == 0) {   
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.luck >=1) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck == 0 && pet.point >= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(false);
                                   } else if(pet.luck == 0 && pet.point <= 5) {
                                   button4.components[0].setDisabled(true);
                                   button4.components[1].setDisabled(true);
                                   button4.components[3].setDisabled(false);
                                   button4.components[4].setDisabled(true);
                                   } else if(pet.luck >= 1 && pet.point == 0) {
                                   button4.components[0].setDisabled(false);
                                   button4.components[1].setDisabled(false);
                                   button4.components[3].setDisabled(true);
                                   button4.components[4].setDisabled(true);
                                   }
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           }else if (menu.customId == "remove_id_5_2") {
                               await interamenuction.deferUpdate();
                   
                   
                               if (pet.defense < 5) {
                                   pet.point += pet.defense;
                                   pet.defense -= pet.defense;
                               }
                               if (pet.defense >= 5) {
                                   pet.defense -= 5;
                                   pet.point += 5;
                               }
                   
                               await pet.save();
                   
                               const pet_defense_chack = (pet.defense / pet.defense_max) * 100;
                       const pet_defense_result = Math.round(pet_defense_chack);
                       if(pet_defense_result <= 0) {
                           pet.emoji_defense = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 10 && pet_defense_result > 0) {
                           pet.emoji_defense = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 20) {
                           pet.emoji_defense = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 30) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 40) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 50) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 60) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 70) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 80) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 90) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 100) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                             
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                   
                           } else if (menu.customId == "remove_id_1_2") {
                   
                               await menu.deferUpdate();
                   
                   
                               pet.defense -= 1;
                               pet.point += 1;
                               await pet.save();
                   
                               const pet_defense_chack = (pet.defense / pet.defense_max) * 100;
                       const pet_defense_result = Math.round(pet_defense_chack);
                       if(pet_defense_result <= 0) {
                           pet.emoji_defense = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 10 && pet_defense_result > 0) {
                           pet.emoji_defense = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 20) {
                           pet.emoji_defense = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 30) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 40) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 50) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 60) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 70) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 80) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 90) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 100) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                           } else if (menu.customId == "add_id_1_2") {
                               await menu.deferUpdate();
                   
                               if (pet.defense >= pet.defense_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.defense += 1;
                               pet.point -= 1;
                               await pet.save();
                   
                               const pet_defense_chack = (pet.defense / pet.defense_max) * 100;
                       const pet_defense_result = Math.round(pet_defense_chack);
                       if(pet_defense_result <= 0) {
                           pet.emoji_defense = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 10 && pet_defense_result > 0) {
                           pet.emoji_defense = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 20) {
                           pet.emoji_defense = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 30) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 40) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 50) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 60) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 70) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 80) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 90) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 100) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "add_id_5_2") {
                               await menu.deferUpdate();
                   
                               if (pet.defense >= pet.defense_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.defense += 5;
                               pet.point -= 5;
                               await pet.save();
                   
                               const pet_defense_chack = (pet.defense / pet.defense_max) * 100;
                       const pet_defense_result = Math.round(pet_defense_chack);
                       if(pet_defense_result <= 0) {
                           pet.emoji_defense = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 10 && pet_defense_result > 0) {
                           pet.emoji_defense = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 20) {
                           pet.emoji_defense = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 30) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 40) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 50) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 60) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 70) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 80) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 90) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_defense_result <= 100) {
                           pet.emoji_defense = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                             
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           }else if (menu.customId == "remove_id_5_3") {
                               await menu.deferUpdate();
                   
                   
                               if (pet.speed < 5) {
                                   pet.point += pet.speed;
                                   pet.speed -= pet.speed;
                               }
                               if (pet.speed >= 5) {
                                   pet.speed -= 5;
                                   pet.point += 5;
                               }
                   
                               await pet.save();
                   
                               const pet_speed_chack = (pet.speed / pet.speed_max) * 100;
                               const pet_speed_result = Math.round(pet_speed_chack);
                               if(pet_speed_result <= 0) {
                                   pet.emoji_speed = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 10 && pet_speed_result > 0) {
                                   pet.emoji_speed = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 20) {
                                   pet.emoji_speed = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 30) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 40) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 50) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 60) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 70) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 80) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 90) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 100) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                               } 
                   
                               if (pet.point == 0 && pet.attack == 0) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(true);
                                   button1.components[4].setDisabled(true);
                                 } else if (pet.point >=1 && pet.attack >=1) {
                                   button1.components[0].setDisabled(false);
                                   button1.components[1].setDisabled(false);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                                } else if(pet.attack == 0 && pet.point >= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(false);
                             } else if(pet.attack == 0 && pet.point <= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                             }  else if(pet.attack >= 1 && pet.point == 0) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             }
                           
                             if (pet.point == 0 && pet.defense == 0) {   
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.defense >=1) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense == 0 && pet.point >= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(false);
                               } else if(pet.defense == 0 && pet.point <= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense >= 1 && pet.point == 0) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               }
                           
                               if (pet.point == 0 && pet.speed == 0) {   
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.speed >=1) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed == 0 && pet.point >= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(false);
                                   } else if(pet.speed == 0 && pet.point <= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed >= 1 && pet.point == 0) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   }
                           
                                   if (pet.point == 0 && pet.luck == 0) {   
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       } else if (pet.point >=1 && pet.luck >=1) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck == 0 && pet.point >= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(false);
                                       } else if(pet.luck == 0 && pet.point <= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck >= 1 && pet.point == 0) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       }
                   
                             
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                   
                           } else if (menu.customId == "remove_id_1_3") {
                   
                               await menu.deferUpdate();
                   
                   
                               pet.speed -= 1;
                               pet.point += 1;
                               await pet.save();
                   
                               const pet_speed_chack = (pet.speed / pet.speed_max) * 100;
                               const pet_speed_result = Math.round(pet_speed_chack);
                               if(pet_speed_result <= 0) {
                                   pet.emoji_speed = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 10 && pet_speed_result > 0) {
                                   pet.emoji_speed = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 20) {
                                   pet.emoji_speed = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 30) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 40) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 50) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 60) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 70) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 80) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 90) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 100) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                               } 
                   
                               if (pet.point == 0 && pet.attack == 0) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(true);
                                   button1.components[4].setDisabled(true);
                                 } else if (pet.point >=1 && pet.attack >=1) {
                                   button1.components[0].setDisabled(false);
                                   button1.components[1].setDisabled(false);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                                } else if(pet.attack == 0 && pet.point >= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(false);
                             } else if(pet.attack == 0 && pet.point <= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                             }  else if(pet.attack >= 1 && pet.point == 0) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             }
                           
                             if (pet.point == 0 && pet.defense == 0) {   
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.defense >=1) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense == 0 && pet.point >= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(false);
                               } else if(pet.defense == 0 && pet.point <= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense >= 1 && pet.point == 0) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               }
                           
                               if (pet.point == 0 && pet.speed == 0) {   
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.speed >=1) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed == 0 && pet.point >= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(false);
                                   } else if(pet.speed == 0 && pet.point <= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed >= 1 && pet.point == 0) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   }
                           
                                   if (pet.point == 0 && pet.luck == 0) {   
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       } else if (pet.point >=1 && pet.luck >=1) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck == 0 && pet.point >= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(false);
                                       } else if(pet.luck == 0 && pet.point <= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck >= 1 && pet.point == 0) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                           } else if (menu.customId == "add_id_1_3") {
                               await menu.deferUpdate();
                   
                               if (pet.speed >= pet.speed_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.speed += 1;
                               pet.point -= 1;
                               await pet.save();
                   
                               const pet_speed_chack = (pet.speed / pet.speed_max) * 100;
                               const pet_speed_result = Math.round(pet_speed_chack);
                               if(pet_speed_result <= 0) {
                                   pet.emoji_speed = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 10 && pet_speed_result > 0) {
                                   pet.emoji_speed = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 20) {
                                   pet.emoji_speed = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 30) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 40) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 50) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 60) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 70) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 80) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 90) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 100) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                               } 
                   
                               if (pet.point == 0 && pet.attack == 0) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(true);
                                   button1.components[4].setDisabled(true);
                                 } else if (pet.point >=1 && pet.attack >=1) {
                                   button1.components[0].setDisabled(false);
                                   button1.components[1].setDisabled(false);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                                } else if(pet.attack == 0 && pet.point >= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(false);
                             } else if(pet.attack == 0 && pet.point <= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                             }  else if(pet.attack >= 1 && pet.point == 0) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             }
                           
                             if (pet.point == 0 && pet.defense == 0) {   
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.defense >=1) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense == 0 && pet.point >= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(false);
                               } else if(pet.defense == 0 && pet.point <= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense >= 1 && pet.point == 0) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               }
                           
                               if (pet.point == 0 && pet.speed == 0) {   
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.speed >=1) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed == 0 && pet.point >= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(false);
                                   } else if(pet.speed == 0 && pet.point <= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed >= 1 && pet.point == 0) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   }
                           
                                   if (pet.point == 0 && pet.luck == 0) {   
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       } else if (pet.point >=1 && pet.luck >=1) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck == 0 && pet.point >= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(false);
                                       } else if(pet.luck == 0 && pet.point <= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck >= 1 && pet.point == 0) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "add_id_5_3") {
                               await menu.deferUpdate();
                   
                               if (pet.speed >= pet.speed_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.speed += 5;
                               pet.point -= 5;
                               await pet.save();
                   
                                const pet_speed_chack = (pet.speed / pet.speed_max) * 100;
                               const pet_speed_result = Math.round(pet_speed_chack);
                               if(pet_speed_result <= 0) {
                                   pet.emoji_speed = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 10 && pet_speed_result > 0) {
                                   pet.emoji_speed = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 20) {
                                   pet.emoji_speed = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 30) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 40) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 50) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 60) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 70) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 80) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 90) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                               } else if(pet_speed_result <= 100) {
                                   pet.emoji_speed = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                               } 
                   
                               if (pet.point == 0 && pet.attack == 0) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(true);
                                   button1.components[4].setDisabled(true);
                                 } else if (pet.point >=1 && pet.attack >=1) {
                                   button1.components[0].setDisabled(false);
                                   button1.components[1].setDisabled(false);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                                } else if(pet.attack == 0 && pet.point >= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(false);
                             } else if(pet.attack == 0 && pet.point <= 5) {
                                   button1.components[0].setDisabled(true);
                                   button1.components[1].setDisabled(true);
                                   button1.components[3].setDisabled(false);
                                   button1.components[4].setDisabled(true);
                             }  else if(pet.attack >= 1 && pet.point == 0) {
                               button1.components[0].setDisabled(false);
                               button1.components[1].setDisabled(false);
                               button1.components[3].setDisabled(true);
                               button1.components[4].setDisabled(true);
                             }
                           
                             if (pet.point == 0 && pet.defense == 0) {   
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.defense >=1) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense == 0 && pet.point >= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(false);
                               } else if(pet.defense == 0 && pet.point <= 5) {
                               button2.components[0].setDisabled(true);
                               button2.components[1].setDisabled(true);
                               button2.components[3].setDisabled(false);
                               button2.components[4].setDisabled(true);
                               } else if(pet.defense >= 1 && pet.point == 0) {
                               button2.components[0].setDisabled(false);
                               button2.components[1].setDisabled(false);
                               button2.components[3].setDisabled(true);
                               button2.components[4].setDisabled(true);
                               }
                           
                               if (pet.point == 0 && pet.speed == 0) {   
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   } else if (pet.point >=1 && pet.speed >=1) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed == 0 && pet.point >= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(false);
                                   } else if(pet.speed == 0 && pet.point <= 5) {
                                   button3.components[0].setDisabled(true);
                                   button3.components[1].setDisabled(true);
                                   button3.components[3].setDisabled(false);
                                   button3.components[4].setDisabled(true);
                                   } else if(pet.speed >= 1 && pet.point == 0) {
                                   button3.components[0].setDisabled(false);
                                   button3.components[1].setDisabled(false);
                                   button3.components[3].setDisabled(true);
                                   button3.components[4].setDisabled(true);
                                   }
                           
                                   if (pet.point == 0 && pet.luck == 0) {   
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       } else if (pet.point >=1 && pet.luck >=1) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck == 0 && pet.point >= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(false);
                                       } else if(pet.luck == 0 && pet.point <= 5) {
                                       button4.components[0].setDisabled(true);
                                       button4.components[1].setDisabled(true);
                                       button4.components[3].setDisabled(false);
                                       button4.components[4].setDisabled(true);
                                       } else if(pet.luck >= 1 && pet.point == 0) {
                                       button4.components[0].setDisabled(false);
                                       button4.components[1].setDisabled(false);
                                       button4.components[3].setDisabled(true);
                                       button4.components[4].setDisabled(true);
                                       }
                   
                             
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "remove_id_5_4") {
                               await menu.deferUpdate();
                   
                   
                              
                               if (pet.luck < 5) {
                                   pet.point += pet.luck;
                                   pet.luck -= pet.luck;
                               }
                               if (pet.luck >= 5) {
                                   pet.luck -= 5;
                                   pet.point += 5;
                               }
                   
                               await pet.save();
                   
                               const pet_luck_chack = (pet.luck / pet.luck_max) * 100;
                       const pet_luck_result = Math.round(pet_luck_chack);
                       if(pet_luck_result <= 0) {
                           pet.emoji_luck = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 10 && pet_luck_result > 0) {
                           pet.emoji_luck = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 20) {
                           pet.emoji_luck = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 30) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 40) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 50) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 60) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 70) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 80) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 90) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 100) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                             
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                   
                           } else if (menu.customId == "remove_id_1_4") {
                   
                               await menu.deferUpdate();
                   
                   
                               pet.luck -= 1;
                               pet.point += 1;
                               await pet.save();
                   
                               const pet_luck_chack = (pet.luck / pet.luck_max) * 100;
                       const pet_luck_result = Math.round(pet_luck_chack);
                       if(pet_luck_result <= 0) {
                           pet.emoji_luck = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 10 && pet_luck_result > 0) {
                           pet.emoji_luck = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 20) {
                           pet.emoji_luck = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 30) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 40) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 50) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 60) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 70) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 80) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 90) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 100) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                   
                           } else if (menu.customId == "add_id_1_4") {
                               await menu.deferUpdate();
                   
                               if (pet.luck >= pet.luck_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.luck += 1;
                               pet.point -= 1;
                               await pet.save();
                   
                               const pet_luck_chack = (pet.luck / pet.luck_max) * 100;
                       const pet_luck_result = Math.round(pet_luck_chack);
                       if(pet_luck_result <= 0) {
                           pet.emoji_luck = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 10 && pet_luck_result > 0) {
                           pet.emoji_luck = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 20) {
                           pet.emoji_luck = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 30) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 40) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 50) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 60) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 70) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 80) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 90) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 100) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                   
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                   
                   
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "add_id_5_4") {
                               await menu.deferUpdate();
                   
                               if (pet.luck >= pet.luck_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                               if(pet.attack + pet.defense + pet.speed + pet.luck >= pet.point_max) {
                                   return interaction.followUp({ content: `You have reached the max amount of points you can have.`, components: [], files: [], ephemeral: true });
                               }
                   
                   
                               pet.luck += 5;
                               pet.point -= 5;
                               await pet.save();
                   
                               const pet_luck_chack = (pet.luck / pet.luck_max) * 100;
                       const pet_luck_result = Math.round(pet_luck_chack);
                       if(pet_luck_result <= 0) {
                           pet.emoji_luck = "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 10 && pet_luck_result > 0) {
                           pet.emoji_luck = "<:1068212769968631898:1082296591173550170><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 20) {
                           pet.emoji_luck = "<:1068212772954964070:1082296594923257966><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 30) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 40) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 50) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 60) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 70) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main2:1082296667639910432><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 80) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212777623228516:1082296600585588776><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 90) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:main3:1082296671297355847>";
                       } else if(pet_luck_result <= 100) {
                           pet.emoji_luck = "<:1068212774376849448:1082296596898791464><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212782639628308:1082296604448542801><:1068212789023363163:1082296608823185518>";
                       } 
                       if (pet.point == 0 && pet.attack == 0) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(true);
                           button1.components[4].setDisabled(true);
                         } else if (pet.point >=1 && pet.attack >=1) {
                           button1.components[0].setDisabled(false);
                           button1.components[1].setDisabled(false);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                        } else if(pet.attack == 0 && pet.point >= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(false);
                     } else if(pet.attack == 0 && pet.point <= 5) {
                           button1.components[0].setDisabled(true);
                           button1.components[1].setDisabled(true);
                           button1.components[3].setDisabled(false);
                           button1.components[4].setDisabled(true);
                     }  else if(pet.attack >= 1 && pet.point == 0) {
                       button1.components[0].setDisabled(false);
                       button1.components[1].setDisabled(false);
                       button1.components[3].setDisabled(true);
                       button1.components[4].setDisabled(true);
                     }
                   
                     if (pet.point == 0 && pet.defense == 0) {   
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       } else if (pet.point >=1 && pet.defense >=1) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense == 0 && pet.point >= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(false);
                       } else if(pet.defense == 0 && pet.point <= 5) {
                       button2.components[0].setDisabled(true);
                       button2.components[1].setDisabled(true);
                       button2.components[3].setDisabled(false);
                       button2.components[4].setDisabled(true);
                       } else if(pet.defense >= 1 && pet.point == 0) {
                       button2.components[0].setDisabled(false);
                       button2.components[1].setDisabled(false);
                       button2.components[3].setDisabled(true);
                       button2.components[4].setDisabled(true);
                       }
                   
                       if (pet.point == 0 && pet.speed == 0) {   
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           } else if (pet.point >=1 && pet.speed >=1) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed == 0 && pet.point >= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(false);
                           } else if(pet.speed == 0 && pet.point <= 5) {
                           button3.components[0].setDisabled(true);
                           button3.components[1].setDisabled(true);
                           button3.components[3].setDisabled(false);
                           button3.components[4].setDisabled(true);
                           } else if(pet.speed >= 1 && pet.point == 0) {
                           button3.components[0].setDisabled(false);
                           button3.components[1].setDisabled(false);
                           button3.components[3].setDisabled(true);
                           button3.components[4].setDisabled(true);
                           }
                   
                           if (pet.point == 0 && pet.luck == 0) {   
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               } else if (pet.point >=1 && pet.luck >=1) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck == 0 && pet.point >= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(false);
                               } else if(pet.luck == 0 && pet.point <= 5) {
                               button4.components[0].setDisabled(true);
                               button4.components[1].setDisabled(true);
                               button4.components[3].setDisabled(false);
                               button4.components[4].setDisabled(true);
                               } else if(pet.luck >= 1 && pet.point == 0) {
                               button4.components[0].setDisabled(false);
                               button4.components[1].setDisabled(false);
                               button4.components[3].setDisabled(true);
                               button4.components[4].setDisabled(true);
                               }
                             
                              const embed = new EmbedBuilder()
                           .setAuthor({ name: `You have ${pet.point} points left to spend.`,})
                           .setThumbnail("https://i.imgur.com/cLviFvM.png")
                           .setFields(
                               {
                                   name: "Attack", value: `${pet.emoji_attack} \` ${pet.attack}/${pet.attack_max} \``, inline: false
                               },
                               {
                                   name: "Defense", value: `${pet.emoji_defense} \` ${pet.defense}/${pet.defense_max} \``, inline: false
                               },
                               {
                                   name: "Speed", value: `${pet.emoji_speed} \` ${pet.speed}/${pet.speed_max} \``, inline: false
                               },
                               {
                                   name: "Luck", value: `${pet.emoji_luck} \` ${pet.luck}/${pet.luck_max} \``, inline: false
                               },
                           )
                           .setFooter({ text: `Max amount of points you can have is ${pet.point_max}`, })
                           .setColor(client.color)
                   
                           await menu.editReply({ embeds: [embed], components: [button1, button2, button3, button4, button_back], files: [] });
                           } else if (menu.customId == "rename_id") {
                                 const modal = new ModalBuilder()
                                   .setTitle('Rename Avatar')
                                   .setCustomId('rename_modal')
                                   .setComponents(
                                     new ActionRowBuilder().setComponents(
                                       new TextInputBuilder()
                                         .setLabel('Rename Avatar')
                                         .setCustomId('rename_input')
                                         .setPlaceholder('Enter a new name for your avatar')
                                         .setStyle(TextInputStyle.Short)
                                     ),
                                   );
                                   await menu.showModal(modal);
                           }else if (menu.customId == "item_id") {
                               await  menu.deferUpdate();
                       
                           const embed = new EmbedBuilder()
                           .setDescription("All items are listed below.")
                           .setFields(
                               { name: "Sword", value: `${pet.type[0].sword.emoji}`, inline: false },
                               { name: "Armor Head", value: `${pet.type[0].armor_head.emoji}`, inline: false },
                               { name: "Armor Body", value: `${pet.type[0].armor_body.emoji}`, inline: false },
                               { name: "Armor Leg", value: `${pet.type[0].armor_leg.emoji}`, inline: false },
                               { name: "Armor Foot", value: `${pet.type[0].armor_foot.emoji}`, inline: false },
                           )
                       
                           await menu.editReply({ embeds: [embed], components: [ select, button_back], files: [] });
                       
                       
                           } else if (menu.customId == "change_item_sword_id") {
                               await menu.deferUpdate();
                       
                               const value = Object.values(iteminv.item);
                               const object = value.filter(x => x.type === `${pet.type[0].sword.type}`);
                               // if not have food return msg
                               if(object.length === 0) {
                                   const embed = new EmbedBuilder()
                                       .setColor(client.color)
                                       .setDescription(`You don't have any sword.`)
                       
                                   return interaction.followUp({ content: " ", embeds: [embed], components: [], ephemeral: true });
                               }
                       
                               const select_sword = new ActionRowBuilder()
                               .addComponents([
                                   new StringSelectMenuBuilder()
                                       .setCustomId("change_sword_human_id")
                                       .setPlaceholder("Select a sword.")
                                       .setOptions(object.map(key => {
                                           return new SelectMenuOptionBuilder()
                                               .setLabel(`${toOppositeCase(key.name)}`)
                                               .setValue(key.id)
                                           }
                                       ))
                                   ])
                       
                       
                               const embed = new EmbedBuilder()
                               .setDescription("Select a sword to change.")
                       
                                   await menu.editReply({ content: " ", embeds: [embed], components: [select_sword, gosword] });
                       
                                   let filter = (m) => m.user.id === interaction.user.id;
                                   let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                       
                                   collector.on('collect', async (menu) => {
                                       if(menu.isStringSelectMenu()) {
                                           if(menu.customId === "change_sword_human_id") {
                                               await menu.deferUpdate();
                       
                                               const pet = await GPet.findOne({ user: interaction.user.id});
                       
                                               let [ directory ] = menu.values;
                                               const value = Object.values(iteminv.item);
                                               const object = value.filter(x => x.id === directory);;
                       
                                               const embed = new EmbedBuilder()
                                               .setDescription("Are you sure you want to change your sword?")
                                               .setFields(
                                                   { name: "Sword", value: `${pet.type[0].sword.name} -> ${object[0].name}`, inline: false },
                                                   { name: "Status", value: `${pet.type[0].sword.status} -> ${object[0].status}`, inline: false },
                                                   { name: "Damage Attack", value: `${pet.type[0].sword.damage_attack} -> ${object[0].damage_attack}`, inline: false },
                                                   { name: "Crirical", value: `${pet.type[0].sword.critical} -> ${object[0].crirical}`, inline: false },
                                                   { name: "Durability", value: `${pet.type[0].sword.durability} -> ${object[0].durability}`, inline: false },
                                                   { name: "Level Upgade", value: `${pet.type[0].sword.level_upgade} -> ${object[0].level_upgade}`, inline: false },
                                               )
                                               .setColor(client.color)
                       
                                               pet.type[0] = {
                                                   type: pet.type[0].type,
                                                   type_system: pet.type[0].type_system,
                                                   emoji: pet.type[0].emoji,
                                                   sword: {
                                                       name: object[0].name,
                                                       emoji: object[0].emoji,
                                                       status: object[0].status,
                                                       type: object[0].type,
                                                       damage_attack: object[0].damage_attack,
                                                       critical: object[0].critical,
                                                       durability: object[0].durability,
                                                       level_upgade: object[0].level_upgade,
                                                   },
                                                   armor_head: {
                                                       name: pet.type[0].armor_head.name,
                                                       emoji: pet.type[0].armor_head.emoji,
                                                       status: pet.type[0].armor_head.status,
                                                       type: pet.type[0].armor_head.type,
                                                       defense: pet.type[0].armor_head.defense,
                                                   },
                                                   armor_body: {
                                                       name: pet.type[0].armor_body.name,
                                                       emoji: pet.type[0].armor_body.emoji,
                                                       status: pet.type[0].armor_body.status,
                                                       type: pet.type[0].armor_body.type,
                                                       defense: pet.type[0].armor_body.defense,
                                                   },
                                                   armor_leg: {
                                                       name: pet.type[0].armor_leg.name,
                                                       emoji: pet.type[0].armor_leg.emoji,
                                                       status: pet.type[0].armor_leg.status,
                                                       type: pet.type[0].armor_leg.type,
                                                       defense: pet.type[0].armor_leg.defense,
                                                   },
                                                   armor_foot: {
                                                       name: pet.type[0].armor_foot.name,
                                                       emoji: pet.type[0].armor_foot.emoji,
                                                       status: pet.type[0].armor_foot.status,
                                                       type: pet.type[0].armor_foot.type,
                                                       defense: pet.type[0].armor_foot.defense,
                                                   },
                                               };
   
                                               await pet.save();
                           
                       
                                               await menu.editReply({ content: " ", embeds: [embed], components: [select_sword, gosword] });
                                           }
                                       }  
                                   });
                       
                           } else if (menu.customId == "remove_item_sword_id") {
                               await menu.deferUpdate();
                       
                               if(pet.type[0].sword.status == "default") return menu.followUp({ content: "คุณไม่สามารถลบไอเทมนี้ได้", ephemeral: true});
                       
                                            
                               const button_confirm_cancel = new ActionRowBuilder()
                               .addComponents(
                                   new ButtonBuilder()
                                   .setCustomId("confirm_remove_item_sword_id")
                                   .setLabel("Confirm")
                                   .setStyle(ButtonStyle.Secondary),
                                   new ButtonBuilder()
                                   .setCustomId("cancel_remove_item_sword_id")
                                   .setLabel("Cancel")
                                   .setStyle(ButtonStyle.Secondary),
                               );
                       
                               const embed = new EmbedBuilder()
                               .setDescription("Are you sure you want to remove this item?")
                       
                               await menu.editReply({ embeds: [embed], components: [button_confirm_cancel], files: [] });
                           } else if (menu.customId == "confirm_remove_item_sword_id") {
                               await menu.deferUpdate();
                       
                               const embed = new EmbedBuilder()
                               .setDescription("You have removed this item.")
                       
                               await menu.editReply({ embeds: [embed], components: [gosword], files: [] });
                           } else if (menu.customId == "cancel_remove_item_sword_id") {
                            await  menu.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setTitle('Sword')
                            .setFields(
                                {
                                    name: "Damage", value: `${pet.type[0].sword.damage_attack}`, inline: false
                                },
                                {
                                    name: "Critical", value: `${pet.type[0].sword.critical}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].sword.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].sword.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)
                
                            await menu.editReply({ embeds: [embed], components: [select, button_change_remove_sword, button_back] });
                           } else if (menu.customId == "change_item_armor_head_id") {
                            await menu.deferUpdate();
                    
                            const value = Object.values(iteminv.item);
                            const object = value.filter(x => x.type === `${pet.type[0].armor_head.type}`);
                            // if not have food return msg
                            if(object.length === 0) {
                                const embed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`You don't have any armor head.`)
                    
                                return interaction.followUp({ content: " ", embeds: [embed], components: [], ephemeral: true });
                            }
                    
                            const select_armor_head = new ActionRowBuilder()
                            .addComponents([
                                new StringSelectMenuBuilder()
                                    .setCustomId("change_armor_head_human_id")
                                    .setPlaceholder("Select a armor head.")
                                    .setOptions(object.map(key => {
                                        return new SelectMenuOptionBuilder()
                                            .setLabel(`${toOppositeCase(key.name)}`)
                                            .setValue(key.id)
                                        }
                                    ))
                                ])
                    
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Select a armor head to change.")
                    
                                await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_head, goarmor_head] });
                    
                                let filter = (m) => m.user.id === interaction.user.id;
                                let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                    
                                collector.on('collect', async (menu) => {
                                    if(menu.isStringSelectMenu()) {
                                        if(menu.customId === "change_armor_head_human_id") {
                                            await menu.deferUpdate();
                    
                                            const pet = await GPet.findOne({ user: interaction.user.id});
                    
                                            let [ directory ] = menu.values;
                                            const value = Object.values(iteminv.item);
                                            const object = value.filter(x => x.id === directory);;
                    
                                            const embed = new EmbedBuilder()
                                            .setDescription("Are you sure you want to change your armor head?")
                                            .setFields(
                                                { name: "Sword", value: `${pet.type[0].armor_head.name} -> ${object[0].name}`, inline: false },
                                                { name: "Status", value: `${pet.type[0].armor_head.status} -> ${object[0].status}`, inline: false },
                                                { name: "Defense", value: `${pet.type[0].armor_head.defense} -> ${object[0].defense}`, inline: false },
                                                { name: "Level Upgade", value: `${pet.type[0].armor_head.level_upgade} -> ${object[0].level_upgade}`, inline: false },
                                            )
                                            .setColor(client.color)
                    
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack,
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: object[0].name,
                                                    emoji: object[0].emoji,
                                                    status: object[0].status,
                                                    type: object[0].type,
                                                    defense: object[0].defense,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense,
                                                },
                                            };

                                            await pet.save();
                        
                    
                                            await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_head, goarmor_head] });
                                        }
                                    }  
                                });
                    
                           } else if (menu.customId == "remove_item_armor_head_id") {
                            await menu.deferUpdate();
                    
                            if(pet.type[0].armor_head.status == "default") return menu.followUp({ content: "คุณไม่สามารถลบไอเทมนี้ได้", ephemeral: true});
                    
                                         
                            const button_confirm_cancel = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("confirm_remove_item_armor_head_id")
                                .setLabel("Confirm")
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId("cancel_remove_item_armor_head_id")
                                .setLabel("Cancel")
                                .setStyle(ButtonStyle.Secondary),
                            );
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Are you sure you want to remove this item?")
                    
                            await menu.editReply({ embeds: [embed], components: [button_confirm_cancel], files: [] });
                           } else if (menu.customId == "confirm_remove_item_armor_head_id") {
                            await menu.deferUpdate();
                    
                            const embed = new EmbedBuilder()
                            .setDescription("You have removed this item.")
                    
                            await menu.editReply({ embeds: [embed], components: [goarmor_head], files: [] });
                           } else if (menu.customId == "cancel_remove_item_armor_head_id") {
                            await  menu.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setTitle('Armor Head')
                            .setFields(
                                {
                                    name: "Defense", value: `${pet.type[0].armor_head.defense}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].armor_head.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].armor_head.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)

                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_head, button_back] });
                           }else if (menu.customId == "change_item_armor_body_id") {
                            await menu.deferUpdate();
                    
                            const value = Object.values(iteminv.item);
                            const object = value.filter(x => x.type === `${pet.type[0].armor_body.type}`);
                            // if not have food return msg
                            if(object.length === 0) {
                                const embed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`You don't have any armor body.`)
                    
                                return interaction.followUp({ content: " ", embeds: [embed], components: [], ephemeral: true });
                            }
                    
                            const select_armor_body = new ActionRowBuilder()
                            .addComponents([
                                new StringSelectMenuBuilder()
                                    .setCustomId("change_armor_body_human_id")
                                    .setPlaceholder("Select a armor body.")
                                    .setOptions(object.map(key => {
                                        return new SelectMenuOptionBuilder()
                                            .setLabel(`${toOppositeCase(key.name)}`)
                                            .setValue(key.id)
                                        }
                                    ))
                                ])
                    
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Select a armor body to change.")
                    
                                await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_body, goarmor_body] });
                    
                                let filter = (m) => m.user.id === interaction.user.id;
                                let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                    
                                collector.on('collect', async (menu) => {
                                    if(menu.isStringSelectMenu()) {
                                        if(menu.customId === "change_armor_body_human_id") {
                                            await menu.deferUpdate();
                    
                                            const pet = await GPet.findOne({ user: interaction.user.id});
                    
                                            let [ directory ] = menu.values;
                                            const value = Object.values(iteminv.item);
                                            const object = value.filter(x => x.id === directory);;
                    
                                            const embed = new EmbedBuilder()
                                            .setDescription("Are you sure you want to change your armor body?")
                                            .setFields(
                                                { name: "Sword", value: `${pet.type[0].armor_body.name} -> ${object[0].name}`, inline: false },
                                                { name: "Status", value: `${pet.type[0].armor_body.status} -> ${object[0].status}`, inline: false },
                                                { name: "Defense", value: `${pet.type[0].armor_body.defense} -> ${object[0].defense}`, inline: false },
                                                { name: "Level Upgade", value: `${pet.type[0].armor_body.level_upgade} -> ${object[0].level_upgade}`, inline: false },
                                            )
                                            .setColor(client.color)
                    
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack,
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                },
                                                armor_body: {
                                                    name: object[0].name,
                                                    emoji: object[0].emoji,
                                                    status: object[0].status,
                                                    type: object[0].type,
                                                    defense: object[0].defense,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense,
                                                },
                                            };

                                            await pet.save();
                        
                    
                                            await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_body, goarmor_body] });
                                        }
                                    }  
                                });
                    
                           } else if (menu.customId == "remove_item_armor_body_id") {
                            await menu.deferUpdate();
                    
                            if(pet.type[0].armor_body.status == "default") return menu.followUp({ content: "คุณไม่สามารถลบไอเทมนี้ได้", ephemeral: true});
                    
                                         
                            const button_confirm_cancel = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("confirm_remove_item_armor_body_id")
                                .setLabel("Confirm")
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId("cancel_remove_item_armor_body_id")
                                .setLabel("Cancel")
                                .setStyle(ButtonStyle.Secondary),
                            );
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Are you sure you want to remove this item?")
                    
                            await menu.editReply({ embeds: [embed], components: [button_confirm_cancel], files: [] });
                           } else if (menu.customId == "confirm_remove_item_armor_body_id") {
                            await menu.deferUpdate();
                    
                            const embed = new EmbedBuilder()
                            .setDescription("You have removed this item.")
                    
                            await menu.editReply({ embeds: [embed], components: [goarmor_body], files: [] });
                           } else if (menu.customId == "cancel_remove_item_armor_body_id") {
                            await  menu.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setTitle('Armor Body')
                            .setFields(
                                {
                                    name: "Defense", value: `${pet.type[0].armor_body.defense}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].armor_body.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)

                   
                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_body, button_back] });
                           } else if (menu.customId == "change_item_armor_leg_id") {
                            await menu.deferUpdate();
                    
                            const value = Object.values(iteminv.item);
                            const object = value.filter(x => x.type === `${pet.type[0].armor_leg.type}`);
                            // if not have food return msg
                            if(object.length === 0) {
                                const embed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`You don't have any armor leg.`)
                    
                                return interaction.followUp({ content: " ", embeds: [embed], components: [], ephemeral: true });
                            }
                    
                            const select_armor_leg = new ActionRowBuilder()
                            .addComponents([
                                new StringSelectMenuBuilder()
                                    .setCustomId("change_armor_leg_human_id")
                                    .setPlaceholder("Select a armor leg.")
                                    .setOptions(object.map(key => {
                                        return new SelectMenuOptionBuilder()
                                            .setLabel(`${toOppositeCase(key.name)}`)
                                            .setValue(key.id)
                                        }
                                    ))
                                ])
                    
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Select a armor leg to change.")
                    
                                await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_leg, goarmor_leg] });
                    
                                let filter = (m) => m.user.id === interaction.user.id;
                                let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                    
                                collector.on('collect', async (menu) => {
                                    if(menu.isStringSelectMenu()) {
                                        if(menu.customId === "change_armor_leg_human_id") {
                                            await menu.deferUpdate();
                    
                                            const pet = await GPet.findOne({ user: interaction.user.id});
                    
                                            let [ directory ] = menu.values;
                                            const value = Object.values(iteminv.item);
                                            const object = value.filter(x => x.id === directory);;
                    
                                            const embed = new EmbedBuilder()
                                            .setDescription("Are you sure you want to change your armor leg?")
                                            .setFields(
                                                { name: "Sword", value: `${pet.type[0].armor_leg.name} -> ${object[0].name}`, inline: false },
                                                { name: "Status", value: `${pet.type[0].armor_leg.status} -> ${object[0].status}`, inline: false },
                                                { name: "Defense", value: `${pet.type[0].armor_leg.defense} -> ${object[0].defense}`, inline: false },
                                                { name: "Level Upgade", value: `${pet.type[0].armor_leg.level_upgade} -> ${object[0].level_upgade}`, inline: false },
                                            )
                                            .setColor(client.color)
                    
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack,
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense,
                                                },
                                                armor_leg: {
                                                    name: object[0].name,
                                                    emoji: object[0].emoji,
                                                    status: object[0].status,
                                                    type: object[0].type,
                                                    defense: object[0].defense,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense,
                                                },
                                            };

                                            await pet.save();
                        
                    
                                            await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_leg, goarmor_leg] });
                                        }
                                    }  
                                });
                    
                           } else if (menu.customId == "remove_item_armor_leg_id") {
                            await menu.deferUpdate();
                    
                            if(pet.type[0].armor_leg.status == "default") return menu.followUp({ content: "คุณไม่สามารถลบไอเทมนี้ได้", ephemeral: true});
                    
                                         
                            const button_confirm_cancel = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("confirm_remove_item_armor_leg_id")
                                .setLabel("Confirm")
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId("cancel_remove_item_armor_leg_id")
                                .setLabel("Cancel")
                                .setStyle(ButtonStyle.Secondary),
                            );
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Are you sure you want to remove this item?")
                    
                            await menu.editReply({ embeds: [embed], components: [button_confirm_cancel], files: [] });
                           } else if (menu.customId == "confirm_remove_item_armor_leg_id") {
                            await menu.deferUpdate();
                    
                            const embed = new EmbedBuilder()
                            .setDescription("You have removed this item.")
                    
                            await menu.editReply({ embeds: [embed], components: [goarmor_leg], files: [] });
                           } else if (menu.customId == "cancel_remove_item_armor_leg_id") {
                            await  menu.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setTitle('Armor Leg')
                            .setFields(
                                {
                                    name: "Defense", value: `${pet.type[0].armor_leg.defense}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].armor_leg.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)

                   
                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_leg, button_back] });
                           }else if (menu.customId == "change_item_armor_foot_id") {
                            await menu.deferUpdate();
                    
                            const value = Object.values(iteminv.item);
                            const object = value.filter(x => x.type === `${pet.type[0].armor_foot.type}`);
                            // if not have food return msg
                            if(object.length === 0) {
                                const embed = new EmbedBuilder()
                                    .setColor(client.color)
                                    .setDescription(`You don't have any armor foot.`)
                    
                                return interaction.followUp({ content: " ", embeds: [embed], components: [], ephemeral: true });
                            }
                    
                            const select_armor_foot = new ActionRowBuilder()
                            .addComponents([
                                new StringSelectMenuBuilder()
                                    .setCustomId("change_armor_foot_human_id")
                                    .setPlaceholder("Select a armor foot.")
                                    .setOptions(object.map(key => {
                                        return new SelectMenuOptionBuilder()
                                            .setLabel(`${toOppositeCase(key.name)}`)
                                            .setValue(key.id)
                                        }
                                    ))
                                ])
                    
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Select a armor foot to change.")
                    
                                await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_foot, goarmor_foot] });
                    
                                let filter = (m) => m.user.id === interaction.user.id;
                                let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                    
                                collector.on('collect', async (menu) => {
                                    if(menu.isStringSelectMenu()) {
                                        if(menu.customId === "change_armor_foot_human_id") {
                                            await menu.deferUpdate();
                    
                                            const pet = await GPet.findOne({ user: interaction.user.id});
                    
                                            let [ directory ] = menu.values;
                                            const value = Object.values(iteminv.item);
                                            const object = value.filter(x => x.id === directory);;
                    
                                            const embed = new EmbedBuilder()
                                            .setDescription("Are you sure you want to change your armor foot?")
                                            .setFields(
                                                { name: "Sword", value: `${pet.type[0].armor_foot.name} -> ${object[0].name}`, inline: false },
                                                { name: "Status", value: `${pet.type[0].armor_foot.status} -> ${object[0].status}`, inline: false },
                                                { name: "Defense", value: `${pet.type[0].armor_foot.defense} -> ${object[0].defense}`, inline: false },
                                                { name: "Level Upgade", value: `${pet.type[0].armor_foot.level_upgade} -> ${object[0].level_upgade}`, inline: false },
                                            )
                                            .setColor(client.color)
                    
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack,
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense,
                                                },
                                                armor_foot: {
                                                    name: object[0].name,
                                                    emoji: object[0].emoji,
                                                    status: object[0].status,
                                                    type: object[0].type,
                                                    defense: object[0].defense,
                                                },
                                            };

                                            await pet.save();
                        
                    
                                            await menu.editReply({ content: " ", embeds: [embed], components: [select_armor_foot, goarmor_foot] });
                                        }
                                    }  
                                });
                    
                           } else if (menu.customId == "remove_item_armor_foot_id") {
                            await menu.deferUpdate();
                    
                            if(pet.type[0].armor_foot.status == "default") return menu.followUp({ content: "คุณไม่สามารถลบไอเทมนี้ได้", ephemeral: true});
                    
                                         
                            const button_confirm_cancel = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("confirm_remove_item_armor_foot_id")
                                .setLabel("Confirm")
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId("cancel_remove_item_armor_foot_id")
                                .setLabel("Cancel")
                                .setStyle(ButtonStyle.Secondary),
                            );
                    
                            const embed = new EmbedBuilder()
                            .setDescription("Are you sure you want to remove this item?")
                    
                            await menu.editReply({ embeds: [embed], components: [button_confirm_cancel], files: [] });
                           } else if (menu.customId == "confirm_remove_item_armor_foot_id") {
                            await menu.deferUpdate();
                    
                            const embed = new EmbedBuilder()
                            .setDescription("You have removed this item.")
                    
                            await menu.editReply({ embeds: [embed], components: [goarmor_foot], files: [] });
                           } else if (menu.customId == "cancel_remove_item_armor_foot_id") {
                            await  menu.deferUpdate();
                                    const embed = new EmbedBuilder()
                                    .setTitle('Armor Foot')
                                    .setFields(
                                        {
                                            name: "Defense", value: `${pet.type[0].armor_foot.defense}`, inline: false
                                        },
                                        {
                                            name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                        },
                                        {
                                            name: "Level", value: `${pet.type[0].armor_foot.level_upgade}`, inline: false
                                        }
                                    )
                                    .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                    .setColor(client.color)
    
                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_foot, button_back] });
                           } else if (menu.customId == "go_sword_id") {
                            await  menu.deferUpdate();

                            const pet = await GPet.findOne({ user: interaction.user.id });

                            const embed = new EmbedBuilder()
                            .setTitle('Sword')
                            .setFields(
                                {
                                    name: "Damage", value: `${pet.type[0].sword.damage_attack}`, inline: false
                                },
                                {
                                    name: "Critical", value: `${pet.type[0].sword.critical}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].sword.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].sword.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)
                
                            await menu.editReply({ embeds: [embed], components: [select, button_change_remove_sword, button_back] });
                           } else if (menu.customId == "go_armor_head_id") {
                            await  menu.deferUpdate();

                            const pet = await GPet.findOne({ user: interaction.user.id });

                            const embed = new EmbedBuilder()
                            .setTitle('Armor Head')
                            .setFields(
                                {
                                    name: "Defense", value: `${pet.type[0].armor_head.defense}`, inline: false
                                },
                                {
                                        name: "Durability", value: `${pet.type[0].armor_head.durability}`, inline: false
                                    },
                                {
                                    name: "Level", value: `${pet.type[0].armor_head.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)

                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_head, button_back] });
                           } else if (menu.customId == "go_armor_body_id") {
                            await  menu.deferUpdate();

                            const pet = await GPet.findOne({ user: interaction.user.id });
                            
                            const embed = new EmbedBuilder()
                            .setTitle('Armor Body')
                            .setFields(
                                {
                                    name: "Defense", value: `${pet.type[0].armor_body.defense}`, inline: false
                                },
                                {
                                    name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                },
                                {
                                    name: "Level", value: `${pet.type[0].armor_body.level_upgade}`, inline: false
                                }
                            )
                            .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                            .setColor(client.color)

                   
                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_body, button_back] });
                            } else if (menu.customId == "go_armor_leg_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });
                                
                                const embed = new EmbedBuilder()
                                .setTitle('Armor Leg')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_leg.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_leg.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_leg, button_back] });
                            } else if (menu.customId == "go_armor_foot_id") {
                                await  menu.deferUpdate();
                                const embed = new EmbedBuilder()
                                .setTitle('Armor Foot')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_foot.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_foot.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                   
                               await menu.editReply({ embeds: [embed], components: [select, button_change_remove_foot, button_back] });
                            } else if (menu.customId == "update_item_sword_id") {
                                await menu.deferUpdate();
                                const button_sword_ug = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("confirm_sword_id")
                                    .setLabel("Confirm")
                                    .setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder()
                                    .setCustomId("cancel_sword_id")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Secondary),
                                );

                                const embed = new EmbedBuilder()
                                .setDescription("Are you sure you want to upgrade your sword?")

                                await menu.editReply({ embeds: [embed], components: [button_sword_ug], files: [] });
                                    

                            } else if (menu.customId == "confirm_sword_id") {
                                await menu.deferUpdate();

                                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const item = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`);
                                const item_length = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`).length;

                                if(item) {
                                    if(item_length >= 1) {
                                        for (let i = 0; i < 1; i++) {
                                            const index = inv.item.indexOf(item[i]);
                                            if (index > -1) {
                                                inv.item.splice(index, 1);
                                            }
                                        }

                                        // random string 
                                        const true_false = ["+", "-"]
                                        const random_true_false = true_false[Math.floor(Math.random() * true_false.length)];
                                        console.log(random_true_false)

                                        if(random_true_false == "+"){
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack += 15, 
                                                    critical: pet.type[0].sword.critical += 5,
                                                    durability: pet.type[0].sword.durability += 5,
                                                    level_upgade: pet.type[0].sword.level_upgade +=1,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense,
                                                },
                                            };
                                        } else if(random_true_false == "-"){
                                            if (pet.type[0].sword.level_upgade <= 0 || pet.type[0].sword.damage_attack <= 0 || pet.type[0].sword.critical <= 0 || pet.type[0].sword.durability <= 0) {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: 0,
                                                        critical: 0,
                                                        durability: 0,
                                                        level_upgade: 1,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense,
                                                    },
                                                };
                                            } else {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack -= 15, 
                                                        critical: pet.type[0].sword.critical -= 5,
                                                        durability: pet.type[0].sword.durability -= 5,
                                                        level_upgade: pet.type[0].sword.level_upgade -=1,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense,
                                                    },
                                                }
                                            }
                                        }
                                        await inv.save();
                                        await pet.save();
                                        const loading = new EmbedBuilder()
                                        .setDescription("Loading...")
                                        .setColor(client.color)
        
                                        await menu.editReply({ embeds: [loading], components: [], files: [] });
                                        await new Promise(r => setTimeout(r, 5000));
                                        const embed = new EmbedBuilder()
                                        .setDescription("You have successfully upgraded your sword!")
                                        await menu.editReply({ embeds: [embed], components: [gosword], files: [] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [gosword], files: [] });
                                    }
                                }  else {
                                    const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [gosword], files: [] });
                                }

                            } else if (menu.customId == "cancel_sword_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const embed = new EmbedBuilder()
                                .setTitle('Sword')
                                .setFields(
                                    {
                                        name: "Damage", value: `${pet.type[0].sword.damage_attack}`, inline: false
                                    },
                                    {
                                        name: "Critical", value: `${pet.type[0].sword.critical}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].sword.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].sword.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)
                    
                                await menu.editReply({ embeds: [embed], components: [select, button_change_remove_sword, button_back] });
                            } else if (menu.customId == "update_item_armor_head_id") {
                                await menu.deferUpdate();
                                const button_sword_ug = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("confirm_armor_head_id")
                                    .setLabel("Confirm")
                                    .setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder()
                                    .setCustomId("cancel_armor_head_id")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Secondary),
                                );

                                const embed = new EmbedBuilder()
                                .setDescription("Are you sure you want to upgrade your armor_head?")

                                await menu.editReply({ embeds: [embed], components: [button_sword_ug], files: [] });
                                    

                            } else if (menu.customId == "confirm_armor_head_id") {
                                await menu.deferUpdate();

                                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const item = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`);
                                const item_length = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`).length;

                                if(item) {
                                    if(item_length >= 1) {
                                        for (let i = 0; i < 1; i++) {
                                            const index = inv.item.indexOf(item[i]);
                                            if (index > -1) {
                                                inv.item.splice(index, 1);
                                            }
                                        }

                                        // random string 
                                        const true_false = ["+", "-"]
                                        const random_true_false = true_false[Math.floor(Math.random() * true_false.length)];
                                        console.log(random_true_false)

                                        if(random_true_false == "+"){
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack , 
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability ,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense += 15,
                                                    durability: pet.type[0].armor_head.durability += 5,
                                                    level_upgade: pet.type[0].armor_head.level_upgade +=1,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense ,
                                                    durability: pet.type[0].armor_body.durability ,
                                                    level_upgade: pet.type[0].armor_body.level_upgade ,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense ,
                                                    durability: pet.type[0].armor_leg.durability ,
                                                    level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense ,
                                                    durability: pet.type[0].armor_foot.durability ,
                                                    level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                },
                                            };
                                        } else if(random_true_false == "-"){
                                            if (pet.type[0].armor_head.level_upgade <= 0 || pet.type[0].armor_head.defense <= 0 || pet.type[0].armor_head.durability <= 0 ) {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: 0,
                                                        durability: 0,
                                                        level_upgade: 1,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            } else {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense -= 15,
                                                        durability: pet.type[0].armor_head.durability -= 5,
                                                        level_upgade: pet.type[0].armor_head.level_upgade -=1,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            }
                                        }
                                        await inv.save();
                                        await pet.save();
                                        const loading = new EmbedBuilder()
                                        .setDescription("Loading...")
                                        .setColor(client.color)
        
                                        await menu.editReply({ embeds: [loading], components: [], files: [] });
                                        await new Promise(r => setTimeout(r, 5000));
                                        const embed = new EmbedBuilder()
                                        .setDescription("You have successfully upgraded your sword!")
                                        await menu.editReply({ embeds: [embed], components: [goarmor_head], files: [] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_head], files: [] });
                                    }
                                }  else {
                                    const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_head], files: [] });
                                }

                            } else if (menu.customId == "cancel_armor_head_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const embed = new EmbedBuilder()
                                .setTitle('Armor Head')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_head.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_head.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_head.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_head, button_back] });
                            } else if (menu.customId == "update_item_armor_body_id") {
                                await menu.deferUpdate();
                                const button_sword_ug = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("confirm_armor_body_id")
                                    .setLabel("Confirm")
                                    .setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder()
                                    .setCustomId("cancel_armor_body_id")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Secondary),
                                );

                                const embed = new EmbedBuilder()
                                .setDescription("Are you sure you want to upgrade your armor_body?")

                                await menu.editReply({ embeds: [embed], components: [button_sword_ug], files: [] });
                                    

                            } else if (menu.customId == "confirm_armor_body_id") {
                                await menu.deferUpdate();

                                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const item = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`);
                                const item_length = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`).length;

                                if(item) {
                                    if(item_length >= 1) {
                                        for (let i = 0; i < 1; i++) {
                                            const index = inv.item.indexOf(item[i]);
                                            if (index > -1) {
                                                inv.item.splice(index, 1);
                                            }
                                        }

                                        // random string 
                                        const true_false = ["+", "-"]
                                        const random_true_false = true_false[Math.floor(Math.random() * true_false.length)];
                                        console.log(random_true_false)

                                        if(random_true_false == "+"){
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack , 
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability ,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                    durability: pet.type[0].armor_head.durability ,
                                                    level_upgade: pet.type[0].armor_head.level_upgade,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense += 15,
                                                    durability: pet.type[0].armor_body.durability += 5,
                                                    level_upgade: pet.type[0].armor_body.level_upgade +=1,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense ,
                                                    durability: pet.type[0].armor_leg.durability ,
                                                    level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense ,
                                                    durability: pet.type[0].armor_foot.durability ,
                                                    level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                },
                                            };
                                        } else if(random_true_false == "-"){
                                            if (pet.type[0].armor_body.level_upgade <= 0 || pet.type[0].armor_body.defense <= 0 || pet.type[0].armor_body.durability <= 0 ) {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: 0,
                                                        durability: 0,
                                                        level_upgade: 1,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            } else {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense ,
                                                        durability: pet.type[0].armor_head.durability ,
                                                        level_upgade: pet.type[0].armor_head.level_upgade,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense -= 15,
                                                        durability: pet.type[0].armor_body.durability -= 5,
                                                        level_upgade: pet.type[0].armor_body.level_upgade -=1,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            }
                                        }
                                        await inv.save();
                                        await pet.save();
                                        const loading = new EmbedBuilder()
                                        .setDescription("Loading...")
                                        .setColor(client.color)
        
                                        await menu.editReply({ embeds: [loading], components: [], files: [] });
                                        await new Promise(r => setTimeout(r, 5000));
                                        const embed = new EmbedBuilder()
                                        .setDescription("You have successfully upgraded your sword!")
                                        await menu.editReply({ embeds: [embed], components: [goarmor_body], files: [] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_body], files: [] });
                                    }
                                }  else {
                                    const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_body], files: [] });
                                }

                            } else if (menu.customId == "cancel_armor_body_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const embed = new EmbedBuilder()
                                .setTitle('Armor Body')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_body.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_body.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_body.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_body, button_back] });
                            } else if (menu.customId == "update_item_armor_leg_id") {
                                await menu.deferUpdate();
                                const button_sword_ug = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("confirm_armor_leg_id")
                                    .setLabel("Confirm")
                                    .setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder()
                                    .setCustomId("cancel_armor_leg_id")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Secondary),
                                );

                                const embed = new EmbedBuilder()
                                .setDescription("Are you sure you want to upgrade your armor_leg?")

                                await menu.editReply({ embeds: [embed], components: [button_sword_ug], files: [] });
                                    

                            } else if (menu.customId == "confirm_armor_leg_id") {
                                await menu.deferUpdate();

                                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const item = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`);
                                const item_length = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`).length;

                                if(item) {
                                    if(item_length >= 1) {
                                        for (let i = 0; i < 1; i++) {
                                            const index = inv.item.indexOf(item[i]);
                                            if (index > -1) {
                                                inv.item.splice(index, 1);
                                            }
                                        }

                                        // random string 
                                        const true_false = ["+", "-"]
                                        const random_true_false = true_false[Math.floor(Math.random() * true_false.length)];
                                        console.log(random_true_false)

                                        if(random_true_false == "+"){
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack , 
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability ,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                    durability: pet.type[0].armor_head.durability ,
                                                    level_upgade: pet.type[0].armor_head.level_upgade,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense ,
                                                    durability: pet.type[0].armor_body.durability ,
                                                    level_upgade: pet.type[0].armor_body.level_upgade ,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense += 15,
                                                    durability: pet.type[0].armor_leg.durability += 5,
                                                    level_upgade: pet.type[0].armor_leg.level_upgade +=1,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense ,
                                                    durability: pet.type[0].armor_foot.durability ,
                                                    level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                },
                                            };
                                        } else if(random_true_false == "-"){
                                            if (pet.type[0].armor_leg.level_upgade <= 0 || pet.type[0].armor_leg.defense <= 0 || pet.type[0].armor_leg.durability <= 0 ) {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: 0,
                                                        durability: 0,
                                                        level_upgade: 1,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            } else {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense ,
                                                        durability: pet.type[0].armor_head.durability ,
                                                        level_upgade: pet.type[0].armor_head.level_upgade,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense -= 15,
                                                        durability: pet.type[0].armor_leg.durability -= 5,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade -=1,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            }
                                        }
                                        await inv.save();
                                        await pet.save();
                                        const loading = new EmbedBuilder()
                                        .setDescription("Loading...")
                                        .setColor(client.color)
        
                                        await menu.editReply({ embeds: [loading], components: [], files: [] });
                                        await new Promise(r => setTimeout(r, 5000));
                                        const embed = new EmbedBuilder()
                                        .setDescription("You have successfully upgraded your sword!")
                                        await menu.editReply({ embeds: [embed], components: [goarmor_leg], files: [] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_leg], files: [] });
                                    }
                                }  else {
                                    const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_leg], files: [] });
                                }

                            } else if (menu.customId == "cancel_armor_leg_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const embed = new EmbedBuilder()
                                .setTitle('Armor Leg')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_leg.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_leg.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_leg, button_back] });
                            } else if (menu.customId == "update_item_armor_foot_id") {
                                await menu.deferUpdate();
                                const button_sword_ug = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("confirm_armor_foot_id")
                                    .setLabel("Confirm")
                                    .setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder()
                                    .setCustomId("cancel_armor_foot_id")
                                    .setLabel("Cancel")
                                    .setStyle(ButtonStyle.Secondary),
                                );

                                const embed = new EmbedBuilder()
                                .setDescription("Are you sure you want to upgrade your armor_foot?")

                                await menu.editReply({ embeds: [embed], components: [button_sword_ug], files: [] });
                                    

                            } else if (menu.customId == "confirm_armor_foot_id") {
                                await menu.deferUpdate();

                                const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const item = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`);
                                const item_length = inv.item.filter(x => x.status === `anyomni_upgrade_${pet.type[0].type_system}`).length;

                                if(item) {
                                    if(item_length >= 1) {
                                        for (let i = 0; i < 1; i++) {
                                            const index = inv.item.indexOf(item[i]);
                                            if (index > -1) {
                                                inv.item.splice(index, 1);
                                            }
                                        }

                                        // random string 
                                        const true_false = ["+", "-"]
                                        const random_true_false = true_false[Math.floor(Math.random() * true_false.length)];
                                        console.log(random_true_false)

                                        if(random_true_false == "+"){
                                            pet.type[0] = {
                                                type: pet.type[0].type,
                                                type_system: pet.type[0].type_system,
                                                emoji: pet.type[0].emoji,
                                                sword: {
                                                    name: pet.type[0].sword.name,
                                                    emoji: pet.type[0].sword.emoji,
                                                    status: pet.type[0].sword.status,
                                                    type: pet.type[0].sword.type,
                                                    damage_attack: pet.type[0].sword.damage_attack , 
                                                    critical: pet.type[0].sword.critical,
                                                    durability: pet.type[0].sword.durability ,
                                                    level_upgade: pet.type[0].sword.level_upgade,
                                                },
                                                armor_head: {
                                                    name: pet.type[0].armor_head.name,
                                                    emoji: pet.type[0].armor_head.emoji,
                                                    status: pet.type[0].armor_head.status,
                                                    type: pet.type[0].armor_head.type,
                                                    defense: pet.type[0].armor_head.defense,
                                                    durability: pet.type[0].armor_head.durability ,
                                                    level_upgade: pet.type[0].armor_head.level_upgade,
                                                },
                                                armor_body: {
                                                    name: pet.type[0].armor_body.name,
                                                    emoji: pet.type[0].armor_body.emoji,
                                                    status: pet.type[0].armor_body.status,
                                                    type: pet.type[0].armor_body.type,
                                                    defense: pet.type[0].armor_body.defense ,
                                                    durability: pet.type[0].armor_body.durability ,
                                                    level_upgade: pet.type[0].armor_body.level_upgade ,
                                                },
                                                armor_leg: {
                                                    name: pet.type[0].armor_leg.name,
                                                    emoji: pet.type[0].armor_leg.emoji,
                                                    status: pet.type[0].armor_leg.status,
                                                    type: pet.type[0].armor_leg.type,
                                                    defense: pet.type[0].armor_leg.defense ,
                                                    durability: pet.type[0].armor_leg.durability ,
                                                    level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                },
                                                armor_foot: {
                                                    name: pet.type[0].armor_foot.name,
                                                    emoji: pet.type[0].armor_foot.emoji,
                                                    status: pet.type[0].armor_foot.status,
                                                    type: pet.type[0].armor_foot.type,
                                                    defense: pet.type[0].armor_foot.defense += 15,
                                                    durability: pet.type[0].armor_foot.durability += 5,
                                                    level_upgade: pet.type[0].armor_foot.level_upgade +=1,
                                                },
                                            };
                                        } else if(random_true_false == "-"){
                                            if (pet.type[0].armor_foot.level_upgade <= 0 || pet.type[0].armor_foot.defense <= 0 || pet.type[0].armor_foot.durability <= 0 ) {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: 0,
                                                        durability: 0,
                                                        level_upgade: 1,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense ,
                                                        durability: pet.type[0].armor_foot.durability ,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade ,
                                                    },
                                                };
                                            } else {
                                                pet.type[0] = {
                                                    type: pet.type[0].type,
                                                    type_system: pet.type[0].type_system,
                                                    emoji: pet.type[0].emoji,
                                                    sword: {
                                                        name: pet.type[0].sword.name,
                                                        emoji: pet.type[0].sword.emoji,
                                                        status: pet.type[0].sword.status,
                                                        type: pet.type[0].sword.type,
                                                        damage_attack: pet.type[0].sword.damage_attack , 
                                                        critical: pet.type[0].sword.critical,
                                                        durability: pet.type[0].sword.durability ,
                                                        level_upgade: pet.type[0].sword.level_upgade,
                                                    },
                                                    armor_head: {
                                                        name: pet.type[0].armor_head.name,
                                                        emoji: pet.type[0].armor_head.emoji,
                                                        status: pet.type[0].armor_head.status,
                                                        type: pet.type[0].armor_head.type,
                                                        defense: pet.type[0].armor_head.defense ,
                                                        durability: pet.type[0].armor_head.durability ,
                                                        level_upgade: pet.type[0].armor_head.level_upgade,
                                                    },
                                                    armor_body: {
                                                        name: pet.type[0].armor_body.name,
                                                        emoji: pet.type[0].armor_body.emoji,
                                                        status: pet.type[0].armor_body.status,
                                                        type: pet.type[0].armor_body.type,
                                                        defense: pet.type[0].armor_body.defense ,
                                                        durability: pet.type[0].armor_body.durability ,
                                                        level_upgade: pet.type[0].armor_body.level_upgade ,
                                                    },
                                                    armor_leg: {
                                                        name: pet.type[0].armor_leg.name,
                                                        emoji: pet.type[0].armor_leg.emoji,
                                                        status: pet.type[0].armor_leg.status,
                                                        type: pet.type[0].armor_leg.type,
                                                        defense: pet.type[0].armor_leg.defense ,
                                                        durability: pet.type[0].armor_leg.durability ,
                                                        level_upgade: pet.type[0].armor_leg.level_upgade ,
                                                    },
                                                    armor_foot: {
                                                        name: pet.type[0].armor_foot.name,
                                                        emoji: pet.type[0].armor_foot.emoji,
                                                        status: pet.type[0].armor_foot.status,
                                                        type: pet.type[0].armor_foot.type,
                                                        defense: pet.type[0].armor_foot.defense -= 15,
                                                        durability: pet.type[0].armor_foot.durability -= 5,
                                                        level_upgade: pet.type[0].armor_foot.level_upgade-=1 ,
                                                    },
                                                };
                                            }
                                        }
                                        await inv.save();
                                        await pet.save();
                                        const loading = new EmbedBuilder()
                                        .setDescription("Loading...")
                                        .setColor(client.color)
        
                                        await menu.editReply({ embeds: [loading], components: [], files: [] });
                                        await new Promise(r => setTimeout(r, 5000));
                                        const embed = new EmbedBuilder()
                                        .setDescription("You have successfully upgraded your sword!")
                                        await menu.editReply({ embeds: [embed], components: [goarmor_foot], files: [] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_foot], files: [] });
                                    }
                                }  else {
                                    const embed = new EmbedBuilder()
                                    .setDescription("You don't have enough items to upgrade your sword!")
        
                                    await menu.editReply({ embeds: [embed], components: [goarmor_foot], files: [] });
                                }

                            } else if (menu.customId == "cancel_armor_foot_id") {
                                await  menu.deferUpdate();

                                const pet = await GPet.findOne({ user: interaction.user.id });

                                const embed = new EmbedBuilder()
                                .setTitle('Armor Leg')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_foot.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_foot.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_foot.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_foot, button_back] });
                            } 





                       }  else if(menu.isStringSelectMenu()) {
                           if (menu.customId == "item_select_id") {
                               let [ directory ] = menu.values;
                                if (directory === "main_id") {
                                   await  menu.deferUpdate();
                                   const embed = new EmbedBuilder()
                                   .setDescription("All items are listed below.")
                           
                                   await menu.editReply({ embeds: [embed], components: [ select, button_back], files: [] });
                           
                               }else if (directory === "sword_id") {
                                   await  menu.deferUpdate();

                                   const pet = await GPet.findOne({ user: interaction.user.id });

                                   const embed = new EmbedBuilder()
                                   .setTitle('Sword')
                                   .setFields(
                                       {
                                           name: "Damage", value: `${pet.type[0].sword.damage_attack}`, inline: false
                                       },
                                       {
                                           name: "Critical", value: `${pet.type[0].sword.critical}`, inline: false
                                       },
                                       {
                                           name: "Durability", value: `${pet.type[0].sword.durability}`, inline: false
                                       },
                                       {
                                           name: "Level", value: `${pet.type[0].sword.level_upgade}`, inline: false
                                       }
                                   )
                                   .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                   .setColor(client.color)
                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_sword, button_back] });
                               } else if (directory === "armor_head_id") {
                                await  menu.deferUpdate();
                                const embed = new EmbedBuilder()
                                .setTitle('Armor Head')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_head.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_head.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_head.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_head, button_back] });
                           
                               } else if (directory === "armor_body_id") {
                                await  menu.deferUpdate();
                                const embed = new EmbedBuilder()
                                .setTitle('Armor Body')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_body.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_body.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_body, button_back] });
                               } else if (directory === "armor_leg_id") {
                                await  menu.deferUpdate();
                                const embed = new EmbedBuilder()
                                .setTitle('Armor Leg')
                                .setFields(
                                    {
                                        name: "Defense", value: `${pet.type[0].armor_leg.defense}`, inline: false
                                    },
                                    {
                                        name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                    },
                                    {
                                        name: "Level", value: `${pet.type[0].armor_leg.level_upgade}`, inline: false
                                    }
                                )
                                .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                .setColor(client.color)

                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_leg, button_back] });
                                } else if (directory === "armor_foot_id") {
                                    await  menu.deferUpdate();
                                    const embed = new EmbedBuilder()
                                    .setTitle('Armor Foot')
                                    .setFields(
                                        {
                                            name: "Defense", value: `${pet.type[0].armor_foot.defense}`, inline: false
                                        },
                                        {
                                            name: "Durability", value: `${pet.type[0].armor_leg.durability}`, inline: false
                                        },
                                        {
                                            name: "Level", value: `${pet.type[0].armor_foot.level_upgade}`, inline: false
                                        }
                                    )
                                    .setThumbnail("https://i.imgur.com/eTlIM85.jpg")
                                    .setColor(client.color)
    
                       
                                   await menu.editReply({ embeds: [embed], components: [select, button_change_remove_foot, button_back] });
                                } 
                               }
                           }
                   });

            }

            }
}


function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

