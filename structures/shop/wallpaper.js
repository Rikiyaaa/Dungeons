const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GProfile = require("../../settings/models/profile.js");
const GInv = require("../../settings/models/inventory.js");
const HInv = require("../../settings/models/houseinv.js");
const { Page_1, Page_2, Page_3, Page_4, Page_5, Page_6, Page_7, Page_8, Page_9, Page_10, Page_11 } = require("../../settings/Item_shop/wallpaper.js");

const selectSide = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const object1 = Object.values(Page_1);
    const object2 = Object.values(Page_2);
    const object3 = Object.values(Page_3);
    const object4 = Object.values(Page_4);
    const object5 = Object.values(Page_5);
    const object6 = Object.values(Page_6);
    const object7 = Object.values(Page_7);
    const object8 = Object.values(Page_8);
    const object9 = Object.values(Page_9);
    const object10 = Object.values(Page_10);
    const object11 = Object.values(Page_11);

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

    const generateMenuOptions4 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object4.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions5 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object5.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions6 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object6.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions7 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object7.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions8 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object8.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions9 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object9.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions10 = () => {
        // generate options for the select menu based on the current page   
        const pageItems = object10.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);  
        return pageItems.map(key => {   
            return new SelectMenuOptionBuilder()    
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);    
        }); 
    };

    const generateMenuOptions11 = () => {
        // generate options for the select menu based on the current page
        const pageItems = object11.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        return pageItems.map(key => {
            return new SelectMenuOptionBuilder()
                .setLabel(`${toOppositeCase(key.name)} | Cost: ${Commas(key.price)} (Lvl.${key.level})`)
                .setValue(key.name);
        });
    };

    const row1 = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("shop_wall_1")
                .setPlaceholder(`Please selection item to buy.`)
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions1())
            ]);

        const row2 = new ActionRowBuilder()
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_furniture2")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)    
                .setMinValues(1)    
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions2()) 
            ]); 

        const row3 = new ActionRowBuilder() 
        .addComponents([    
            new StringSelectMenuBuilder()   
                .setCustomId("shop_wall_3")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu   
                .setOptions(generateMenuOptions3()) 
            ]); 

        const row4 = new ActionRowBuilder() 
        .addComponents([
            new StringSelectMenuBuilder()   
                .setCustomId("shop_wall_4")
                .setPlaceholder(`Please selection item to buy.`)    
                .setMaxValues(1)
                .setMinValues(1)
                /// Map the categories to the select menu
                .setOptions(generateMenuOptions4())
            ]);

        const row5 = new ActionRowBuilder()
        .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_wall_5")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions5())
            ]);
    
        const row6 = new ActionRowBuilder()
        .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_wall_6")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)    
                    .setMinValues(1)    
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions6()) 
            ]); 
    
        const row7 = new ActionRowBuilder() 
            .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_wall_7")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions7()) 
            ]); 
    
        const row8 = new ActionRowBuilder() 
        .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_wall_8")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions8())
            ]);

        const row9 = new ActionRowBuilder() 
        .addComponents([    
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_wall_9")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu   
                    .setOptions(generateMenuOptions9()) 
            ]); 
    
        const row10 = new ActionRowBuilder() 
        .addComponents([
                new StringSelectMenuBuilder()   
                    .setCustomId("shop_wall_10")
                    .setPlaceholder(`Please selection item to buy.`)    
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions10())
            ]);

            const row11 = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("shop_wall_11")
                    .setPlaceholder(`Please selection item to buy.`)
                    .setMaxValues(1)
                    .setMinValues(1)
                    /// Map the categories to the select menu
                    .setOptions(generateMenuOptions11())
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
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

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

    const canvas4 = Canvas.createCanvas(450, 300);
    const ctx4 = canvas4.getContext("2d");
    const shop4 = await Canvas.loadImage("./assests/shop/one.png");
    ctx4.drawImage(shop4, 0, 0, canvas4.width, canvas4.height);
    const attc4 = new AttachmentBuilder(await canvas4.encode("png"), { name: `one.png` })

    const canvas5 = Canvas.createCanvas(450, 300);
    const ctx5 = canvas5.getContext("2d");
    const shop5 = await Canvas.loadImage("./assests/shop/one.png");
    ctx5.drawImage(shop5, 0, 0, canvas5.width, canvas5.height);
    const attc5 = new AttachmentBuilder(await canvas5.encode("png"), { name: `one.png` })

    const canvas6 = Canvas.createCanvas(450, 300);
    const ctx6 = canvas6.getContext("2d");
    const shop6 = await Canvas.loadImage("./assests/shop/one.png");
    ctx6.drawImage(shop6, 0, 0, canvas6.width, canvas6.height);
    const attc6 = new AttachmentBuilder(await canvas6.encode("png"), { name: `one.png` })

    const canvas7 = Canvas.createCanvas(450, 300);
    const ctx7 = canvas7.getContext("2d");
    const shop7 = await Canvas.loadImage("./assests/shop/one.png");
    ctx7.drawImage(shop7, 0, 0, canvas7.width, canvas7.height);
    const attc7 = new AttachmentBuilder(await canvas7.encode("png"), { name: `one.png` })

    const canvas8 = Canvas.createCanvas(450, 300);
    const ctx8 = canvas8.getContext("2d");
    const shop8 = await Canvas.loadImage("./assests/shop/one.png");
    ctx8.drawImage(shop8, 0, 0, canvas8.width, canvas8.height);
    const attc8= new AttachmentBuilder(await canvas8.encode("png"), { name: `one.png` })

    const canvas9 = Canvas.createCanvas(450, 300);
    const ctx9 = canvas9.getContext("2d");
    const shop9 = await Canvas.loadImage("./assests/shop/one.png");
    ctx9.drawImage(shop9, 0, 0, canvas9.width, canvas9.height);
    const attc9 = new AttachmentBuilder(await canvas9.encode("png"), { name: `one.png` })

    const canvas10 = Canvas.createCanvas(450, 300);
    const ctx10 = canvas10.getContext("2d");
    const shop10 = await Canvas.loadImage("./assests/shop/one.png");
    ctx10.drawImage(shop10, 0, 0, canvas10.width, canvas10.height);
    const attc10 = new AttachmentBuilder(await canvas10.encode("png"), { name: `one.png` })

    const canvas11 = Canvas.createCanvas(450, 300);
    const ctx11 = canvas11.getContext("2d");
    const shop11 = await Canvas.loadImage("./assests/shop/one.png");
    ctx11.drawImage(shop11, 0, 0, canvas11.width, canvas11.height);
    const attc11 = new AttachmentBuilder(await canvas11.encode("png"), { name: `one.png` })

    const embed = new EmbedBuilder()
    .setImage("attachment://one.png")
    .setColor(client.color)

