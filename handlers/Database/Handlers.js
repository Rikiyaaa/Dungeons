const GHome = require("../../settings/models/house.js");
const GPet = require("../../settings/models/pet.js");
const GInv = require("../../settings/models/inventory.js")
const Member = require("../../settings/models/profile.js");
const config = require("../../settings/defaults.js");
const Ticket = require("../../settings/models/ticket.js");
const Coinflip = require("../../settings/models/coinflip.js");
const Dragon_T = require("../../settings/models/Dragon_T.js");
const FishInv = require("../../settings/models/fishinventory.js");
const Market = require("../../settings/models/market.js");
const CradProfile = require("../../settings/models/cradprofile.js");
const GMonter = require("../../settings/models/monter.js");
const HInv = require("../../settings/models/houseinv.js");
const Topup = require("../../settings/models/topup_data.js");
const Bacarat = require("../../settings/models/bacarat.js");
const GachaInv = require("../../settings/models/gachainventory.js");
const ItemInv = require("../../settings/models/iteminventory.js");

module.exports = async (client) => {
    client.createHome = async function (guildId, userId, username, discriminator) {
        const database = await GHome.findOne({ guild: guildId, user: userId });
        if (!database) {
            const newHome = await GHome.create({
                guild: guildId,
                user: userId,
                house: "https://cdn.discordapp.com/attachments/1021744464550703195/1086654286823436469/qJCkFHv.png",
                six_clock: true,
                nineteen_clock: false,
                A_DATA: {
                    RA1: false,
                    RA1I: "",
                    RA1D: false,

                    RA2: false,
                    RA2I: "",
                    RA2D: false,

                    RA3: false,
                    RA3I: "",
                    RA3D: false,

                    RA4: false,
                    RA4I: "",
                    RA4D: true,

                    LA1: false,
                    LA1I: "",
                    LA1D: false,

                    LA2: false,
                    LA2I: "",
                    LA2D: false,

                    LA3: false,
                    LA3I: "",
                    LA3D: false,

                    LA4: false,
                    LA4I: "",
                    LA4D: true
                },
                B_DATA: {
                    RB1: false,
                    RB1I: "",
                    RB1D: false,

                    RB2: false,
                    RB2I: "",
                    RB2D: false,

                    RB3: false,
                    RB3I: "",
                    RB3D: false,

                    RB4: false,
                    RB4I: "",
                    RB4D: true,

                    LB1: false,
                    LB1I: "",
                    LB1D: false,

                    LB2: false,
                    LB2I: "",
                    LB2D: false,

                    LB3: false,
                    LB3I: "",
                    LB3D: false,

                    LB4: false,
                    LB4I: "",
                    LB4D: true

                },
                C_DATA: {
                    RC1: false,
                    RC1I: "",
                    RC1D: false,

                    RC2: false,
                    RC2I: "",
                    RC2D: false,

                    RC3: false,
                    RC3I: "",
                    RC3D: false,

                    RC4: false,
                    RC4I: "",
                    RC4D: true,

                    LC1: false,
                    LC1I: "",
                    LC1D: false,

                    LC2: false,
                    LC2I: "",
                    LC2D: false,

                    LC3: false,
                    LC3I: "",
                    LC3D: false,

                    LC4: false,
                    LC4I: "",
                    LC4D: true

                },
                D_DATA: {
                    RD1: false,
                    RD1I: "",
                    RD1D: false,

                    RD2: false,
                    RD2I: "",
                    RD2D: false,

                    RD3: false,
                    RD3I: "",
                    RD3D: false,

                    RD4: false,
                    RD4I: "",
                    RD4D: true,

                    LD1: false,
                    LD1I: "",
                    LD1D: false,

                    LD2: false,
                    LD2I: "",
                    LD2D: false,

                    LD3: false,
                    LD3I: "",
                    LD3D: false,

                    LD4: false,
                    LD4I: "",
                    LD4D: true
                    
                },
                FLOOR_DATA: {
                    FLOOR: false,
                    FLOORI: "",
                    FLOORD: false
                },
                TILE_DATA: {
                    TILE: false,
                    TILEI: "",
                    TILED: false
                },
                WALL_DATA: {
                    L1: false,
                    L1I: "",
                    L1D: false,
                    ///
                    L2: false,
                    L2I: "",
                    L2D: false,
                    ///
                    L3: false,
                    L3I: "",
                    L3D: false,
                    ///
                    L4: false,
                    L4I: "",
                    L4D: true,
                    ///
                    R1: false,
                    R1I: "",
                    R1D: false,
                    ///
                    R2: false,
                    R2I: "",
                    R2D: false,
                    ///
                    R3: false,
                    R3I: "",
                    R3D: false,
                    ///
                    R4: false,
                    R4I: "",
                    R4D: true,
                }
            });
            await newHome.save();
        }

        const market = await Market.findOne({ guild: guildId });
        if (!market) {
            const newmarket = await Market.create({
                guild: guildId,
                market: [
                    {
                        name: "Catfish",
                        price: 123,
                      },
                      {
                        name: "Salmon",
                        price: 141,
                      },
                      {
                        name: "Cod",
                        price: 12,
                      },
                      {
                        name: "Pufferfish",
                        price: 35,
                      },
                      {
                        name: "Squid",
                        price: 153,
                      },
                      {
                        name: "Dolphin",
                        price: 146,
                      },
                      {
                        name: "Cherry",
                        price: 34,
                      },
                      {
                        name: "Watermelon",
                        price: 67,
                      },
                      {
                        name: "Lemon",
                        price: 23,
                      },
                      {
                        name: "Grape",
                        price: 42,
                      },
                ],
            });
            await newmarket.save();
        }

        const coinflip = await Coinflip.findOne({ guild: guildId });
        if (!coinflip) {
            const newCoinflip = await Coinflip.create({
                guild: guildId,
                coinflip: false,
                history: [],
                space: "",
                data: [],
                player: "",
                banker: "",
                time_remaining: 30,
                time: 0,
                time_limit: 0,
            });
            await newCoinflip.save();
        }

        const dragon_tiger = await Dragon_T.findOne({ guild: guildId });
        if (!dragon_tiger) {
            const newdragon_tiger = await Dragon_T.create({
                guild: guildId,
                dragon_tiger: false,
                history: [],
                space: "",
                data: [],
                tiger_s1: "",
                tiger_c1: "",
                dargon_s1: "",
                dargon_c1: "",
                time_remaining: 30,
                time: 0,
                time_limit: 0,
            });
            await newdragon_tiger.save();
        }

        const bacarat = await Bacarat.findOne({ guild: guildId });
        if (!bacarat) {
            const newBacarat = await Bacarat.create({
                guild: guildId,
                bacarat: false,
                history: [],
                space: "",
                ไพ่ป๊อก: "",
                ไพ่คู่: "",
                data: [],
                data_pair: [],
                player_s1: "",
                player_s2: "",
                player_s3: "",
                player_c1: "",
                player_c2: "",
                player_c3: "",
                banker_s1: "",
                banker_s2: "",
                banker_s3: "",
                banker_c1: "",
                banker_c2: "",
                banker_c3: "",
                time_remaining: 30,
                time: 0,
                time_limit: 0,
            });
            await newBacarat.save();
        }

        const ticket = await Ticket.findOne({ guild: guildId, user: userId });
            if (!ticket) {
            const newTicket = await Ticket.create({
                guild: guildId,
                user: userId,
                gacha_cooldown: 0,
                gacha_cooldown_time: 2,
                three_star_ticket: 0,
                four_star_ticket: 0,
                five_star_ticket: 0,
                six_star_ticket: 0,
                guarantee_five_star: 0,
                guarantee_six_star: 0,
            });
            await newTicket.save();
        }

        const cradprofile = await CradProfile.findOne({ user: userId });
            if (!cradprofile) {
            const newCradProfile = await CradProfile.create({
                user: userId,
                username: `Avatar's Avatar` ,
                type: [
                    {
                        type: "Human",
                        type_system: "human",
                        emoji: "👤",
                        sword: {
                            name: "หมัด",
                            emoji: "✊",
                            status: "default",
                            type: "human_sword",
                            damage_attack: 1,
                            critical: 1,
                            durability: 100,
                            use_stamina: 1,
                            level_upgade: 1,
                        },
                        
                        armor_head: {
                            name: "ไม่มี",
                            emoji: "🚫",
                            status: "default",
                            type: "human_armor_head",
                            defense: 0,
                            defense_max: 100,
                            durability: 100,
                            durability_max: 100,
                            level_upgade: 1,
                        },
                        armor_body: {
                            name: "ไม่มี",
                            emoji: "🚫",
                            status: "default",
                            type: "human_armor_body",
                            defense: 0,
                            defense_max: 100,
                            durability: 100,
                            durability_max: 100,
                            level_upgade: 1,
                        },
                        armor_leg: {
                            name: "ไม่มี",
                            emoji: "🚫",
                            status: "default",
                            type: "human_armor_leg",
                            defense: 0,
                            defense_max: 100,
                            durability: 100,
                            durability_max: 100,
                            level_upgade: 1,
                        },
                        armor_foot: {
                            name: "ไม่มี",
                            emoji: "🚫",
                            status: "default",
                            type: "human_armor_foot",
                            defense: 0,
                            defense_max: 100,
                            durability: 100,
                            durability_max: 100,
                            level_upgade: 1,
                        },
                    },
                ],
                exp: 0,
                level: 1,
                nextexp: 100,
                health: 100,
                health_max: 100,
                stamina: 100,
                stamina_max: 100,
                energy: 100,
                hungry: 100,
                point: 0,
                point_max: 25,
                attack: 0,
                defense: 0,
                stamina_s: 0,
                speed: 0,
                luck: 0,
                attack_max: 10,
                defense_max: 10,
                stamina_s_max: 10,
                speed_max: 10,
                luck_max: 10,
                stamina_emoji: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                health_emoji: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                emoji_attack: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                emoji_defense: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                emoji_speed: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                emoji_luck: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
            });
            await newCradProfile.save();
        }

        const monter = await GMonter.findOne({ guild: guildId, user: userId });
            if (!monter) {
            const newGMonter = await GMonter.create({
                guild: guildId,
                user: userId,
                name: "",
                type: "", 
                level: 0,
                image: "",
                location: "",
                location_image: "",
                damage_attack: 0,
                health: 0,
                health_max: 0,
                health_emoji: "<:main1:1082296663604994068><:main2:1082296667639910432><:main2:1082296667639910432><:main2:1082296667639910432><:main3:1082296671297355847>",
                exp: 0,
                drop: [
                    {
                        name: "",
                        type: "",
                        image: "",
                    }
                ]
        });
            await newGMonter.save();
    }

    const house_inv = await HInv.findOne({ guild: guildId, user: userId });
            if (!house_inv) {
            const newhouse_inv = await HInv.create({
                guild: guildId,
                user: userId,
                floor_left: [],
                floor_right: [],
                furniture_left: [],
                furniture_right: [],
                wall_left: [],
                wall_right: [],
                wallpaper_left: [],
                wallpaper_right: [],
        });
            await newhouse_inv.save();
    }

    const topup_data = await Topup.findOne({ guild: guildId, user: userId,});
            if (!topup_data) {
            const newtopup_data = await Topup.create({
                User_id: userId,
                Username: username + "#" + discriminator,
                เติมเงินไปทั้งหมด: 0,
                รายการเติมเงิน: [],
        });
            await newtopup_data.save();
    }


};

            

    
    

    client.createInv = async function (guildId, userId) {
        const database = await GInv.findOne({ guild: guildId, user: userId });
        if (!database) {
            const newInv = await GInv.create({
                guild: guildId,
                user: userId,
                item: [],
              
            });
            await newInv.save();
        }

        const fish = await FishInv.findOne({ guild: guildId, user: userId });
        if (!fish) {
            const newInvfish = await FishInv.create({
                guild: guildId,
                user: userId,
                item: [],
              
            });
            await newInvfish.save();
        }

        const gacha = await GachaInv.findOne({ guild: guildId, user: userId });
        if (!gacha) {
            const newInvgacha = await GachaInv.create({
                guild: guildId,
                user: userId,
                item: [],
              
            });
            await newInvgacha.save();
        }

        const item = await ItemInv.findOne({ guild: guildId, user: userId });
        if (!item) {
            const newInvitem = await ItemInv.create({
                guild: guildId,
                user: userId,
                item: [],
              
            });
            await newInvitem.save();
        }
    };

    client.createProfile = async function (guildId, userId) {
        const database = await Member.findOne({ guild: guildId, user: userId });
        if (!database) {
            const newHome = await Member.create({
                guild: guildId,
                user: userId,
                status: "ปกติ",
                location: "ที่ราบป่าสีเขียว",
                nickname_request1: false,
                bad_message: 0,
                happy_message: 0,
                level: 1,
                inventory: 100,
                fishinventory: 2,
                fishinventory: 10,
                wallet_bg: "https://cdn.discordapp.com/attachments/1071294052630270023/1078994624334532718/04c8e35419c5303be69fe4f576cde09e1dc3a1b3.png",
                quest_main1: false,
                quest_main2: false,
                quest_main3: false,
                quest: [
                     {
                        type: "message",
                        name: "Talk with friends.",
                        current: 0,
                        goal: 5,
                        reward: 15000
                    },
                    {
                        type: "feed",
                        name: "Feed your pet.",
                        current: 0,
                        goal: 2,
                        reward: 25000
                    },
                    {
                        type: "edit",
                        name: "Edit you house.",
                        current: 0,
                        goal: 1,
                        reward: 25000
                    },
                ],
                lucky_get: false,
                work_cooldown: 0,
                work_cooldown_time: config.general.work_cooldown_time,
                work_multiple: config.general.work_multiple,
                money: config.general.start_money,
                bank: 0,
                rob: false,
                rob_cooldown: 0,
                rob_cooldown_time: config.general.rob_cooldown_time,
                fishs: false,
                fishs_cooldown: 0,
                fishs_cooldown_time: config.general.fishs_cooldown_time,
                fishs_multiple: config.general.fishs_multiple,
                fruit: true,
                fruit_cooldown: 0,
                fruit_cooldown_time: config.general.fishs_cooldown_time,
                fruit_multiple: config.general.fishs_multiple,
                crime_cooldown: 0,
                crime_cooldown_time: config.general.crime_cooldown_time,
                crime_multiple: config.general.crime_multiple,
                sell_cooldown: 0,
                sell_cooldown_time: config.general.crime_cooldown_time,
                sell_multiple: config.general.crime_multiple,
                vote_cooldown: 0,
                vote_cooldown_time: config.general.vote_cooldown_time,
                married_to: "",
                married: false,
                rank: "คนเเปลกหน้า",
                select_class_success: false,
                reputation: 0,
                facebook: "",
                instagram: "",
                twitter: "",
                battled_win: 0,
                battled_lose: 0,
            });
            await newHome.save();
        }
    };

    

    client.questMsg = async function (message) {

        const profile = await Member.findOneAndUpdate(
            { 
                guild: message.guild.id, 
                user: message.author.id, 
                "quest.type": "message" 
            },
            { $inc: { "quest.$.current": 1 } }, 
            { new: true }
        );
    
        if (profile.quest[0].current === profile.quest[0].goal) {
            profile.money += profile.quest[0].reward;
            profile.save();
            message.reply("Your are finish Quest. " + profile.quest[0].name)
        };
    }

    client.typeMsg = async function (message) {
        const cprofile = await CradProfile.findOneAndUpdate(
          {
            guild: message.guild.id,
            user: message.author.id,

          },
          // add 1 to the exp
            { $inc: { exp: 1 } },
            // return the new profile
            { new: true }
            
        );
      
        if (cprofile.exp === cprofile.nextexp) {
        let diff = cprofile.exp - cprofile.nextexp;
          cprofile.level += 1;
          cprofile.nextexp = Math.floor(cprofile.level * cprofile.level * 1.5);
          cprofile.exp = diff;
      
          cprofile.save();
          message.reply("Your are level up to " + cprofile.level);
        }
      };
    client.questFeed = async function (interaction) {

        const profile = await Member.findOneAndUpdate(
            { 
                guild: interaction.guild.id, 
                user: interaction.user.id, 
                "quest.type": "feed" 
            },
            { $inc: { "quest.$.current": 1 } }, 
            { new: true }
        );
    
        if (profile.quest[1].current === profile.quest[1].goal) {
            profile.money += profile.quest[1].reward;
            profile.save();
           interaction.channel.send(`${interaction.user} Your are finish Quest. ` + profile.quest[1].name)
        }
    }

    client.questEdit = async function (interaction) {

        const profile = await Member.findOneAndUpdate(
            { 
                guild: interaction.guild.id, 
                user: interaction.user.id, 
                "quest.type": "edit" 
            },
            { $inc: { "quest.$.current": 1 } }, 
            { new: true }
        );
    
        if (profile.quest[2].current === profile.quest[2].goal) {
            profile.money += profile.quest[2].reward;
            profile.save();
            interaction.channel.send(`${interaction.user} Your are finish Quest. ` + profile.quest[2].name)
        }
    }


}