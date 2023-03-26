const Member = require('../../settings/models/profile.js');
const CradProfile = require('../../settings/models/cradprofile.js');
const Topup = require('../../settings/models/topup_data.js');
const { EmbedBuilder, ActionRowBuilder , StringSelectMenuBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const pendingLeaderboard = {};

module.exports = { 
    name: ["leaderboard"],
    description: "เช็คอันดับของคุณเเละคนอื่นๆ",
    run: async (client, interaction) => {
        await interaction.reply({ content: "กำลังโหลดข้อมูล...", embeds: [], components: []})

        if (pendingLeaderboard[interaction.user.id]) {
            return interaction.editReply({ content: "You already have a leaderboard open.", embeds: [], components: []  });
        }


        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("*Top Leaderboard Select*")
    
        const select = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("topselect")
                    .setPlaceholder("Top Leaderboard Select")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                        {
                            label: "money",
                            description: "Top Money",
                            value: "money"
                        },
                        {
                            label: "level",
                            description: "Top Level",
                            value: "level"
                        },
                        {
                            label: "like",
                            description: "Top Like",
                            value: "like"
                        },
                        {
                            label: "donate",
                            description: "Top Donate",
                            value: "donate"
                        },
                        {
                            label: "fish",
                            description: "Top Fish",
                            value: "fish"
                        },
                        {
                            label: "mine",
                            description: "Top Mine",
                            value: "mine"
                        },
                        {
                            label: "typing",
                            description: "Top Typing",
                            value: "typing"
                        },
                        {
                            label: "battled win",
                            description: "Top Battle Win",
                            value: "battledwin"
                        },
                    ])
                    
                ])

                // ถูกใจ โดเนท ตีมอน ตกปลา เลเวลavatar เลเวลการพิมพ์ การประลอง

                const button_money = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_money")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_money")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_level = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("global_level")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_like = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_like")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_like")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_donate = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_donate")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_donate")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),

                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_fish = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_fish")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_fish")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_typing = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_typing")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_typing")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

                const button_battledwin = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                    .setCustomId("guild_battledwin")
                    .setLabel("Guild")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("global_battledwin")
                    .setLabel("Global")
                    .setStyle(ButtonStyle.Secondary),
                    // exit
                    new ButtonBuilder()
                    .setCustomId("exit")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Danger)
                ])

    
        await interaction.editReply({ content: " ", embeds: [embed], components: [select] });

        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
    
        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                if(menu.customId === "topselect") {
                    let [ directory ] = menu.values;

                    if (directory === "money") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                        const args = undefined;
                        const user = await Member.find({ guild: interaction.guild.id });

                        button_money.components[0].setDisabled(true);
                        button_money.components[1].setDisabled(false);
        
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;

                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
            
                        /// Sort by Money
                        user.sort((a, b) => {
                            return b.money + b.bank - (a.money + a.bank);
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${client.users.cache.get(fetch.id)} ${numberWithCommas(e.money + e.bank)} <a:844525261973618698:1022032206480277574>\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับเงิน")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? 'No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});
            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_money] });
                        }
                    } else if (directory === "level") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                        const args = undefined;

                        //disable button true 
                        button_level.components[0].setDisabled(true);
                        button_level.components[1].setDisabled(false);
    
                        const globalUser = await CradProfile.find({});
            
                        let pagesNum = Math.ceil(globalUser.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        let globalUserStrings = [];
                        /// Sort by Level
                        globalUser.sort((a, b) => {
                            return b.level - a.level;
                        });

                        globalUser.forEach((e, i) => {
                        globalUserStrings.push(`**${i + 1}.** ${client.users.cache.get(e.user)} ${e.level} <a:844525261973618698:1022032206480277574>\n`);
                        });
                        
                        const globalAuthorIndex = globalUser.findIndex((u) => u.user === interaction.member.user.id); // 
                        const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
            
                        /// Sort by Money
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับเลเวล")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_level] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_level] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_level] });
                        }
                    } else if (directory === "fish") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                        // waiting
                        const args = undefined;

                        button_fish.components[0].setDisabled(true);
                        button_fish.components[1].setDisabled(false);
    
                        const user = await Member.find({ guild: interaction.guild.id });
            
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
            
                        /// Sort by Battle Win
                        user.sort((a, b) => {
                            return b.fishing - a.fishing;
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${fetch} ${e.fishing} <a:844525261973618698:1022032206480277574>\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับการตกปลา")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_fish] });
                        }
                    } else if (directory === "battledwin") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                        const args = undefined;

                        button_battledwin.components[0].setDisabled(true);
                        button_battledwin.components[1].setDisabled(false);
    
                        const user = await Member.find({ guild: interaction.guild.id });
            
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
            
                        /// Sort by Battle Win
                        user.sort((a, b) => {
                            return b.battled_win - a.battled_win;
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${fetch} ${e.battled_win} <a:844525261973618698:1022032206480277574>\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับการชนะการต่อสู้")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_battledwin] });
                        }
                    } else if (directory === "like") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                       //  reputation 
                       const args = undefined;

                        button_like.components[0].setDisabled(true);
                        button_like.components[1].setDisabled(false);
    
                        const user = await Member.find({ guild: interaction.guild.id });
            
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
                        user.sort((a, b) => {
                            return b.reputation - a.reputation;
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${fetch} ${e.reputation} <a:844525261973618698:1022032206480277574>\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับหัวใจ")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});


            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_like] });
                        }
                    } else if (directory === "donate") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;
                        const args = undefined;

                    //disable button true 
                    button_donate.components[0].setDisabled(true);
                    button_donate.components[1].setDisabled(false);

                    const globalUser = await Topup.find({ guild: interaction.guild.id});
        
                    let pagesNum = Math.ceil(globalUser.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    let globalUserStrings = [];
                    globalUser.sort((a, b) => {
                        return b.all - a.all;
                    });
                    globalUser.forEach((e, i) => {
                      const fetch = client.users.cache.get(e.user);
                        if (fetch) {
                            globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.all} <a:844525261973618698:1022032206480277574>\n`);
                        }
                    });
                    
                    const globalAuthorIndex = globalUser.findIndex((u) => u.user === interaction.member.user.id); // 
                    const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
        
                    /// Sort by Money
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการเติมเงิน")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_donate] });
                    }
                    } else if (directory === "typing") {
                        await menu.deferUpdate();
                        pendingLeaderboard[interaction.user.id] = true;

                        const args = undefined;

                        button_typing.components[0].setDisabled(true);
                        button_typing.components[1].setDisabled(false);
    
                        const user = await Member.find({ guild: interaction.guild.id });
            
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
            
                        /// Sort by Battle Win
                        user.sort((a, b) => {
                            return b.typeing - a.typeing;
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${fetch} ${e.typeing} world\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับการคุยกับบอท")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_typing] });
                        }
                    } 
                }
            } else if (menu.isButton()) {
                if (menu.customId === "guild_money") {
                    await menu.deferUpdate();
                    const args = undefined;

                    button_money.components[0].setDisabled(true);
                    button_money.components[1].setDisabled(false);

                    const user = await Member.find({ guild: interaction.guild.id });
        
                    let pagesNum = Math.ceil(user.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                    const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
        
                    /// Sort by Money
                    user.sort((a, b) => {
                        return b.money + b.bank - (a.money + a.bank);
                    });
        
                    const userStrings = [];
                    for (let i = 0; i < user.length; i++) {
                        const e = user[i];
                        const fetch = await client.users.fetch(e.user);
                        userStrings.push(`**${i + 1}.** ${client.users.cache.get(fetch.id)} ${numberWithCommas(e.money + e.bank)} <a:844525261973618698:1022032206480277574>\n`);
                    }
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = userStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("Guild: <a:839868606296752168:1022032049370042399> อันดับเงิน")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_money] });
                    }
                } else if (menu.customId === "global_money") {
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_money.components[1].setDisabled(true);
                    button_money.components[0].setDisabled(false);

                    const globalUser = await Member.find({});
                    
                    let userTopupMap = {};
                    globalUser.forEach((e) => {
                        if (userTopupMap[e.user]) {
                            userTopupMap[e.user].money += e.money;
                            userTopupMap[e.user].bank += e.bank;
                        } else {
                            userTopupMap[e.user] = { money: e.money, bank: e.bank };
                        }
                    }) 
                     // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                     let globalUserArray = [];
                     Object.keys(userTopupMap).forEach((userID) => {
                         globalUserArray.push({ user: userID, money: userTopupMap[userID].money, bank: userTopupMap[userID].bank });
                     });
                     
                     let pagesNum = Math.ceil(globalUserArray.length / 10);
                     if (pagesNum === 0) pagesNum = 1;
                     
                     let globalUserStrings = [];
                     globalUserArray.sort((a, b) => {
                         return b.money + b.bank - (a.money + a.bank);
                     });
                     globalUserArray.forEach((e, i) => {
                         const fetch = client.users.cache.get(e.user);
                         if (fetch) {
                             globalUserStrings.push(`**${i + 1}.** ${fetch} ${numberWithCommas(e.money + e.bank)} <a:844525261973618698:1022032206480277574>\n`);
                         }
                     });
                    
                    
                    
                     const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                     const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
                    /// Sort by Money
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("Global: <a:839868606296752168:1022032049370042399> อันดับเงิน")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_money] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_money] });
                    }
                } else if (menu.customId === "exit") {
                    await menu.deferUpdate();
                    const embed = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | ปิดเมนูเเล้ว`)
                    delete pendingLeaderboard[interaction.user.id]
                    interaction.editReply({ embeds: [embed], components: [] });
                    // delay and delete
                    setTimeout(() => {
                        interaction.deleteReply();
                    }
                    , 5000);
                    collector.stop();
                } else if (menu.customId === "guild_fish") {
                    await menu.deferUpdate();
                    const args = undefined;

                    button_fish.components[0].setDisabled(true);
                    button_fish.components[1].setDisabled(false);

                    const user = await Member.find({ guild: interaction.guild.id });
        
                    let pagesNum = Math.ceil(user.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                    const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
        
                    /// Sort by Battle Win
                    user.sort((a, b) => {
                        return b.fishing - a.fishing;
                    });
        
                    const userStrings = [];
                    for (let i = 0; i < user.length; i++) {
                        const e = user[i];
                        const fetch = await client.users.fetch(e.user);
                        userStrings.push(`**${i + 1}.** ${fetch} ${e.fishing} <a:844525261973618698:1022032206480277574>\n`);
                    }
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = userStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการตกปลา")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_fish] });
                    }
                } else if (menu.customId === "guild_battledwin") {
                    await menu.deferUpdate();
                    const args = undefined;

                    button_battledwin.components[0].setDisabled(true);
                    button_battledwin.components[1].setDisabled(false);

                    const user = await Member.find({ guild: interaction.guild.id });
        
                    let pagesNum = Math.ceil(user.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                    const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
        
                    /// Sort by Battle Win
                    user.sort((a, b) => {
                        return b.battled_win - a.battled_win;
                    });
        
                    const userStrings = [];
                    for (let i = 0; i < user.length; i++) {
                        const e = user[i];
                        const fetch = await client.users.fetch(e.user);
                        userStrings.push(`**${i + 1}.** ${fetch} ${e.battled_win} <a:844525261973618698:1022032206480277574>\n`);
                    }
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = userStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการชนะการต่อสู้")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_battledwin] });
                    }
                } else if (menu.customId === "guild_like") {
                    await menu.deferUpdate();
                    const args = undefined;

                    button_like.components[0].setDisabled(true);
                    button_like.components[1].setDisabled(false);
    
                        const user = await Member.find({ guild: interaction.guild.id });
            
                        let pagesNum = Math.ceil(user.length / 10);
                        if(pagesNum === 0) pagesNum = 1;
    
                        const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                        const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";

                        user.sort((a, b) => {
                            return b.reputation - a.reputation;
                        });
            
                        const userStrings = [];
                        for (let i = 0; i < user.length; i++) {
                            const e = user[i];
                            const fetch = await client.users.fetch(e.user);
                            userStrings.push(`**${i + 1}.** ${fetch} ${e.reputation} <a:844525261973618698:1022032206480277574>\n`);
                        }
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = userStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับหัวใจ")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

            
                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_like] });
                        }
                } else if (menu.customId === "guild_typing") {
                    await menu.deferUpdate();
                    const args = undefined;

                    button_typing.components[0].setDisabled(true);
                    button_typing.components[1].setDisabled(false);

                    const user = await Member.find({ guild: interaction.guild.id });
        
                    let pagesNum = Math.ceil(user.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    const authorIndex = user.findIndex((u) => u.user === interaction.member.user.id);
                    const authorRank = authorIndex !== -1 ? authorIndex + 1 : "N/A";
        
                    /// Sort by Battle Win
                    user.sort((a, b) => {
                        return b.typeing - a.typeing;
                    });
        
                    const userStrings = [];
                    for (let i = 0; i < user.length; i++) {
                        const e = user[i];
                        const fetch = await client.users.fetch(e.user);
                        userStrings.push(`**${i + 1}.** ${fetch} ${e.typeing} world\n`);
                    }
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = userStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการคุยกับบอท")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${user.length} • คนที่ติดอันดับ | อันดับของคุณ: ${authorRank}`});

        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && user.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_typing] });
                    }
                } else if (menu.customId === "guild_donate") {
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_donate.components[0].setDisabled(true);
                    button_donate.components[1].setDisabled(false);

                    const globalUser = await Topup.find({ guild: interaction.guild.id});
        
                    let pagesNum = Math.ceil(globalUser.length / 10);
                    if(pagesNum === 0) pagesNum = 1;

                    let globalUserStrings = [];
                    globalUser.sort((a, b) => {
                        return b.all - a.all;
                    });
                    globalUser.forEach((e, i) => {
                      const fetch = client.users.cache.get(e.user);
                        if (fetch) {
                            globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.all} <a:844525261973618698:1022032206480277574>\n`);
                        }
                    });
                    
                    const globalAuthorIndex = globalUser.findIndex((u) => u.user === interaction.member.user.id); // 
                    const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
        
                    /// Sort by Money
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการเติมเงิน")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_donate] });
                    }
                } else if (menu.customId === "global_fish") {
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_fish.components[0].setDisabled(false);
                    button_fish.components[1].setDisabled(true);

                    const globalUser = await Topup.find({});     
                                         
                    let userTopupMap = {};
                    globalUser.forEach((e) => {
                        if (userTopupMap[e.user]) {
                            userTopupMap[e.user] += e.fishing;
                        } else {
                            userTopupMap[e.user] = e.fishing;
                        }
                    }) 
                     // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                     let globalUserArray = [];
                     Object.keys(userTopupMap).forEach((userID) => {
                         globalUserArray.push({ user: userID, fishing: userTopupMap[userID] });
                     });
                     
                     let pagesNum = Math.ceil(globalUserArray.length / 10);
                     if (pagesNum === 0) pagesNum = 1;
                     
                     let globalUserStrings = [];
                     globalUserArray.sort((a, b) => {
                         return b.fishing - a.fishing;
                     });
                     globalUserArray.forEach((e, i) => {
                         const fetch = client.users.cache.get(e.user);
                         if (fetch) {
                             globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.fishing} <a:844525261973618698:1022032206480277574>\n`);
                         }
                     });


                     const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                     const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";

                     /// Sort by Money
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการตกปลา")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_fish] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_fish] });
                    }

                } else if (menu.customId === "global_donate") {
                    
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_donate.components[0].setDisabled(false);
                    button_donate.components[1].setDisabled(true);

                    const globalUser = await Topup.find({});     
                                         
                    let userTopupMap = {};
                    globalUser.forEach((e) => {
                        if (userTopupMap[e.user]) {
                            userTopupMap[e.user] += e.all;
                        } else {
                            userTopupMap[e.user] = e.all;
                        }
                    }) 
                     // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                     let globalUserArray = [];
                     Object.keys(userTopupMap).forEach((userID) => {
                         globalUserArray.push({ user: userID, all: userTopupMap[userID] });
                     });
                     
                     let pagesNum = Math.ceil(globalUserArray.length / 10);
                     if (pagesNum === 0) pagesNum = 1;
                     
                     let globalUserStrings = [];
                     globalUserArray.sort((a, b) => {
                         return b.all - a.all;
                     });
                     globalUserArray.forEach((e, i) => {
                         const fetch = client.users.cache.get(e.user);
                         if (fetch) {
                             globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.all} <a:844525261973618698:1022032206480277574>\n`);
                         }
                     });


                     const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                     const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";

                     /// Sort by Money
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการเติมเงิน")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_donate] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_donate] });
                    }

                } else if (menu.customId === "global_battledwin") {
                    await menu.deferUpdate();
                    const args = undefined;

                        //disable button true 
                        button_battledwin.components[1].setDisabled(true);
                        button_battledwin.components[0].setDisabled(false);
    
                        const globalUser = await Member.find({});
            
                        let userTopupMap = {};
                    globalUser.forEach((e) => {
                        if (userTopupMap[e.user]) {
                            userTopupMap[e.user] += e.battled_win;
                        } else {
                            userTopupMap[e.user] = e.battled_win;
                        }
                    }) 
                     // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                     let globalUserArray = [];
                     Object.keys(userTopupMap).forEach((userID) => {
                         globalUserArray.push({ user: userID, battled_win: userTopupMap[userID] });
                     });
                     
                     let pagesNum = Math.ceil(globalUserArray.length / 10);
                     if (pagesNum === 0) pagesNum = 1;
                     
                     let globalUserStrings = [];
                     globalUserArray.sort((a, b) => {
                         return b.battled_win - a.battled_win;
                     });
                     globalUserArray.forEach((e, i) => {
                         const fetch = client.users.cache.get(e.user);
                         if (fetch) {
                             globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.battled_win} <a:844525261973618698:1022032206480277574>\n`);
                         }
                     });


                     const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                     const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
            
                        /// Sort by Money
            
                        const pages = [];
                        for (let i = 0; i < pagesNum; i++) {
                            const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
            
                            const embed = new EmbedBuilder()
                                .setTitle("<a:839868606296752168:1022032049370042399> อันดับการชนะการต่อสู้")
                                .setColor("#bdc6e9")
                                .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                                .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});

                            pages.push(embed);
                        }
            
                        if (!args) {
                            if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                            else return interaction.editReply({ embeds: [pages[0]], components: [select,button_battledwin] });
                        }
                        else {
                            const embed5 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                            const embed6 = new EmbedBuilder()
                            .setColor("#bdc6e9")
                            .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                            if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                            if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                            const pageNum = args == 0 ? 1 : args - 1;
                            return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_battledwin] });
                        }
                } else if (menu.customId === "global_like") {
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_like.components[1].setDisabled(true);
                    button_like.components[0].setDisabled(false);

                    const globalUser = await Member.find({});
                    
                 let userTopupMap = {};
                 globalUser.forEach((e) => {
                     if (userTopupMap[e.user]) {
                         userTopupMap[e.user] += e.reputation;
                     } else {
                         userTopupMap[e.user] = e.reputation;
                     }
                 }) 
                  // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                  let globalUserArray = [];
                  Object.keys(userTopupMap).forEach((userID) => {
                      globalUserArray.push({ user: userID, reputation: userTopupMap[userID] });
                  });
                  
                  let pagesNum = Math.ceil(globalUserArray.length / 10);
                  if (pagesNum === 0) pagesNum = 1;
                  
                  let globalUserStrings = [];
                  globalUserArray.sort((a, b) => {
                      return b.reputation - a.reputation;
                  });
                  globalUserArray.forEach((e, i) => {
                      const fetch = client.users.cache.get(e.user);
                      if (fetch) {
                          globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.reputation} <a:844525261973618698:1022032206480277574>\n`);
                      }
                  });


                  const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                  const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";
        
                    /// Sort by Money
        
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับหัวใจ")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_like] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_like] });
                    }
                }  else if (menu.customId === "global_typing") {
                    await menu.deferUpdate();
                    const args = undefined;

                    //disable button true 
                    button_typing.components[0].setDisabled(false);
                    button_typing.components[1].setDisabled(true);

                    const globalUser = await Topup.find({});     
                                         
                    let userTopupMap = {};
                    globalUser.forEach((e) => {
                        if (userTopupMap[e.user]) {
                            userTopupMap[e.user] += e.typeing;
                        } else {
                            userTopupMap[e.user] = e.typeing;
                        }
                    }) 
                     // Convert the userTopupMap object to an array of objects with the format { user: userID, all: totalTopup }
                     let globalUserArray = [];
                     Object.keys(userTopupMap).forEach((userID) => {
                         globalUserArray.push({ user: userID, typeing: userTopupMap[userID] });
                     });
                     
                     let pagesNum = Math.ceil(globalUserArray.length / 10);
                     if (pagesNum === 0) pagesNum = 1;
                     
                     let globalUserStrings = [];
                     globalUserArray.sort((a, b) => {
                         return b.typeing - a.typeing;
                     });
                     globalUserArray.forEach((e, i) => {
                         const fetch = client.users.cache.get(e.user);
                         if (fetch) {
                             globalUserStrings.push(`**${i + 1}.** ${fetch} ${e.typeing} world\n`);
                         }
                     });


                     const globalAuthorIndex = globalUserArray.findIndex((u) => u.user === interaction.member.user.id); //
                     const globalAuthorRank = globalAuthorIndex !== -1 ? globalAuthorIndex + 1 : "N/A";

                     /// Sort by Money
                    const pages = [];
                    for (let i = 0; i < pagesNum; i++) {
                        const str = globalUserStrings.slice(i * 10, i * 10 + 10).join('');
        
                        const embed = new EmbedBuilder()
                            .setTitle("<a:839868606296752168:1022032049370042399> อันดับการคุยกับบอท")
                            .setColor("#bdc6e9")
                            .setDescription(`${str == '' ? '  No Users' : '\n' + str }`)
                            .setFooter({ text: `หน้าที่ • ${i + 1}/${pagesNum} | ${globalUser.length} • คนที่ติดอันดับ | อันดับของคุณ: ${globalAuthorRank}`});
        
                        pages.push(embed);
                    }
        
                    if (!args) {
                        if (pages.length == pagesNum && globalUser.length > 10) interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                        else return interaction.editReply({ embeds: [pages[0]], components: [select,button_typing] });
                    }
                    else {
                        const embed5 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | หน้าต้องเป็นตัวเลขเท่านั้น`) 
                        const embed6 = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`<a:907824800192397392:1022032199836512330> | มีหน้าเพียง ${pagesNum} หน้าเท่านั้น`) 
                        if (isNaN(args)) return interaction.editReply({ embeds: [embed5] });
                        if (args > pagesNum) return interaction.editReply({ embeds: [embed6] });
                        const pageNum = args == 0 ? 1 : args - 1;
                        return interaction.editReply({ embeds: [pages[pageNum]], components: [select,button_typing] });
                    }
                } 
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)

                    delete pendingLeaderboard[interaction.user.id]
                    interaction.editReply({ embeds: [timed], components: [] });
            }
        });

        
    }
}

function numberWithCommasx(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas(number) {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'พันล้าน+';
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'ล้าน+';
    } else if (number >= 1000) {
      return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return number.toString();
    }
  }
