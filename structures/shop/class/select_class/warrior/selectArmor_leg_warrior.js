const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../../../../settings/models/profile.js");
const ItemInv = require("../../../../../settings/models/iteminventory.js");
const { Page_1, Page_2, Page_3 } = require("../../../../../settings/Item_class/armor_leg/armor_leg_warrior_item.js");

const selectArmor_leg_warrior = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const object1 = Object.values(Page_1);
    const object2 = Object.values(Page_2);
    const object3 = Object.values(Page_3);

    const itemsPerPage = 5; // number of items to display per page
    let currentPage = 0; // Initialize the current page to the first page

    

    const generateMenuOptions1 = () => {
        // generate options for the select menu based on the current page
        const pageItems = object1.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return pageItems.map(key => {
            return new SelectMenuOptionBuilder()
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);
        });
    };

    const generateMenuOptions2 = () => {
        // generate options for the select menu based on the current page
        const pageItems = object2.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return pageItems.map(key => {
            return new SelectMenuOptionBuilder()
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);
        });
    };

    const generateMenuOptions3 = () => {
        // generate options for the select menu based on the current page
        const pageItems = object3.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return pageItems.map(key => {
            return new SelectMenuOptionBuilder()
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        });
    };


    const row1 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("armor_leg_shop_warrior_1")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions1())
            ]);

        const row2 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("armor_leg_shop_warrior_2")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions2()) 
            ]); 

        const row3 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("armor_leg_shop_warrior_3")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions3()) 
            ]); 


                const button = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                .setCustomId("shop_furniture_prev10")
                .setLabel("Previous 10")
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder() 
                    .setCustomId("shop_furniture_prev")
                    .setLabel("Previous")   
                    .setStyle(ButtonStyle.Danger)   ,
                new ButtonBuilder() 
                    .setCustomId("shop_furniture_next")
                    .setLabel("Next")   
                    .setStyle(ButtonStyle.Danger),
                // create button next 10 pages
                new ButtonBuilder()
                    .setCustomId("shop_furniture_next10")
                    .setLabel("Next 10")
                    .setStyle(ButtonStyle.Danger),
                // create button previous 10 pages
                // create button next 100 pages
            ]);

    const profile = await GProfile.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const iteminv = await ItemInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const canvas1 = Canvas.createCanvas(450, 300);
    const ctx1 = canvas1.getContext("2d");
    const shop1 = await Canvas.loadImage("./assests/shop/one.png");
    ctx1.drawImage(shop1, 0, 0, canvas1.width, canvas1.height);
    const attc1 = new AttachmentBuilder(await canvas1.encode("png"), { name: `one.png` })

    const canvas2 = Canvas.createCanvas(450, 300);
    const ctx2 = canvas2.getContext("2d");
    const shop2 = await Canvas.loadImage("./assests/shop/one.png");
    ctx2.drawImage(shop2, 0, 0, canvas2.width, canvas2.height);
    const attc2 = new AttachmentBuilder(await canvas2.encode("png"), { name: `one.png` })

    const canvas3 = Canvas.createCanvas(450, 300);
    const ctx3 = canvas3.getContext("2d");
    const shop3 = await Canvas.loadImage("./assests/shop/one.png");
    ctx3.drawImage(shop3, 0, 0, canvas3.width, canvas3.height);
    const attc3 = new AttachmentBuilder(await canvas3.encode("png"), { name: `one.png` })


    const embed = new EmbedBuilder()
    .setImage("attachment://one.png")
    .setColor(client.color)

await msg.edit({ content: "Page 1", embeds: [embed], components: [row1, button], files: [attc1] });

const pages = [];
const attcs = [  
  [attc1, row1],
  [attc2, row2],
  [attc3, row3],
];

for (let i = 0; i < attcs.length; i++) {
  const [attc, component] = attcs[i];
  pages.push({
    content: `Page ${i + 1}`,
    components: [component, button],
    files: [attc],
  });
}


    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isSelectMenu()) {
            if(menu.customId === "armor_leg_shop_warrior_1") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_1.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (iteminv.item.length > profile.iteminventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();

               iteminv.item.push({
                    name: item.name,
                    emoji: item.emoji,
                    status: item.status,
                    type: item.type,
                    defense: 5,
                    defense_max: item.defense_max,
                    durability: 100,
                    durability_max: item.durability_max,
                    level_upgade: item.level_upgade,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await iteminv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "armor_leg_shop_warrior_2") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_2.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (iteminv.item.length > profile.iteminventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();

               iteminv.item.push({
                    name: item.name,
                    emoji: item.emoji,
                    status: item.status,
                    type: item.type,
                    defense: 5,
                    defense_max: item.defense_max,
                    durability: 100,
                    durability_max: item.durability_max,
                    level_upgade: item.level_upgade,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await iteminv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "armor_leg_shop_warrior_3") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_3.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (iteminv.item.length > profile.iteminventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();

               iteminv.item.push({
                    name: item.name,
                    emoji: item.emoji,
                    status: item.status,
                    type: item.type,
                    defense: 5,
                    defense_max: item.defense_max,
                    durability: 100,
                    durability_max: item.durability_max,
                    level_upgade: item.level_upgade,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await iteminv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            
            }
        } else if (menu.isButton()) {
            await menu.deferUpdate();
            if (menu.customId === "shop_furniture_next") {
                currentPage++;
                if (currentPage >= pages.length) currentPage = pages.length - 1;
            } else if (menu.customId === "shop_furniture_prev") {
                currentPage--;
                if (currentPage < 0) currentPage = 0;
            } else if (menu.customId === "shop_furniture_next10") {
                currentPage += 10;
                if (currentPage >= pages.length) currentPage = pages.length - 1;
            } else if (menu.customId === "shop_furniture_prev10") {
                currentPage -= 10;
                if (currentPage < 0) currentPage = 0;
            }

            const embed = new EmbedBuilder()
            .setDescription(pages[currentPage].content)
            .setColor(client.color);
    
            await msg.edit({
                content: pages[currentPage].content,
                embeds: [embed],
                components: pages[currentPage].components,
                files: pages[currentPage].files,
            });
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

module.exports = { selectArmor_leg_warrior };