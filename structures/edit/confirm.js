const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const GInv = require("../../settings/models/inventory.js");
const GHouse = require("../../settings/models/house.js");
const HInv = require("../../settings/models/houseinv.js");

const saveLA1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_la1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_la1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 500000 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_la1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();



                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);
                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_la1") {
                if(check.area === 2) {
                    home.A_DATA.LA1 = false
                    home.A_DATA.RA1 = false
                    home.A_DATA.LA1I = "";
                    /// save A3
                    home.A_DATA.LA2 = false
                    home.A_DATA.RA2 = false
                } else if (check.area === 1) {
                    home.A_DATA.LA1 = false
                    home.A_DATA.RA1 = false
                    home.A_DATA.LA1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 
                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.LA1 = false
                home.A_DATA.RA1 = false
                home.A_DATA.LA1I = "";
                /// save A3
                home.A_DATA.LA2 = false
                home.A_DATA.RA2 = false
            } else {
                home.A_DATA.LA1 = false
                home.A_DATA.RA1 = false
                home.A_DATA.LA1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLA2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_la2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_la2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_la2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_la2") {
                if(check.area === 2) {
                    home.A_DATA.LA2 = false
                home.A_DATA.RA2 = false
                home.A_DATA.LA2I = "";
                /// save A3
                home.A_DATA.LA3 = false
                home.A_DATA.RA3 = false
            } else {
                home.A_DATA.LA2 = false
                home.A_DATA.RA2 = false
                home.A_DATA.LA2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.LA2 = false
                home.A_DATA.RA2 = false
                home.A_DATA.LA2I = "";
                /// save A3
                home.A_DATA.LA3 = false
                home.A_DATA.RA3 = false
            } else {
                home.A_DATA.LA2 = false
                home.A_DATA.RA2 = false
                home.A_DATA.LA2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLA3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_la3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_la3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_la3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_la3") {
                if(check.area === 2) {
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3I = "";
                    // save A4
                    home.A_DATA.LA4 = false
                    home.A_DATA.RA4 = false
                } else {
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.LA3 = false
                home.A_DATA.RA3 = false
                home.A_DATA.LA3I = "";
                // save A4
                home.A_DATA.LA4 = false
                home.A_DATA.RA4 = false
            } else {
                home.A_DATA.LA3 = false
                home.A_DATA.RA3 = false
                home.A_DATA.LA3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLA4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_la4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_la4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_la4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_la4") {
                home.A_DATA.LA4 = false;
                home.A_DATA.RA4 = false;
                home.A_DATA.LA4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.A_DATA.LA4 = false;
            home.A_DATA.RA4 = false;
            home.A_DATA.LA4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLB1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lb1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lb1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lb1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_lb1") {
                if(check.area === 2) {
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1I = "";
                    /// save A3
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                } else {
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.LB1 = false
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1I = "";
                    /// save A3
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                } else {
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLB2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lb2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lb2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lb2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_lb2") {
                if(check.area === 2) {
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2I = "";
                    /// save A3
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                } else {
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2I = "";
                    /// save A3
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                } else {
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLB3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lb3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lb3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lb3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_lb3") {
                if(check.area === 2) {
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3I = "";
                    // save A4
                    home.B_DATA.LB4 = false
                    home.B_DATA.RB4 = false
                } else {
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3I = "";
                    // save A4
                    home.B_DATA.LB4 = false
                    home.B_DATA.RB4 = false
                } else {
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLB4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lb4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lb4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lb4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();

            } else if (menu.customId === "exit_lb4") {
                home.B_DATA.LB4 = false;
                home.B_DATA.RB4 = false;
                home.B_DATA.LB4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.B_DATA.LB4 = false;
            home.B_DATA.RB4 = false;
            home.B_DATA.LB4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLC1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lc1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lc1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lc1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_lc1") {
                if(check.area === 2) {
                    home.C_DATA.LC1 = false
                    home.C_DATA.RC1 = false
                    home.C_DATA.LC1I = "";
                    /// save A3
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2 = false
                } else {
                    home.C_DATA.LC1 = false
                    home.C_DATA.RC1 = false
                    home.C_DATA.LC1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.LC1 = false
                home.C_DATA.RC1 = false
                home.C_DATA.LC1I = "";
                /// save A3
                home.C_DATA.LC2 = false
                home.C_DATA.RC2 = false
            } else {
                home.C_DATA.LC1 = false
                home.C_DATA.RC1 = false
                home.C_DATA.LC1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLC2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lc2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lc2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lc2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_lc2") {
                if(check.area === 2) {
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2I = "";
                    /// save A3
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3 = false
                } else {
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.LC2 = false
                home.C_DATA.RC2 = false
                home.C_DATA.LC2I = "";
                /// save A3
                home.C_DATA.LC3 = false
                home.C_DATA.RC3 = false
            } else {
                home.C_DATA.LC2 = false
                home.C_DATA.RC2 = false
                home.C_DATA.LC2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLC3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lc3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lc3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lc3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_lc3") {
                if(check.area === 2) {
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3I = "";
                    // save A4
                    home.C_DATA.LC4 = false
                    home.C_DATA.RC4 = false
                } else {
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.LC3 = false
                home.C_DATA.RC3 = false
                home.C_DATA.LC3I = "";
                // save A4
                home.C_DATA.LC4 = false
                home.C_DATA.RC4 = false
            } else {
                home.C_DATA.LC3 = false
                home.C_DATA.RC3 = false
                home.C_DATA.LC3I = "";
                home.C_DATA.LC3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLC4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_lc4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_lc4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_lc4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_lc4") {
                home.C_DATA.LC4 = false;
                home.C_DATA.RC4 = false;
                home.C_DATA.LC4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.C_DATA.LC4 = false;
            home.C_DATA.RC4 = false;
            home.C_DATA.LC4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLD1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ld1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ld1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ld1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ld1") {
                if(check.area === 2) {
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1I = "";
                    /// save A3
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                } else {
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.LD1 = false
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1I = "";
                    /// save A3
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                } else {
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLD2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ld2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ld2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ld2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ld2") {
                if(check.area === 2) {
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2I = "";
                    /// save A3
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                } else {
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2I = "";
                    /// save A3
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                } else {
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLD3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ld3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ld3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ld3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ld3") {
                if(check.area === 2) {
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3I = "";
                    // save A4
                    home.D_DATA.LD4 = false
                    home.D_DATA.RD4 = false
                } else {
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.LD3 = false;
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3I = "";
                    // save A4
                    home.D_DATA.LD4 = false
                    home.D_DATA.RD4 = false
                } else {
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveLD4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ld4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ld4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ld4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ld4") {
                home.D_DATA.LD4 = false;
                home.D_DATA.RD4 = false;
                home.D_DATA.LD4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.D_DATA.LD4 = false;
            home.D_DATA.RD4 = false;
            home.D_DATA.LD4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;

    
};
const saveRA1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ra1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ra1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ra1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                
                
                /// save link
                home.house = message.attachments.first().url; // attachments.first().url มาจาก 
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ra1") {
                if(check.area === 2) {
                    home.A_DATA.RA1 = false
                    home.A_DATA.LA1 = false
                    home.A_DATA.RA1I = "";
                    /// save A3
                    home.A_DATA.RA2 = false
                    home.A_DATA.LA2 = false
                } else {
                    home.A_DATA.RA1 = false
                    home.A_DATA.LA1 = false
                    home.A_DATA.RA1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.RA1 = false
                home.A_DATA.LA1 = false
                home.A_DATA.RA1I = "";
                /// save A3
                home.A_DATA.RA2 = false
                home.A_DATA.LA2 = false
            } else {
                home.A_DATA.RA1 = false
                home.A_DATA.LA1 = false
                home.A_DATA.RA1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRA2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ra2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ra2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ra2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ra2") {
                if(check.area === 2) {
                    home.A_DATA.RA2 = false
                    home.A_DATA.LA2 = false
                    home.A_DATA.RA2I = "";
                    /// save A3
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                } else {
                    home.A_DATA.RA2 = false
                    home.A_DATA.LA2 = false
                    home.A_DATA.RA2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.RA2 = false
                home.A_DATA.LA2 = false
                home.A_DATA.RA2I = "";
                /// save A3
                home.A_DATA.RA3 = false
                home.A_DATA.LA3 = false
            } else {
                home.A_DATA.RA2 = false
                home.A_DATA.LA2 = false
                home.A_DATA.RA2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRA3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ra3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ra3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ra3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ra3") {
                if(check.area === 2) {
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3I = "";
                    // save A4
                    home.A_DATA.RA4 = false
                    home.A_DATA.LA4 = false
                } else {
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3I = "";
                    // save A4
                    home.A_DATA.RA4 = false
                    home.A_DATA.LA4 = false
                } else {
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                    home.A_DATA.RA3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRA4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_ra4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_ra4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ra4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ra4") {
                home.A_DATA.RA4 = false;
                home.A_DATA.LA4 = false;
                home.A_DATA.RA4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.A_DATA.RA4 = false;
                home.A_DATA.LA4 = false;
                home.A_DATA.RA4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRB1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rb1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rb1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rb1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rb1") {
                if(check.area === 2) {
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1I = "";
                    /// save A3
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2 = false
                } else {
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.RB1 = false
                    home.B_DATA.LB1 = false
                    home.B_DATA.RB1I = "";
                    /// save A3
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2 = false
                } else {
                    home.B_DATA.RB1 = false
                    home.B_DATA.LB1= false
                    home.B_DATA.RB1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRB2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rb2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rb2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rb2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rb2") {
                if(check.area === 2) {
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2I = "";
                    /// save A3
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3 = false
                } else {
                    home.B_DATA.RB2 = false
                    home.B_DATA.LB2 = false
                    home.B_DATA.RB2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.RB2 = false
                home.B_DATA.LB2 = false
                home.B_DATA.RB2I = "";
                /// save A3
                home.B_DATA.RB3 = false
                home.B_DATA.LB3 = false
            } else {
                home.B_DATA.RB2 = false
                home.B_DATA.LB2 = false
                home.B_DATA.RB2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRB3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rb3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rb3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rb3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rb3") {
                if(check.area === 2) {
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3I = "";
                    // save A4
                    home.B_DATA.RB4 = false
                    home.B_DATA.LB4 = false
                } else {
                    home.B_DATA.RB3 = false
                    home.B_DATA.LB3 = false
                    home.B_DATA.RB3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.B_DATA.RB3 = false
                home.B_DATA.LB3 = false
                home.B_DATA.RB3I = "";
                // save A4
                home.B_DATA.RB4 = false
                home.B_DATA.LB4 = false
            } else {
                home.B_DATA.RB3 = false
                home.B_DATA.LB3 = false
                home.B_DATA.RB3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRB4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rb4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rb4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rb4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rb4") {
                home.B_DATA.RB4 = false;
                home.B_DATA.LB4 = false;
                home.B_DATA.RB4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.B_DATA.RB4 = false;
            home.B_DATA.LB4 = false;
            home.B_DATA.RB4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRC1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rc1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rc1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rc1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rc1") {
                if(check.area === 2) {
                    home.C_DATA.RC1 = false
                    home.C_DATA.LC1 = false
                    home.C_DATA.RC1I = "";
                    /// save A3
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2 = false
                } else {
                    home.C_DATA.RC1 = false
                    home.C_DATA.LC1 = false
                    home.C_DATA.RC1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.RC1 = false
                home.C_DATA.LC1 = false
                home.C_DATA.RC1I = "";
                /// save A3
                home.C_DATA.RC2 = false
                home.C_DATA.LC2 = false
            } else {
                home.C_DATA.RC1 = false
                home.C_DATA.LC1 = false
                home.C_DATA.RC1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRC2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rc2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rc2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rc2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rc2") {
                if(check.area === 2) {
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2I = "";
                    /// save A3
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                } else {
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.RC2 = false
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2I = "";
                    /// save A3
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                } else {
                    home.C_DATA.RC2 = false
                    home.C_DATA.LC2 = false
                    home.C_DATA.RC2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRC3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rc3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rc3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rc3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rc3") {
                if(check.area === 2) {
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3I = "";
                    // save A4
                    home.C_DATA.LC4 = false
                    home.C_DATA.RC4 = false
                } else {
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3I = "";
                    // save A4
                    home.C_DATA.LC4 = false
                    home.C_DATA.RC4 = false
                } else {
                    home.C_DATA.RC3 = false
                    home.C_DATA.LC3 = false
                    home.C_DATA.RC3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRC4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rc4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rc4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rc4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rc4") {
                home.C_DATA.RC4 = false;
                home.C_DATA.LC4 = false;
                home.C_DATA.RC4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.C_DATA.RC4 = false;
                home.C_DATA.LC4 = false;
                home.C_DATA.RC4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRD1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rd1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rd1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rd1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rd1") {
                if(check.area === 2) {
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1I = "";
                    /// save A3
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2 = false
                } else {
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.RD1 = false
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1I = "";
                    /// save A3
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2 = false
                } else {
                    home.D_DATA.RD1 = false
                    home.D_DATA.LD1 = false
                    home.D_DATA.RD1I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRD2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rd2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rd2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rd2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rd2") {
                if(check.area === 2) {
                    home.D_DATA.RD2 = false
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2I = "";
                    /// save A3
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3 = false
                } else {
                    home.D_DATA.LD2 = false
                    home.D_DATA.RD2 = false
                    home.D_DATA.RD2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.RD2 = false
                home.D_DATA.LD2 = false
                home.D_DATA.RD2I = "";
                /// save A3
                home.D_DATA.LD3 = false
                home.D_DATA.RD3 = false
            } else {
                home.D_DATA.LD2 = false
                home.D_DATA.RD2 = false
                home.D_DATA.RD2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRD3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rd3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rd3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rd3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rd3") {
                if(check.area === 2) {
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3I = "";
                    // save A4
                    home.D_DATA.RD4 = false
                    home.D_DATA.LD4 = false
                } else {
                    home.D_DATA.RD3 = false
                    home.D_DATA.LD3 = false
                    home.D_DATA.RD3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.D_DATA.RD3 = false
                home.D_DATA.LD3 = false
                home.D_DATA.RD3I = "";
                // save A4
                home.D_DATA.RD4 = false
                home.D_DATA.LD4 = false
            } else {
                home.D_DATA.RD3 = false
                home.D_DATA.LD3 = false
                home.D_DATA.RD3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveRD4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_rd4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_rd4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_rd4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                hinv.furniture_left.splice(hinv.furniture_left.findIndex(x => x.name === item), 1); 
                hinv.furniture_right.splice(hinv.furniture_right.findIndex(x => x.name === item), 1); 
                hinv.save();
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_rd4") {
                home.D_DATA.RD4 = false;
                home.D_DATA.LD4 = false;
                home.D_DATA.RD4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.D_DATA.RD4 = false;
                home.D_DATA.LD4 = false;
                home.D_DATA.RD4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;

    
};

const saveL1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_l1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_l1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_l1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_l1") {
                if(check.area === 2) {
                    home.WALL_DATA.L2 = false
                    home.WALL_DATA.L2I = "";
                    /// save A3
                    home.WALL_DATA.L3 = false
                } else {
                    home.WALL_DATA.L2 = false
                    home.WALL_DATA.L2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.L2 = false
                home.WALL_DATA.L2I = "";
                /// save A3
                home.WALL_DATA.L3 = false
            } else {
                home.WALL_DATA.L2 = false
                home.WALL_DATA.L2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveL2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_l2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_l2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_l2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                
                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_l2") {
                if(check.area === 2) {
                    home.WALL_DATA.L2 = false
                    home.WALL_DATA.L2I = "";
                    /// save A3
                    home.WALL_DATA.L3 = false
                } else {
                    home.WALL_DATA.L2 = false
                    home.WALL_DATA.L2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.L2 = false
                home.WALL_DATA.L2I = "";
                /// save A3
                home.WALL_DATA.L3 = false
            } else {
                home.WALL_DATA.L2 = false
                home.WALL_DATA.L2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveL3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_l3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_l3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_l3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_l3") {
                if(check.area === 2) {
                    home.WALL_DATA.L3 = false
                    home.WALL_DATA.L3I = "";
                    // save A4
                    home.WALL_DATA.L4 = false
                } else {
                    home.WALL_DATA.L3 = false
                    home.WALL_DATA.L3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.L3 = false
                home.WALL_DATA.L3I = "";
                // save A4
                home.WALL_DATA.L4 = false
            } else {
                home.WALL_DATA.L3 = false
                home.WALL_DATA.L3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveL4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_l4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_l4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_l4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();


                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_l4") {
                home.WALL_DATA.L4 = false;
                home.WALL_DATA.L4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.WALL_DATA.L4 = false;
            home.WALL_DATA.L4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveR1 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_r1")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_r1")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_r1") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();


                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_r1") {
                if(check.area === 2) {
                    home.WALL_DATA.R2 = false
                    home.WALL_DATA.R2I = "";
                    /// save A3
                    home.WALL_DATA.R3 = false
                } else {
                    home.WALL_DATA.R2 = false
                    home.WALL_DATA.R2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.R2 = false
                home.WALL_DATA.R2I = "";
                /// save A3
                home.WALL_DATA.R3 = false
            } else {
                home.WALL_DATA.R2 = false
                home.WALL_DATA.R2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveR2 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_r2")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_r2")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_r2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_r2") {
                if(check.area === 2) {
                    home.WALL_DATA.R2 = false
                    home.WALL_DATA.R2I = "";
                    /// save A3
                    home.WALL_DATA.R3 = false
                } else {
                    home.WALL_DATA.R2 = false
                    home.WALL_DATA.R2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.R2 = false
                home.WALL_DATA.R2I = "";
                /// save A3
                home.WALL_DATA.R3 = false
            } else {
                home.WALL_DATA.R2 = false
                home.WALL_DATA.R2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveR3 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_r3")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_r3")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_r3") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_r3") {
                if(check.area === 2) {
                    home.WALL_DATA.R3 = false
                    home.WALL_DATA.R3I = "";
                    // save A4
                    home.WALL_DATA.R4 = false
                } else {
                    home.WALL_DATA.R3 = false
                    home.WALL_DATA.R3I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.WALL_DATA.R3 = false
                home.WALL_DATA.R3I = "";
                // save A4
                home.WALL_DATA.R4 = false
            } else {
                home.WALL_DATA.R3 = false
                home.WALL_DATA.R3I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveR4 = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_r4")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_r4")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_r4") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();


                /// save link
                home.house = message.attachments.first().url;
                home.save();

                hinv.wall_left.splice(hinv.wall_left.findIndex(x => x.name === item), 1); 
                hinv.wall_right.splice(hinv.wall_right.findIndex(x => x.name === item), 1); 
                hinv.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_r4") {
                home.WALL_DATA.R4 = false;
                home.WALL_DATA.R4I = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.WALL_DATA.R4 = false;
            home.WALL_DATA.R4I = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveFLOOR = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_floor")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_floor")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_floor") {
                /// remove item
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();
                
                // save link
                home.house = message.attachments.first().url;
                home.save();

                

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_floor") {
                // place floor
                home.FLOOR_DATA.FLOOR = false;
                home.FLOOR_DATA.FLOORI = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.FLOOR_DATA.FLOOR = false;
            home.FLOOR_DATA.FLOORI = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const saveTILE = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("save_tile")
            .setLabel("Save")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("exit_tile")
            .setLabel("Exit")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_tile") {
                /// remove item
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();
                
                // save link
                home.house = message.attachments.first().url;
                home.save();

                

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_tile") {
                // place floor
                home.TILE_DATA.TILE = false;
                home.TILE_DATA.TILEI = "";
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            home.TILE_DATA.TILE = false;
            home.TILE_DATA.TILEI = "";
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

const chack_fish = async function (interaction, id,  message, check, item, pendingEditHouseCommands) {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("sell")
            .setLabel("ขาย")
            
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId("keep")
            .setLabel("เก็บไว้")
            .setStyle(ButtonStyle.Danger),
    )

    await interaction.editReply({ content: "Save or Exit?", components: [button], ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

    const home = await GHouse.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
    const hinv = await HInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    collector.on('collect', async (menu) => {
        if(menu.isButton()) {
            await menu.deferUpdate();
            if(menu.customId === "save_ra2") {
                inv.item.splice(inv.item.findIndex(x => x.name === item), 1); 
                inv.save();

                /// save link
                home.house = message.attachments.first().url;
                home.save();

                interaction.editReply({ content: "House has saved.", files: [], components: [] , ephemeral: true})
                await interaction.client.questEdit(interaction);

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            } else if (menu.customId === "exit_ra2") {
                if(check.area === 2) {
                    home.A_DATA.RA2 = false
                    home.A_DATA.LA2 = false
                    home.A_DATA.RA2I = "";
                    /// save A3
                    home.A_DATA.RA3 = false
                    home.A_DATA.LA3 = false
                } else {
                    home.A_DATA.RA2 = false
                    home.A_DATA.LA2 = false
                    home.A_DATA.RA2I = "";
                }
                await home.save();

                interaction.editReply({ content: "Your cancel edit the house.", files: [], components: [], ephemeral: true}) 

                delete pendingEditHouseCommands[interaction.user.id];
                collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            if(check.area === 2) {
                home.A_DATA.RA2 = false
                home.A_DATA.LA2 = false
                home.A_DATA.RA2I = "";
                /// save A3
                home.A_DATA.RA3 = false
                home.A_DATA.LA3 = false
            } else {
                home.A_DATA.RA2 = false
                home.A_DATA.LA2 = false
                home.A_DATA.RA2I = "";
            }
            await home.save();

            interaction.editReply({ content: "Time is out. Auto cancel edit.", files: [], components: [], ephemeral: true })
        }
    });

    return;
};

module.exports = { saveFLOOR, 
    saveLA1, saveLA2, saveLA3, saveLA4, 
    saveLB1, saveLB2, saveLB3, saveLB4, 
    saveLC1, saveLC2, saveLC3, saveLC4, 
    saveLD1, saveLD2, saveLD3, saveLD4,
    saveRA1, saveRA2, saveRA3, saveRA4, 
    saveRB1, saveRB2, saveRB3, saveRB4, 
    saveRC1, saveRC2, saveRC3, saveRC4, 
    saveRD1, saveRD2, saveRD3, saveRD4,  
    saveL1, saveL2, saveL3, saveL4, 
    saveR1, saveR2, saveR3, saveR4, saveTILE, chack_fish };