await msg.edit({ content: "Page 1", embeds: [embed], components: [row1, button], files: [attc1] });

const pages = [];
const attcs = [  
  [attc1, row1],
  [attc2, row2],
  [attc3, row3],
  [attc4, row4],
  [attc5, row5],
  [attc6, row6],
  [attc7, row7],
    [attc8, row8],
    [attc9, row9],
    [attc10, row10],
    [attc11, row11],
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
            if(menu.customId === "shop_wall_1") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_1.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_2") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_2.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_3") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_3.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_4") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_4.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_5") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_5.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_6") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_6.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_7") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_7.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_8") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_8.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_9") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_9.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_10") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_10.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

                await menu.followUp({ embeds: [embed], components: [], files: [] });
            } else if(menu.customId === "shop_wall_11") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = Page_11.find(x => x.name === directory);

                if (profile.money < item.price) return menu.followUp({ content: "You not have money to buy this. Price: " + item.price });
                if (profile.level < item.level) return menu.followUp({ content: "Requirement Level: " + item.level });
                if (inv.item.length > profile.inventory) return menu.followUp({ content: "You backpack is max " + profile.inventory });

                profile.money -= item.price;

                const GenID = generateID();


                hinv.wall_left.push({
                    name: item.name,
                    type: item.type,
                    side: "left",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                hinv.wall_right.push({
                    name: item.name,
                    type: item.type,
                    side: "right",
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                inv.item.push({
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    level: item.level,
                    id: GenID
                });

                const embed = new EmbedBuilder()
                    .setDescription("You Successafully to buy " + item.name)
                    .setColor(client.color)

                await profile.save();
                await inv.save();
                await hinv.save();

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

module.exports = { selectSide };