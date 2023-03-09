const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const GInv = require("../../settings/models/inventory.js");
const HInv = require("../../settings/models/houseinv.js");
const GHouse = require("../../settings/models/house.js");
const { replaceHouse } = require("../../structures/replace.js");
const { saveLA1, saveLA2, saveLA3, saveLA4, 
    saveLB1, saveLB2, saveLB3, saveLB4, 
    saveLC1, saveLC2, saveLC3, saveLC4, 
    saveLD1, saveLD2, saveLD3, saveLD4, 
    saveRA1, saveRA2, saveRA3, saveRA4, 
    saveRB1, saveRB2, saveRB3, saveRB4, 
    saveRC1, saveRC2, saveRC3, saveRC4, 
    saveRD1, saveRD2, saveRD3, saveRD4,} = require("../../structures/edit/confirm.js");

const editFurnitureAR = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/aone.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `aone.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://aone.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_ra")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓐ➀",
                        description: "Place on position A1",
                        value: "place_raone"
                    },
                    {
                        label: "Ⓐ➁",
                        description: "Place on position A2",
                        value: "place_ratwo"
                    },
                    {
                        label: "Ⓐ➂",
                        description: "Place on position A3",
                        value: "place_rathree"
                    },
                    {
                        label: "Ⓐ➃",
                        description: "Place on position A4",
                        value: "place_rafour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ra_one")
            .setLabel("A1")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rd_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_ra") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_raone") {
                    /// checking position
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.LA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.LA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.LA1 = true
                        home.A_DATA.RA1 = true
                        home.A_DATA.LA1I = check.name;
                        /// save A2
                        home.B_DATA.LB1 = true
                        home.B_DATA.RB1 = true
                    } else {
                        home.A_DATA.LA1 = true
                        home.A_DATA.RA1 = true
                        home.A_DATA.LA1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRA1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_ratwo") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.LA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.LA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.LA2 = true
                        home.A_DATA.RA2 = true
                        home.A_DATA.LA2I = check.name;
                        /// save A3
                        home.B_DATA.LB2 = true
                        home.B_DATA.RB2 = true
                    } else {
                        home.A_DATA.LA2 = true
                        home.A_DATA.RA2 = true
                        home.A_DATA.LA2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRA2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rathree") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.LA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.LA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.LA3 = true
                        home.A_DATA.RA3 = true
                        home.A_DATA.LA3I = check.name;
                        // save A4
                        home.B_DATA.LB3 = true
                        home.B_DATA.RB3 = true
                    } else {
                        home.A_DATA.LA3 = true
                        home.A_DATA.RA3 = true
                        home.A_DATA.LA3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRA3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rafour") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.LA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.LA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.LA4 = true
                        home.A_DATA.RA4 = true
                        home.A_DATA.LA4I = check.name;
                        // save A4
                        home.B_DATA.LB4 = true
                        home.B_DATA.RB4 = true
                    } else {
                        home.A_DATA.LA4 = true
                        home.A_DATA.RA4 = true
                        home.A_DATA.LA4I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRA4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();

            if(menu.customId === "ra_one") {
              //
            } else if (menu.customId === "rb_two") {
                editFurnitureBR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rc_three") {
                editFurnitureCR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rd_four") {
                editFurnitureDR(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

    return;
}

const editFurnitureBR = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/btwo.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `btwo.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://btwo.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_rb")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓑ➀",
                        description: "Place on position B1",
                        value: "place_rbone"
                    },
                    {
                        label: "Ⓑ➁",
                        description: "Place on position B2",
                        value: "place_rbtwo"
                    },
                    {
                        label: "Ⓑ➂",
                        description: "Place on position B3",
                        value: "place_rbthree"
                    },
                    {
                        label: "Ⓑ➃",
                        description: "Place on position B4",
                        value: "place_rbfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ra_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rb_two")
            .setLabel("A2")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rd_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_rb") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_rbone") {
                    /// checking position
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.LB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.LB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.LB1 = true
                        home.B_DATA.RB1 = true
                        home.B_DATA.LB1I = check.name;
                        /// save A2
                        home.C_DATA.LC1 = true
                        home.C_DATA.RC1 = true
                    } else {
                        home.B_DATA.LB1 = true
                        home.B_DATA.RB1 = true
                        home.B_DATA.LB1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRB1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rbtwo") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.LB2 = true
                        home.B_DATA.RB2 = true
                        home.B_DATA.LB2I = check.name;
                        /// save A3
                        home.C_DATA.LC2 = true
                        home.C_DATA.RC2 = true
                    } else {
                        home.B_DATA.LB2 = true
                        home.B_DATA.RB2 = true
                        home.B_DATA.LB2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRB2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rbthree") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.LB3 = true
                        home.B_DATA.RB3 = true
                        home.B_DATA.LB3I = check.name;
                        // save A4
                        home.C_DATA.LC3 = true
                        home.C_DATA.RC3 = true
                    } else {
                        home.B_DATA.LB3 = true
                        home.B_DATA.RB3 = true
                        home.B_DATA.LB3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRB3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rbfour") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.LB4 = true
                        home.B_DATA.RB4 = true
                        home.B_DATA.LB4I = check.name;
                        // save A4
                        home.C_DATA.LC4 = true
                        home.C_DATA.RC4 = true
                    } else {
                        home.B_DATA.LB4 = true
                        home.B_DATA.RB4 = true
                        home.B_DATA.LB4I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRB4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "ra_one") {
                editFurnitureAR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rb_two") {
                //
            } else if (menu.customId === "rc_three") {
                editFurnitureCR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rd_four") {
                editFurnitureDR(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const editFurnitureCR = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/cthree.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `cthree.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://cthree.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_rc")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓒ➀",
                        description: "Place on position C1",
                        value: "place_rcone"
                    },
                    {
                        label: "Ⓒ➁",
                        description: "Place on position C2",
                        value: "place_rctwo"
                    },
                    {
                        label: "Ⓒ➂",
                        description: "Place on position C3",
                        value: "place_rcthree"
                    },
                    {
                        label: "Ⓒ➃",
                        description: "Place on position C4",
                        value: "place_rcfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ra_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rc_three")
            .setLabel("A3")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rd_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_rc") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_rcone") {
                    /// checking position
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.LC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.LC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.LC1 = true
                        home.C_DATA.RC1 = true
                        home.C_DATA.LC1I = check.name;
                        /// save A2
                        home.D_DATA.LD1 = true
                        home.D_DATA.RD1 = true
                    } else {
                        home.C_DATA.LC1 = true
                        home.C_DATA.RC1 = true
                        home.C_DATA.LC1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRC1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rctwo") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.R2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.LC2 = true
                        home.C_DATA.RC2 = true
                        home.C_DATA.LC2I = check.name;
                        /// save A3
                        home.D_DATA.LD2 = true
                        home.D_DATA.RD2 = true
                    } else {
                        home.C_DATA.LC2 = true
                        home.C_DATA.RC2 = true
                        home.C_DATA.LC2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRC2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rcthree") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.LC3 = true
                        home.C_DATA.RC3 = true
                        home.C_DATA.LC3I = check.name;
                        // save A4
                        home.D_DATA.LD3 = true
                        home.D_DATA.RD3 = true
                    } else {
                        home.C_DATA.LC3 = true
                        home.C_DATA.RC3 = true
                        home.C_DATA.LC3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRC3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rcfour") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.LC4 = true
                        home.C_DATA.RC4 = true
                        home.C_DATA.LC4I = check.name;
                        // save A4
                        home.D_DATA.LD4 = true
                        home.D_DATA.RD4 = true
                    } else {
                        home.C_DATA.LC4 = true
                        home.C_DATA.RC4 = true
                        home.C_DATA.LC4I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRC4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "ra_one") {
                editFurnitureAR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rb_two") {
                editFurnitureBR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rc_three") {
                //
            } else if (menu.customId === "rd_four") {
                editFurnitureDR(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const editFurnitureDR = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/dfour.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `dfour.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://dfour.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_rd")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓓ➀",
                        description: "Place on position D1",
                        value: "place_rdone"
                    },
                    {
                        label: "Ⓓ➁",
                        description: "Place on position D2",
                        value: "place_rdtwo"
                    },
                    {
                        label: "Ⓓ➂",
                        description: "Place on position D3",
                        value: "place_rdthree"
                    },
                    {
                        label: "Ⓓ➃",
                        description: "Place on position D4",
                        value: "place_rdfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("ra_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("rd_four")
            .setLabel("A4")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_rd") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_rdone") {
                    /// checking position
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.LD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.LD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.D_DATA.LD1 = true;
                    home.D_DATA.RD1 = true;
                    home.D_DATA.LD1I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRD1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rdtwo") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.D_DATA.LD2 = true;
                    home.D_DATA.RD2 = true;
                    home.D_DATA.LD2I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRD2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rdthree") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.D_DATA.LD3 = true;
                    home.D_DATA.RD3 = true;
                    home.D_DATA.LD3I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRD3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_rdfour") {
                    const check = hinv.furniture_right.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.D_DATA.LD4 = true;
                    home.D_DATA.RD4 = true;
                    home.D_DATA.LD4I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveRD4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "ra_one") {
                editFurnitureAR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rb_two") {
                editFurnitureBR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rc_three") {
                editFurnitureCR(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "rd_four") {
                //
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const editFurnitureAL = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/aone.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `aone.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://aone.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_la")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓐ➀",
                        description: "Place on position A1",
                        value: "place_laone"
                    },
                    {
                        label: "Ⓐ➁",
                        description: "Place on position A2",
                        value: "place_latwo"
                    },
                    {
                        label: "Ⓐ➂",
                        description: "Place on position A3",
                        value: "place_lathree"
                    },
                    {
                        label: "Ⓐ➃",
                        description: "Place on position A4",
                        value: "place_lafour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("la_one")
            .setLabel("A1")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("ld_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_la") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_laone") {
                    /// checking position
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.RA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.RA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.RA1 = true
                        home.A_DATA.LA1 = true
                        home.A_DATA.RA1I = check.name;
                        /// save A2
                        home.A_DATA.RA2 = true
                        home.A_DATA.LA2 = true
                    } else {
                        home.A_DATA.RA1 = true
                        home.A_DATA.LA1 = true
                        home.A_DATA.RA1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLA1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_latwo") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.RA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.RA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.RA2 = true
                        home.A_DATA.LA2 = true
                        home.A_DATA.RA2I = check.name;
                        /// save A3
                        home.A_DATA.RA3 = true
                        home.A_DATA.LA3 = true
                    } else {
                        home.A_DATA.RA2 = true
                        home.A_DATA.LA2 = true
                        home.A_DATA.RA2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLA2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lathree") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.RA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.RA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.RA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.A_DATA.RA3 = true
                        home.A_DATA.LA3 = true
                        home.A_DATA.RA3I = check.name;
                        // save A4
                        home.A_DATA.RA4 = true
                        home.A_DATA.LA4 = true
                    } else {
                        home.A_DATA.RA3 = true
                        home.A_DATA.LA3 = true
                        home.A_DATA.RA3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLA3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lafour") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.A_DATA.RA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.A_DATA.RA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.A_DATA.LA4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.A_DATA.RA4 = true;
                    home.A_DATA.LA4 = true;
                    home.A_DATA.RA4I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLA4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();

            if(menu.customId === "la_one") {
              //
            } else if (menu.customId === "lb_two") {
                editFurnitureBL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lc_three") {
                editFurnitureCL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "ld_four") {
                editFurnitureDL(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

    return;
}

const editFurnitureBL = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/btwo.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `btwo.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://btwo.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_lb")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓑ➀",
                        description: "Place on position B1",
                        value: "place_lbone"
                    },
                    {
                        label: "Ⓑ➁",
                        description: "Place on position B2",
                        value: "place_lbtwo"
                    },
                    {
                        label: "Ⓑ➂",
                        description: "Place on position B3",
                        value: "place_lbthree"
                    },
                    {
                        label: "Ⓑ➃",
                        description: "Place on position B4",
                        value: "place_lbfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("la_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lb_two")
            .setLabel("A2")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("ld_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    let place = await Canvas.loadImage(`./assests/furniture/${item}_${side}.png`);
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_lb") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_lbone") {
                    /// checking position
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.RB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.RB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.RB1 = true
                        home.B_DATA.LB1 = true
                        home.B_DATA.RB1I = check.name;
                        /// save A2
                        home.B_DATA.RB2 = true
                        home.B_DATA.LB2 = true
                    } else {
                        home.B_DATA.RB1 = true
                        home.B_DATA.LB1 = true
                        home.B_DATA.RB1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLB1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lbtwo") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.RB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.RB2 = true
                        home.B_DATA.LB2 = true
                        home.B_DATA.RB2I = check.name;
                        /// save A3
                        home.B_DATA.RB3 = true
                        home.B_DATA.LB3 = true
                    } else {
                        home.B_DATA.RB2 = true
                        home.B_DATA.LB2 = true
                        home.B_DATA.RB2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLB2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lbthree") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.RB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.B_DATA.RB3 = true
                        home.B_DATA.LB3 = true
                        home.B_DATA.RB3I = check.name;
                        // save A4
                        home.B_DATA.RB4 = true
                        home.B_DATA.LB4 = true
                    } else {
                        home.B_DATA.RB3 = true
                        home.B_DATA.LB3 = true
                        home.B_DATA.RB3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLB3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lbfour") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.B_DATA.RB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.B_DATA.LB4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.B_DATA.RB4 = true;
                    home.B_DATA.LB4 = true;
                    home.B_DATA.RB4I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLB4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "la_one") {
                editFurnitureAL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lb_two") {
                //
            } else if (menu.customId === "lc_three") {
                editFurnitureCL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "ld_four") {
                editFurnitureDL(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const editFurnitureCL = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/cthree.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `cthree.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://cthree.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_lc")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓒ➀",
                        description: "Place on position C1",
                        value: "place_lcone"
                    },
                    {
                        label: "Ⓒ➁",
                        description: "Place on position C2",
                        value: "place_lctwo"
                    },
                    {
                        label: "Ⓒ➂",
                        description: "Place on position C3",
                        value: "place_lcthree"
                    },
                    {
                        label: "Ⓒ➃",
                        description: "Place on position C4",
                        value: "place_lcfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("la_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lc_three")
            .setLabel("A3")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("ld_four")
            .setLabel("A4")
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_lc") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_lcone") {
                    /// checking position
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.RC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.RC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.RC1 = true
                        home.C_DATA.LC1 = true
                        home.C_DATA.RC1I = check.name;
                        /// save A2
                        home.C_DATA.RC2 = true
                        home.C_DATA.LC2 = true
                    } else {
                        home.C_DATA.RC1 = true
                        home.C_DATA.LC1 = true
                        home.C_DATA.RC1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLC1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lctwo") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.RC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.RC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.RC2 = true
                        home.C_DATA.LC2 = true
                        home.C_DATA.RC2I = check.name;
                        /// save A3
                        home.C_DATA.RC3 = true
                        home.C_DATA.LC3 = true
                    } else {
                        home.C_DATA.RC2 = true
                        home.C_DATA.LC2 = true
                        home.C_DATA.RC2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLC2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lcthree") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.RC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.C_DATA.RC3 = true
                        home.C_DATA.LC3 = true
                        home.C_DATA.RC3I = check.name;
                        // save A4
                        home.C_DATA.RC4 = true
                        home.C_DATA.LC4 = true
                    } else {
                        home.C_DATA.RC3 = true
                        home.C_DATA.LC3 = true
                        home.C_DATA.RC3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)

                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLC3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_lcfour") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.C_DATA.RC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.C_DATA.LC4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.C_DATA.RC4 = true;
                    home.C_DATA.LC4 = true;
                    home.C_DATA.RC4I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLC4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "la_one") {
                editFurnitureAL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lb_two") {
                editFurnitureBL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lc_three") {
                //
            } else if (menu.customId === "ld_four") {
                editFurnitureDL(client, interaction,  item, type, id, side);
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}

const editFurnitureDL = async function (client, interaction,  item, type, id, side) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const placer = await Canvas.loadImage("./assests/dfour.png");
    ctx.drawImage(placer, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `dfour.png` })

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setImage("attachment://dfour.png")
        .setDescription("*Please Select a Postion*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("furplace_ld")
                .setPlaceholder("Placing a furniture.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions([
                    {
                        label: "Ⓓ➀",
                        description: "Place on position D1",
                        value: "place_ldone"
                    },
                    {
                        label: "Ⓓ➁",
                        description: "Place on position D2",
                        value: "place_ldtwo"
                    },
                    {
                        label: "Ⓓ➂",
                        description: "Place on position D3",
                        value: "place_ldthree"
                    },
                    {
                        label: "Ⓓ➃",
                        description: "Place on position D4",
                        value: "place_ldfour"
                    }
                ])
            ])

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("la_one")
            .setLabel("A1")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lb_two")
            .setLabel("A2")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("lc_three")
            .setLabel("A3")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("ld_four")
            .setLabel("A4")
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        )

    await interaction.editReply({ embeds: [embed], components: [select, button], files: [attc] });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    
    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
   const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "furplace_ld") {
                await menu.deferUpdate();
                /// value id
                let [ directory ] = menu.values;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const place_on = await Canvas.loadImage("./assests/default.png");
                ctx.drawImage(place_on, 0, 0, canvas.width, canvas.height); // and place
                
                if (directory === "place_ldone") {
                    /// checking position
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.RD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.RD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD1 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }

                    if(check.area === 2) {
                        home.D_DATA.RD1 = true
                        home.D_DATA.LD1 = true
                        home.D_DATA.RD1I = check.name;
                        /// save A2
                        home.D_DATA.RD2 = true
                        home.D_DATA.LD2 = true
                    } else {
                        home.D_DATA.RD1 = true
                        home.D_DATA.LD1 = true
                        home.D_DATA.RD1I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLD1(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_ldtwo") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.RD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD2 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) {
                        home.D_DATA.RD2 = true
                        home.D_DATA.LD2 = true
                        home.D_DATA.RD2I = check.name;
                        /// save A3
                        home.D_DATA.RD3 = true
                        home.D_DATA.LD3 = true
                    } else {
                        home.D_DATA.RD2 = true
                        home.D_DATA.LD2 = true
                        home.D_DATA.RD2I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLD2(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_ldthree") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.RD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD3 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    
                    // save and replace
                    if(check.area === 2) {
                        home.D_DATA.RD3 = true
                        home.D_DATA.LD3 = true
                        home.D_DATA.RD3I = check.name;
                        // save A4
                        home.D_DATA.RD4 = true
                        home.D_DATA.LD4 = true
                    } else {
                        home.D_DATA.RD3 = true
                        home.D_DATA.LD3 = true
                        home.D_DATA.RD3I = check.name;
                    }
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLD3(interaction, id,  message, check, item);
                    });
                    collector.stop();
                } else if (directory === "place_ldfour") {
                    const check = hinv.furniture_left.find(x => x.id === id);
                    if(check.area === 2) {
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    } else {
                        if (home.D_DATA.RD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                        if (home.D_DATA.LD4 === true) return menu.followUp({ content: "You can't place this position.", ephemeral: true });
                    }
                    if(check.area === 2) return menu.followUp({ content: `You can't place ${check.name} on this position`, ephemeral: true })

                    // save and replace
                    home.D_DATA.RD4 = true;
                    home.D_DATA.LD4 = true;
                    home.D_DATA.RD4I = check.name;
                    await home.save();
                    //rebuild canvas sort 4-1
                    await replaceHouse(client, interaction, ctx, home, check)
                    
                    const build = new AttachmentBuilder(await canvas.encode("png"), { name: `${item}_${side}.png` })

                    await interaction.editReply({ embeds: [], components: [], files: [build], ephemeral: true }).then(async (message) => {
                        await saveLD4(interaction, id,  message, check, item);
                    });
                    collector.stop();
                }
            }
        } else if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "la_one") {
                editFurnitureAL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lb_two") {
                editFurnitureBL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "lc_three") {
                editFurnitureCL(client, interaction,  item, type, id, side);
                collector.stop();
            } else if (menu.customId === "ld_four") {
                //
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [] });
        }
    });

   return;
}


module.exports = { editFurnitureAR, editFurnitureBR, editFurnitureCR, editFurnitureDR, editFurnitureAL, editFurnitureBL, editFurnitureCL, editFurnitureDL };