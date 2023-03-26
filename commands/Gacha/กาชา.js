const Member = require("../../settings/models/profile.js");
const Ticket = require("../../settings/models/ticket.js");
const GachaInv = require("../../settings/models/gachainventory.js");
const GInv = require("../../settings/models/inventory.js");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, SelectMenuOptionBuilder,ButtonBuilder  } = require("discord.js");
const config = require("../../settings/defaults.js");
const delay = require("delay");
const pendingCapsuleCommands = {};
 // item ย่อยที่เลือก
 const item_random_select = []; 

module.exports = { 
    name: ["gacha"],
    description: "Gacha with your luck.",
    run: async (client, interaction) => {

        await interaction.reply({ content: "Loading..." , embeds: [], components: []})

        const profile = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const ticket = await Ticket.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const gachainv = await GachaInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });
        const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const cooldown = new Date(ticket.gacha_cooldown);
        const time = new Date(cooldown - new Date());
        const time_format = `${time.getUTCHours()} ชั่วโมง, ${time.getUTCMinutes()} นาที ${time.getUTCSeconds()} วิ`;


        if(ticket.gacha_cooldown > Date.now()) {
            const embed_cooldown = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:971824666673020990:1022032761936166942> | รอคูลดาวน์ไอสัส \`${time_format}\``)

            return interaction.editReply({ embeds: [embed_cooldown]});
        }

        if(pendingCapsuleCommands[interaction.user.id]) {
            const embed_pending = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription(`<a:907824800192397392:1022032199836512330> | มีคำสั่งที่ดำเนินการอยู่แล้ว`)
            return interaction.editReply({ embeds: [embed_pending] });
        }

        const resultgacha = [...gachainv.item.reduce( (mp, o) => {
            const key = JSON.stringify([o.name, o.type]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];

        const sGacha = [];

        for (let i = 0; i < resultgacha.length; i++) {
            const type = resultgacha[i].type;
            if (type == "gacha") {
                sGacha.push(`${toOppositeCase(resultgacha[i].name)} (x${resultgacha[i].count})`)
            } 
        }
    
    
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`Gacha Backpack: (${gachainv.item.length}/${profile.gachainventory})`)
            .addFields(
                { name: "Gacha", value: `${(sGacha.join("\n") || "No items!")}`, inline: false },
            )

            const value = Object.values(gachainv.item);
            const object = value.filter(x => x.type === "gacha");

            if(object.length === 0) {
                const embed_noitem = new EmbedBuilder()
                    .setColor("#bdc6e9")
                    .setDescription(`<a:907824800192397392:1022032199836512330> | ไม่มีไอเทม`)  
                return interaction.editReply({ embeds: [embed_noitem] });
            }



        const select_gacha = new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId("gachaselect")
                    .setPlaceholder("Make a selection")
                    .setOptions(object.map(key => {
                        return new SelectMenuOptionBuilder()
                            .setLabel(`${toOppositeCase(key.name)}`)
                            .setValue(key.id)
                        }
                    ))
                ])

        // button cancel   
        const button = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder() 
                    .setCustomId("cancel")
                    .setLabel("Exit") 
                    .setStyle(ButtonStyle.Danger),
            ])
    
        await interaction.editReply({ content: `Selecting an Openable Item • [ ${interaction.user.username}#${interaction.user.discriminator} ]`, embeds: [embed], components: [select_gacha,button], });
    
    
        let filter = (m) => m.user.id === interaction.user.id;
        let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 0 });

        const item_select = [];
        const item_random_get = [];


        const capsule_select = [];


        const pages = [];
    
        collector.on('collect', async (menu) => {
            if(menu.isStringSelectMenu()) {
                // id select menus
                if(menu.customId === "gachaselect") {
                    await menu.deferUpdate();
                    let [ directory ] = menu.values;

                    const item = gachainv.item.find(x => x.id === directory);

                    const item_random = item.item_random

                    // เเสดงชื่อใน array item.item_random ให้หมด 
                    const item_name = item_random.map(x => x.name).join(" ");

                    // เเสดง rarity ที่เป็น legendary ใน array item.item_random ให้หมด 
                    const item_legendary = item_random.filter(x => x.rarity === "legendary")
                    const item_legendary_random = item_legendary[Math.floor(Math.random() * item_legendary.length)];

                    // เเสดง rarity ที่เป็น super_rare ใน array item.item_random ให้หมด 
                    const item_super_rare = item_random.filter(x => x.rarity === "super_rare")
                    const item_super_rare_random = item_super_rare[Math.floor(Math.random() * item_super_rare.length)];

                    // เเสดง rarity ที่เป็น rare ใน array item.item_random ให้หมด 
                    const item_rare = item_random.filter(x => x.rarity === "rare")
                    const item_rare_random = item_rare[Math.floor(Math.random() * item_rare.length)];

                    // เเสดง rarity ที่เป็น uncommon ใน array item.item_random ให้หมด 
                    const item_uncommon = item_random.filter(x => x.rarity === "uncommon")
                    const item_uncommon_random = item_uncommon[Math.floor(Math.random() * item_uncommon.length)];

                    // เเสดง rarity ที่เป็น common ใน array item.item_random ให้หมด 
                    const item_common = item_random.filter(x => x.rarity === "common")
                    const item_common_random = item_common[Math.floor(Math.random() * item_common.length)];


                    // random item ตามลำดับ type หายาก ปานกลาง ง่าย
                    const random_item = item_random[Math.floor(Math.random() * item_random.length)]; // สุ่ม item ใน array item.item_random

                    item_random_get.push(item)
                    item_select.push(random_item);

                    // เเสดง id ของ item ที่เลือก
                    capsule_select.push(directory);

                    // item ย่อย ที่เลือก ///
                    item_random_select.push(item_random);

                    const store = [];

                    for (let i = 0; i < 1; i++) {
                    const getNumber = roll()
                    switch(getNumber[0]) {
                        case 6:
                            store.push(`${item_legendary_random.name}`);
                            // Add Ticket 6 Star
                            inv.item.push({
                                name: item_legendary_random.name,
                                type: item_legendary_random.type,
                                rarity: item_legendary_random.rarity,
                                price: item_legendary_random.price,
                                level: item_legendary_random.level,
                                id: generateID()
                            });
                            break;
                        case 5:
                            store.push(`${item_super_rare_random.name}`);
                            // Add Ticket 5 Star
                            inv.item.push({
                                name: item_super_rare_random.name,
                                type: item_super_rare_random.type,
                                rarity: item_super_rare_random.rarity,
                                price: item_super_rare_random.price,
                                level: item_super_rare_random.level,
                                id: generateID()
                            });
                            break;
                        case 4:
                            store.push(`${item_rare_random.name}`);
                            // Add Ticket 4 Star
                            inv.item.push({
                                name: item_rare_random.name,
                                type: item_rare_random.type,
                                rarity: item_rare_random.rarity,
                                price: item_rare_random.price,
                                level: item_rare_random.level,
                                id: generateID()
                            });
                            break;
                        case 3:
                            store.push(`${item_uncommon_random.name}`);
                            // Add Ticket 4 Star
                            inv.item.push({
                                name: item_uncommon_random.name,
                                type: item_uncommon_random.type,
                                rarity: item_uncommon_random.rarity,
                                price: item_uncommon_random.price,
                                level: item_uncommon_random.level,
                                id: generateID()
                            });
                            break;
                        case 2:
                            store.push(`${item_rare_random.name}`);
                            // Add Ticket 4 Star
                            inv.item.push({
                                name: item_common_random.name,
                                type: item_common_random.type,
                                rarity: item_common_random.rarity,
                                price: item_common_random.price,
                                level: item_common_random.level,
                                id: generateID()
                            });
                            break;
                        }
                    }
                

                    const confirm_cancel = new ActionRowBuilder()
                        .addComponents([
                            new ButtonBuilder() 
                                .setCustomId("confirm") 
                                .setLabel("Confirm")    
                                .setStyle(ButtonStyle.Success), 
                            new ButtonBuilder() 
                                .setCustomId("cancel")
                                .setLabel("Cancel") 
                                .setStyle(ButtonStyle.Danger),
                        ])


                        for (let i = 0; i < 1; i++) {
                        const str = store.slice(i * 3, i * 3 + 3).join(""); // store.slice(i * 3, i * 3 + 3).join(""); 
                
                
                
                        const confirm_s = new EmbedBuilder()
                        .setColor("#bdc6e9")
                        .setDescription(`you got ${str == "" ? " Nothing" : "" + str} from ${item_random_get[0].name}!`)
                            pages.push(confirm_s);
                        }

                    const embed = new EmbedBuilder()
                        .setColor(client.color) 
                        .setTitle(`Are you sure you want to use 1x ${(item.name)} ?`) // toOppositeCase คือ ให้ตัวอักษรเป็นตัวพิมพ์ใหญ่ 
                        .setDescription(`\`\`\`css\n${item_name}\`\`\``)
    
                   // inv.item.splice(inv.item.findIndex(x => x.id === directory), 1);
                   // await inv.save();
                    await interaction.editReply({ content: `Confirming usage of ${(item.name)} • [ ${interaction.user.username}#${interaction.user.discriminator} ] `, embeds: [embed], components: [confirm_cancel] });
                    // add pendingCapsuleCommands to user
                    pendingCapsuleCommands[interaction.user.id] = true;
                    // delete pendingCapsuleCommands now
                   // pendingCapsuleCommands.delete(interaction.user.id);
                }
            } else if(menu.isButton()) {
                if(menu.customId === "cancel") {
                    await menu.deferUpdate();
                    const embed = new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`Canceled!`)
    
                    await interaction.editReply({ embeds: [embed], components: [] });
                    delete item_select;
                    delete item_random_get;
                    delete item_random_select;
                    delete capsule_select;
                    delete pendingCapsuleCommands[interaction.user.id];
                    collector.stop();
                } else if(menu.customId === "confirm") {
                    await menu.deferUpdate();

                    // ลบ item ที่เลือก
                    gachainv.item.splice(gachainv.item.findIndex(x => x.id === capsule_select[0]), 1);

                    await interaction.editReply({ content: ` | Opening ${item_random_get[0].name}...`, embeds: [], components: [] });
                    // delay 3s
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    await interaction.editReply({ content: ` | It's ... ?!`, embeds: [], components: [] });
                    
    
                    await interaction.editReply({ content: `${item_select[0].name} • [ ${interaction.user.username}#${interaction.user.discriminator} ]`, embeds: [pages[0]], components: [] });
                    delete item_select;
                    delete item_random_get;
                    delete item_random_select;
                    delete capsule_select;
                    delete pendingCapsuleCommands[interaction.user.id];
                    await gachainv.save();
                    collector.stop();

                }
            }
        });
    
        collector.on('end', async (collected, reason) => {
            if(reason === 'time') {
                delete pendingCapsuleCommands[interaction.user.id];
                delete item_select;
                delete item_random_get;
                delete item_random_select;
                delete capsule_select;
                const timed = new EmbedBuilder()
                    .setDescription(`Time is Ended!`)
                    .setColor(client.color)
    
                    await interaction.editReply({ embeds: [timed], components: [] });
                    
            }
        });
    
    
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};


function roll() {
    const number = (Math.floor(Math.random() * 1000) + 1) * 0.1 // 0.1 - 100
    if (number <= 1) {
    const random = Math.floor(Math.random() * item_random_select[0].length) // สุ่มตัวเลข 0 - จำนวนตัวที่มีใน array
        return [6, random]
    } else if(number <= 10) {
        const random = Math.floor(Math.random() * item_random_select[0].length)
        return [5, random]
    } else if(number <= 30) {
        const random = Math.floor(Math.random() * item_random_select[0].length)
        return [4, random]
    } else if(number <= 60) {
        const random = Math.floor(Math.random() * item_random_select[0].length)
        return [3, random]
    } else if(number <= 100) {
        const random = Math.floor(Math.random() * item_random_select[0].length)
        return [2, random]
    }
}