const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder} = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const Member = require("../../settings/models/profile.js");
const Cradprofile = require("../../settings/models/cradprofile.js");

module.exports = {
    name: ["profile", "class"],
    description: "select your class.",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Loading please wait...");

        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const cprofile = await Cradprofile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if(profile.select_class_success === true) {
            return interaction.editReply({ content: "You have already selected your class." });
        } else if(profile.select_class_success === false) {

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("select_class")
                .setPlaceholder(`Please selection pet to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "นักดาบ",
                        description: "select your sword",
                        value: "sword"
                    },
                    {
                        label: "นักเวทย์",
                        description: "select your magic",
                        value: "magic"
                    },
                    {
                        label: "นักดาบใหญ่",
                        description: "select your warrior",
                        value: "warrior"
                    },
                ])
            ])

        const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user.username}**'s Profile/Class`)
            .setColor(client.color)

        await msg.edit({ content: " ", embeds: [embed], components: [row]});

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 300000 }); // 5 minute

        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "select_class") {
                    await menu.deferUpdate();
                    /// value id
                    let [ directory ] = menu.values;

                    if (directory === "sword") {
                        profile.select_class_success = true
                        profile.money -= 500;

                        // change the type of the class to sword and save it to the database 
                        cprofile.type[0] = {
                            type: "Swordman",
                            type_system: "swordman",
                            emoji: "⚔️",
                            sword: {
                                name: "Wooden Sword",
                                emoji: "🪓",
                                status: "default",
                                type: "swordman_sword",
                                damage_attack: 10,
                                critical: 1,
                                durability: 100,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: "Wooden Helmet",
                                emoji: "🪖",
                                status: "default",
                                type: "swordman_armor_head",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: "Wooden Armor",
                                emoji: "🪖",
                                status: "default",
                                type: "swordman_armor_body",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: "Wooden Leggings",
                                emoji: "🪖",
                                status: "default",
                                type: "swordman_armor_leg",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: "Wooden Boots",
                                emoji: "🪖",
                                status: "default",
                                type: "swordman_armor_foot",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };

                        
    
                        const embed = new EmbedBuilder()
                            .setDescription("You have successfully bought a pet.")
                            .setColor(client.color)
    
                        await profile.save();
                        await inv.save();
                        await cprofile.save();
    
                        msg.edit({ embeds: [embed], components: [], files: [] });

                        collector.stop();
                    } else if (directory === "magic") {
                        profile.select_class_success = true
                        profile.money -= 500;

                        cprofile.type[0] = {
                            type: "Magic",
                            type_system: "magic",
                            emoji: "🧙‍♂️",
                            sword: {
                                name: "Wooden Sword",
                                emoji: "🪓",
                                status: "default",
                                type: "magic_sword",
                                damage_attack: 10,
                                critical: 1,
                                durability: 100,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: "Wooden Helmet",
                                emoji: "🪖",
                                status: "default",
                                type: "magic_armor_head",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: "Wooden Armor",
                                emoji: "🪖",
                                status: "default",
                                type: "magic_armor_body",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: "Wooden Leggings",
                                emoji: "🪖",
                                status: "default",
                                type: "magic_armor_leg",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: "Wooden Boots",
                                emoji: "🪖",
                                status: "default",
                                type: "magic_armor_foot",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
                    
    
                        const embed = new EmbedBuilder()
                            .setDescription("You have successfully bought a pet.")
                            .setColor(client.color)
    
                        await profile.save();
                        await inv.save();
                        await cprofile.save();
    
                        msg.edit({ embeds: [embed], components: [], files: [] });


                        collector.stop();
                    
                    } else if (directory === "warrior") {
                        profile.select_class_success = true
                        profile.money -= 500;

                        cprofile.type[0] = {
                            type: "Warrior",
                            type_system: "warrior",
                            emoji: "🏹",
                            sword: {
                                name: "Wooden Sword",
                                emoji: "🪓",
                                status: "default",
                                type: "warrior_sword",
                                damage_attack: 10,
                                critical: 1,
                                durability: 100,
                                level_upgade: 1,
                            },
                            armor_head: {
                                name: "Wooden Helmet",
                                emoji: "🪖",
                                status: "default",
                                type: "warrior_armor_head",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_body: {
                                name: "Wooden Armor",
                                emoji: "🪖",
                                status: "default",
                                type: "warrior_armor_body",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_leg: {
                                name: "Wooden Leggings",
                                emoji: "🪖",
                                status: "default",
                                type: "warrior_armor_leg",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                            armor_foot: {
                                name: "Wooden Boots",
                                emoji: "🪖",
                                status: "default",
                                type: "warrior_armor_foot",
                                defense: 5,
                                defense_max: 100,
                                durability: 100,
                                durability_max: 100,
                                level_upgade: 1,
                            },
                        };
    
                        const embed = new EmbedBuilder()
                            .setDescription("You have successfully bought a pet.")
                            .setColor(client.color)
    
                        await profile.save();
                        await inv.save();
                        await cprofile.save();
    
                        msg.edit({ embeds: [embed], components: [], files: [] });
                        
                        collector.stop();
                    }
                    
                }
            }

        });

        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)

                msg.edit({ embeds: [timed], components: [], files: [] });
            }
        });
    }
    }
}

function Commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};
