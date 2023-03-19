const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder,ButtonStyle } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const FishInv = require("../../settings/models/fishinventory.js");
const GachaInv = require("../../settings/models/gachainventory.js");
const ItemInv = require("../../settings/models/iteminventory.js");
const cprofile = require("../../settings/models/cradprofile.js");
const Member = require("../../settings/models/profile.js");

module.exports = {
    name: ["inventory"], // Base Commands! // Sub Commands!
    description: "Display your all items in inventory.",
    category: "General",
    run: async (client, interaction) => {

        await  interaction.reply({ content: "Loading please wait...", components:[], ephemeral: true });
        

        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const fishinv = await FishInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const gachainv = await GachaInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const iteminv = await ItemInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const cp = await cprofile.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        // Filter to Duplicate from Object
        const result = [...inv.item.reduce( (mp, o) => {
            const key = JSON.stringify([o.name, o.type]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];

        const resultfish = [...fishinv.item.reduce( (mp, o) => {
            const key = JSON.stringify([o.name, o.type]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];

        const resultgacha = [...gachainv.item.reduce( (mp, o) => {
            const key = JSON.stringify([o.name, o.type]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];

        const resultitem = [...iteminv.item.reduce( (mp, o) => {
            const key = JSON.stringify([o.name, o.type]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];

        const row = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_select")
                .setPlaceholder(`Please select category to see.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions([
                    {
                        label: "general inventory",
                        description: "Shop your general items",
                        value: "general",
                        emoji: "📦"
                    },
                    {
                        label: "fish inventory",
                        description: "Shop your furniture",
                        value: "fish",
                        emoji: "🐟"
                    },
                    {
                        label: "gacha inventory",
                        description: "Shop your gacha items",
                        value: "gacha",
                        emoji: "🎁"
                    },
                    {
                        label: "item inventory",
                        description: "Shop your item items",
                        value: "item",
                        emoji: "📦"
                    },
                    
                ])
                // create button 
                
            ])
            const button = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("shop_close")
                .setLabel("Close") 
                .setStyle(ButtonStyle.Danger)
        ])  



            let filter = (m) => m.user.id === interaction.user.id;
            let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

            // toTitleCase function  
            function toTitleCase(str) {
                return str.replace(
                    /\w\S*/g,
                    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
            }
            async function generateInventoryEmbed(category, page, inventory, inventoryLimit) {
                const itemsPerPage = 10;
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
            
                const filteredInventory = inventory.filter((item) => item.type === category);
                const slicedInventory = filteredInventory.slice(start, end);
                const itemCount = filteredInventory.length;
            
                const formattedItems = slicedInventory.map((item) => `${toOppositeCase(item.name)} (x${item.count})`);

                    
            
                return embed;
            }
            
let currentPage = 1;

collector.on('collect', async (menu,) => {
    if(menu.isSelectMenu()) {
        if(menu.customId === "shop_select") {
            let [directory] = menu.values;

            if (directory === "fish") {
                currentPage = 1;
                await menu.deferUpdate();
                const sfish1 = [];
                const sfish2 = [];
                const sfish3 = [];
                const sfish4 = [];

                for (let i = 0; i < resultfish.length; i++) {
                    const type = resultfish[i].type;
                    if (type == "fish") {
                        sfish1.push(`${toOppositeCase(resultfish[i].name)} (x${resultfish[i].count})`)
                    } else if (type == "fish2") {
                        sfish2.push(`${toOppositeCase(resultfish[i].name)} (x${resultfish[i].count})`)
                    } else if (type == "fish3") {
                        sfish3.push(`${toOppositeCase(resultfish[i].name)} (x${resultfish[i].count})`)
                    } else if (type == "fish4") {
                        sfish4.push(`${toOppositeCase(resultfish[i].name)} (x${resultfish[i].count})`)
                    }
                }

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                .setThumbnail(interaction.user.displayAvatarURL())
                .setDescription(`fish Backpack: (${fishinv.item.length}/${profile.fishinventory})`)
                .addFields(
                    { name: "fish", value: `${(sfish1.join("\n") || "No items!")}`, inline: false },
                    { name: "fish2", value: `${(sfish2.join("\n") || "No items!")}`, inline: false },
                    { name: "fish3", value: `${(sfish3.join("\n") || "No items!")}` , inline: false },
                    { name: "fish4", value: `${(sfish4.join("\n") || "No items!")}`, inline: false },
                )
                .setColor(client.color)

            await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
            } else if (directory === "general") {
                currentPage = 1;
                await menu.deferUpdate();
                const sFood = [];
                const sFur = [];
                const sTile = [];
                const sFloor = [];
                const sWall = [];
                const sFruit = [];
                const sItem = [];
                const sCandy = [];
                const sFlower = [];
        
                for (let i = 0; i < result.length; i++) {
                    const type = result[i].type;
                    if (type == "furniture") {
                        sFur.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "tile") {
                        sTile.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "floor") {
                        sFloor.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "wallpaper") {
                        sWall.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "fruit") {
                        sFruit.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "item") {
                        sItem.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "candy") {
                        sCandy.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "food") {
                        sFood.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    } else if (type == "flower") {
                        sFlower.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
                    }
                }
        
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                    .setDescription(`Backpack: (${inv.item.length}/${profile.inventory})`)
                    .addFields(
                        { name: "Food", value: `${(sFood.join("\n") || "No items!")}`, inline: false },
                        { name: "Fruit", value: `${(sFruit.join("\n") || "No items!")}`, inline: true},
                        { name: "Item", value: `${(sItem.join("\n") || "No items!")}`, inline: true},
                        { name: "Wallpaper", value: `${(sWall.join("\n") || "No items!")}`, inline: false },
                        { name: "Tile", value: `${(sTile.join("\n") || "No items!")}`, inline: false },
                        { name: "Floor", value: `${(sFloor.join("\n") || "No items!")}` , inline: false },
                        { name: "Furniture", value: `${(sFur.join("\n") || "No items!")}`, inline: false },
                        { name: "Candy", value: `${(sCandy.join("\n") || "No items!")}`, inline: false },
                        { name: "Flower", value: `${(sFlower.join("\n") || "No items!")}`, inline: false },

                    )
                    .setColor(client.color)
                await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
            } else if (directory === "gacha") {
                currentPage = 1;
                await menu.deferUpdate();
                const sGacha = [];

                for (let i = 0; i < resultgacha.length; i++) {
                    const type = resultgacha[i].type;
                    if (type == "gacha") {
                        sGacha.push(`${toOppositeCase(resultgacha[i].name)} (x${resultgacha[i].count})`)
                    } 
                }

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                .setThumbnail(interaction.user.displayAvatarURL())
                .setDescription(`Gacha Backpack: (${gachainv.item.length}/${profile.gachainventory})`)
                .addFields(
                    { name: "Gacha", value: `${(sGacha.join("\n") || "No items!")}`, inline: false },
                )
                .setColor(client.color)

                await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
            }else if (directory === "item") {
                currentPage = 1;
                await menu.deferUpdate();
                const sHuman_sword = [];
                const sHuman_armor_head = [];
                const sHuman_armor_body = [];
                const sHuman_armor_leg = [];
                const sHuman_armor_foot = [];
                const sSwordman_sword = [];
                const sSwordman_armor_head = [];
                const sSwordman_armor_body = [];
                const sSwordman_armor_leg = [];
                const sSwordman_armor_foot = [];
                const sWarrior_sword = [];
                const sWarrior_armor_head = [];
                const sWarrior_armor_body = [];
                const sWarrior_armor_leg = [];
                const sWarrior_armor_foot = [];
                const sMagic_sword = [];
                const sMagic_armor_head = [];
                const sMagic_armor_body = [];
                const sMagic_armor_leg = [];
                const sMagic_armor_foot = [];
                for (let i = 0; i < resultitem.length; i++) {
                    const type = resultitem[i].type;
                    if (type == "human_sword") {
                        sHuman_sword.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    }  else if (type == "human_armor_head") {
                        sHuman_armor_head.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "human_armor_body") {
                        sHuman_armor_body.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "human_armor_leg") {
                        sHuman_armor_leg.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "human_armor_foot") {
                        sHuman_armor_foot.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "swordman_sword") {
                        sSwordman_sword.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    }  else if (type == "swordman_armor_head") {
                        sSwordman_armor_head.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "swordman_armor_body") {
                        sSwordman_armor_body.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "swordman_armor_leg") {
                        sSwordman_armor_leg.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "swordman_armor_foot") {
                        sSwordman_armor_foot.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "warrior_sword") {
                        sWarrior_sword.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "warrior_armor_head") {
                        sWarrior_armor_head.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "warrior_armor_body") {
                        sWarrior_armor_body.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "warrior_armor_leg") { 
                        sWarrior_armor_leg.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "warrior_armor_foot") { 
                        sWarrior_armor_foot.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "magic_sword") {
                        sMagic_sword.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "magic_armor_head") {
                        sMagic_armor_head.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "magic_armor_body") { 
                        sMagic_armor_body.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "magic_armor_leg") { 
                        sMagic_armor_leg.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } else if (type == "magic_armor_foot") { 
                        sMagic_armor_foot.push(`${toOppositeCase(resultitem[i].name)} (x${resultitem[i].count})`)
                    } 
                }

                if(cp.type[0].type == "Human") {

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                .setThumbnail(interaction.user.displayAvatarURL())
                .setDescription(`Human'Item Backpack: (${iteminv.item.length}/${profile.iteminventory})`)
                .addFields(
                    { name: "Sword", value: `${(sHuman_sword.join("\n") || "No items!")}`, inline: false },
                    { name: "Armor Head", value: `${(sHuman_armor_head.join("\n") || "No items!")}`, inline: false },
                    { name: "Armor Body", value: `${(sHuman_armor_body.join("\n") || "No items!")}`, inline: false },
                    { name: "Armor Leg", value: `${(sHuman_armor_leg.join("\n") || "No items!")}`, inline: false },
                    { name: "Armor Foot", value: `${(sHuman_armor_foot.join("\n") || "No items!")}`, inline: false },
                )
                .setColor(client.color)

                await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
                } else if(cp.type[0].type == "Swordman") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setDescription(`Swordman'Item Backpack: (${iteminv.item.length}/${profile.iteminventory})`)
                    .addFields(
                        { name: "Sword", value: `${(sSwordman_sword.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Head", value: `${(sSwordman_armor_head.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Body", value: `${(sSwordman_armor_body.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Leg", value: `${(sSwordman_armor_leg.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Foot", value: `${(sSwordman_armor_foot.join("\n") || "No items!")}`, inline: false },
                    )
                    .setColor(client.color)
    
                    await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
                } else if(cp.type[0].type == "Warrior") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setDescription(`Warrior'Item Backpack: (${iteminv.item.length}/${profile.iteminventory})`)
                    .addFields(
                        { name: "Sword", value: `${(sWarrior_sword.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Head", value: `${(sWarrior_armor_head.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Body", value: `${(sWarrior_armor_body.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Leg", value: `${(sWarrior_armor_leg.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Foot", value: `${(sWarrior_armor_foot.join("\n") || "No items!")}`, inline: false },
                    )
                    .setColor(client.color)
    
                    await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
                } else if(cp.type[0].type == "Magic") {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setDescription(`Magic'Item Backpack: (${iteminv.item.length}/${profile.iteminventory})`)
                    .addFields(
                        { name: "Sword", value: `${(sMagic_sword.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Head", value: `${(sMagic_armor_head.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Body", value: `${(sMagic_armor_body.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Leg", value: `${(sMagic_armor_leg.join("\n") || "No items!")}`, inline: false },
                        { name: "Armor Foot", value: `${(sMagic_armor_foot.join("\n") || "No items!")}`, inline: false },
                    )
                    .setColor(client.color)
    
                    await interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
                }
            }
        }
    } else if (menu.isButton()) {
         if (menu.customId === "shop_close") {
            await menu.deferUpdate();
            const embed = new EmbedBuilder()
            .setTitle("Shop Closed")
            .setDescription("You have closed the shop!")
            .setColor(client.color)

            await interaction.editReply({ embeds: [embed], components: [], ephemeral: true });
        }
    }
});
        const sFood = [];
        const sFur = [];
        const sTile = [];
        const sFloor = [];
        const sWall = [];
        const sFruit = [];
        const sItem = [];
        const sCandy = [];
        const sFlower = [];

        for (let i = 0; i < result.length; i++) {
            const type = result[i].type;
            if (type == "furniture") {
                sFur.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "tile") {
                sTile.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "floor") {
                sFloor.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "wallpaper") {
                sWall.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "fruit") {
                sFruit.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "item") {
                sItem.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "candy") {
                sCandy.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "food") {
                sFood.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            } else if (type == "flower") {
                sFlower.push(`${toOppositeCase(result[i].name)} (x${result[i].count})`)
            }
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}'s Inventory`, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`Backpack: (${inv.item.length}/${profile.inventory})`)
            .addFields(
                { name: "Food", value: `${(sFood.join("\n") || "No items!")}`, inline: false },
                { name: "Fruit", value: `${(sFruit.join("\n") || "No items!")}`, inline: true},
                { name: "Item", value: `${(sItem.join("\n") || "No items!")}`, inline: true},
                { name: "Wallpaper", value: `${(sWall.join("\n") || "No items!")}`, inline: false },
                { name: "Tile", value: `${(sTile.join("\n") || "No items!")}`, inline: false },
                { name: "Floor", value: `${(sFloor.join("\n") || "No items!")}` , inline: false },
                { name: "Furniture", value: `${(sFur.join("\n") || "No items!")}`, inline: false },
                { name: "Candy", value: `${(sCandy.join("\n") || "No items!")}`, inline: false },
                { name: "Flower", value: `${(sFlower.join("\n") || "No items!")}`, inline: false },

            )
            .setColor(client.color)

            await  interaction.editReply({ embeds: [embed], components: [row, button], ephemeral: true });
        
    }
    

}
    


function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

