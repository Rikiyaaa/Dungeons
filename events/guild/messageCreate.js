const GProfile = require("../../settings/models/profile.js");
const guild = require('../../settings/models/guild.js');
const global_train_normal_db = require("../../settings/models/global_train.js");
const global_train_hate_db = require("../../settings/models/global_train_hate.js");
const global_train_love_db = require("../../settings/models/global_train_love.js");
const guild_db = require("../../settings/models/guild.js");
const train_db = require("../../settings/models/train.js");
const train_hate_db = require("../../settings/models/train_hate.js");
const train_love_db = require("../../settings/models/train_love.js");
const { readdirSync } = require('fs');
const default_fallback = require('../../message_default.json');
const bad_message = require('../../bad_message.json');
const reply_bad_message = require('../../replybad_message.json');
const { EmbedBuilder } = require("discord.js");

module.exports = async(client, message) => {
    if (message.author.bot) return;

    ////////////////////////////normal_db///////////////////////////////
    let global_train_normal = await global_train_normal_db.find({});
    if (global_train_normal_db.length >= 1) client.global_train_normal = global_train_normal;

    ////////////////////////////hate_db/////////////////////////////////////////
    let global_train_hate = await global_train_hate_db.find({});
    if (global_train_hate_db.length >= 1) client.global_train_hate = global_train_hate;


    /////////////////////////////love_db//////////////////////////////////////////
    let global_train_love = await global_train_love_db.find({});
    if (global_train_love_db.length >= 1) client.global_train_love = global_train_love;

    let all_data = await guild_db.find({});
    all_data.forEach(async (data) => {
        client.cache.set(data.guild, data?.talkRoom); // data.guild = guild id, data.talkRoom = channel id

        
    

    let train = await train_db.find({ guild: data.guild });
    if (train.length >= 1) // คือ
    client.train_cache_normal.set(data.guild, train);

    let train_hate = await train_hate_db.find({ guild: data.guild });
    if (train_hate.length >= 1) 
    client.train_cache_hate.set(data.guild, train_hate);

    let train_love = await train_love_db.find({ guild: data.guild });
    if (train_love.length >= 1) 
    client.train_cache_love.set(data.guild, train_love);

});

     const user = await GProfile.findOne({ user: message.author.id, guild: message.guild.id, });

    let talk_room = client.cache.get(message.guild.id);
    if (!talk_room) return;
     if (message.channel.id == talk_room) {
        //ถ้า message.content มีคำวที่อยู่ใน bad_message ให้ลบ
        if (user.nickname_request1 == true) {
            bad_message.forEach((bad) => {
                if (message.content.includes(bad)) {
                    user.bad_message += 0.5;
                    user.happy_message -= 0.5;
                    user.save();
                    if (user.bad_message >= 10) {
                        user.status = 'โกรธ';
                        user.save();
                        message.reply({ content: 'คุณเป็นคนที่ไม่ดีเลยนะ งอลเเล้ว' }).catch(() => { });
                    } else if (user.bad_message < 1) {
                        user.status = 'ปกติ';
                        user.save();
                        message.reply({ content: 'ขอบคุณนะ :))))' }).catch(() => { });
                    } else if (user.happy_message > 100) {
                        user.status = 'รัก';
                        user.save();
                        message.reply({ content: 'ขอบคุณนะ :))))' }).catch(() => { });
                    } else if (user.happy_message < 1) {
                        user.status = 'ปกติ';
                        user.save();
                    }
                } 
            });
        let all_train_normal = client.train_cache_normal.get(message.guild.id);
        let all_train_hate = client.train_cache_hate.get(message.guild.id);
        let all_train_love = client.train_cache_love.get(message.guild.id);
        if (!all_train_normal || all_train_normal.length < 1) {  //bug
            if(user.status == 'ปกติ')  {
             if (!global_train_normal || global_train_normal.length < 1) {
                console.log('สถานะของคุณไม่ใช่ปกติ')
                let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                return message.reply({ content: fallback_get }).catch(() => { });
            };
            let match_global_train_normal = global_train_normal.filter(train => message.content.includes(train.question));
                console.log('สถานะของคุณปกติ')
            if (match_global_train_normal.length >= 1)  message.reply({ content: match_global_train_normal.length == 1 ? match_global_train_normal[0].answer : match_global_train_normal[Math.floor(Math.random() * match_global_train_normal.length)].answer }).catch(() => { });
        } else if(user.status == 'โกรธ') {
            if (!global_train_hate || global_train_hate.length < 1) {
                console.log('สถานะของคุณไม่ใช่โกรธ')
                let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                return message.reply({ content: fallback_get }).catch(() => { });
            };
            let match_global_train_hate = global_train_hate.filter(train => message.content.includes(train.question));
                console.log('สถานะของคุณโกรธ')
            if (match_global_train_hate.length >= 1)  message.reply({ content: match_global_train_hate.length == 1 ? match_global_train_hate[0].answer : match_global_train_hate[Math.floor(Math.random() * match_global_train_hate.length)].answer }).catch(() => { });
        } else if(user.status == 'รัก') {
            if (!global_train_love || global_train_love.length < 1) {
                console.log('สถานะของคุณไม่ใช่รัก')
                let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                return message.reply({ content: fallback_get }).catch(() => { });
            };
            let match_global_train_love = global_train_love.filter(train => message.content.includes(train.question));
                console.log('สถานะของคุณรัก')
            if (match_global_train_love.length >= 1)  message.reply({ content: match_global_train_love.length == 1 ? match_global_train_love[0].answer : match_global_train_love[Math.floor(Math.random() * match_global_train_love.length)].answer }).catch(() => { });
        }
        } else {
            if (user.status == 'ปกติ') {
                if (!all_train_normal) {
                    if (!global_train_normal) {
                    console.log('No global train data');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                      message.reply({ content: fallback_get }).catch(() => { });
                    };
    
                    console.log('Global train data working 2');
                    let match_global_train_normal = global_train_normal.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                    if (match_global_train_normal.length >= 1)  message.reply({ content: match_global_train_normal.length == 1 ? match_global_train_normal[0].answer : match_global_train_normal[Math.floor(Math.random() * match_global_train_normal.length)].answer }).catch(() => { });
                    else {
                        console.log('fallback_get working 2');
                        let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                         message.reply({ content: fallback_get }).catch(() => { });
                    };
                }
            let match_train_normal = all_train_normal.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน train
            if (match_train_normal.length >= 1)   message.reply({ content: match_train_normal.length == 1 ? match_train_normal[0].answer : match_train_normal[Math.floor(Math.random() * match_train_normal.length)].answer }).catch(() => { });
            else {
                if (!global_train_normal) {
                    console.log('No global train data');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                      message.reply({ content: fallback_get }).catch(() => { });
                };
                console.log('Global train data working 2');
                let match_global_train_normal = global_train_normal.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                if (match_global_train_normal.length >= 1)  message.reply({ content: match_global_train_normal.length == 1 ? match_global_train_normal[0].answer : match_global_train_normal[Math.floor(Math.random() * match_global_train_normal.length)].answer }).catch(() => { });
                else {
                    console.log('fallback_get working 2');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                     message.reply({ content: fallback_get }).catch(() => { });
                };
            };
        }  else if (user.status == 'โกรธ') {
            if (!all_train_hate) {
                if (!global_train_hate) {
                console.log('No global train data');
                let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                  message.reply({ content: fallback_get }).catch(() => { });
                };

                console.log('Global train data working 2');
                let match_global_train_hate = global_train_hate.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                if (match_global_train_hate.length >= 1)  message.reply({ content: match_global_train_hate.length == 1 ? match_global_train_hate[0].answer : match_global_train_hate[Math.floor(Math.random() * match_global_train_hate.length)].answer }).catch(() => { });
                else {
                    console.log('fallback_get working 2');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                     message.reply({ content: fallback_get }).catch(() => { });
                };
            }
            let match_train_hate = all_train_hate.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน train
            if (match_train_hate.length >= 1)   message.reply({ content: match_train_hate.length == 1 ? match_train_hate[0].answer : match_train_hate[Math.floor(Math.random() * match_train_hate.length)].answer }).catch(() => { });
            else {
                if (!global_train_hate) {
                    console.log('No global train data');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                      message.reply({ content: fallback_get }).catch(() => { });
                };
                console.log('Global train data working 2');
                let match_global_train_hate = global_train_hate.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                if (match_global_train_hate.length >= 1)  message.reply({ content: match_global_train_hate.length == 1 ? match_global_train_hate[0].answer : match_global_train_hate[Math.floor(Math.random() * match_global_train_hate.length)].answer }).catch(() => { });
                else {
                    console.log('fallback_get working 2');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                     message.reply({ content: fallback_get }).catch(() => { });
                };
            };
        } else if (user.status == 'รัก') {
            if (!all_train_love) {
                if (!global_train_love) {
                console.log('No global train data');
                let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                  message.reply({ content: fallback_get }).catch(() => { });
                };

                console.log('Global train data working 2');
                let match_global_train_love = global_train_love.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                if (match_global_train_love.length >= 1)  message.reply({ content: match_global_train_love.length == 1 ? match_global_train_love[0].answer : match_global_train_love[Math.floor(Math.random() * match_global_train_love.length)].answer }).catch(() => { });
                else {
                    console.log('fallback_get working 2');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                     message.reply({ content: fallback_get }).catch(() => { });
                };
            }
            let match_train_love = all_train_love.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน train
            if (match_train_love.length >= 1)   message.reply({ content: match_train_love.length == 1 ? match_train_love[0].answer : match_train_love[Math.floor(Math.random() * match_train_love.length)].answer }).catch(() => { });
            else {
                console.log('fallback_get working 1');
                if (!global_train_love) {
                    console.log('No global train data');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                      message.reply({ content: fallback_get }).catch(() => { });
                };
                console.log('Global train data working 2');
                let match_global_train_love = global_train_love.filter(train => message.content.includes(train.question)); // คำถามที่ตรงกับคำถามที่เรากำหนดไว้ใน global_train
                if (match_global_train_love.length >= 1)  message.reply({ content: match_global_train_love.length == 1 ? match_global_train_love[0].answer : match_global_train_love[Math.floor(Math.random() * match_global_train_love.length)].answer }).catch(() => { });
                else {
                    console.log('fallback_get working 2');
                    let fallback_get = default_fallback[Math.floor(Math.random() * default_fallback.length)];
                     message.reply({ content: fallback_get }).catch(() => { });
                };
            };
        }
    } 
} else {
    if (user.nickname_request1 == false){
        user.nickname_request1 = true;

        let nickname_1 = new EmbedBuilder()
        .setDescription("เอะไม่เคยเจอหน้าเธอเลยแหะมาทำความรู้จักกันหน่อยเร็วงั้น!")

        message.reply({ embeds: [nickname_1] }).catch(() => { });
        user.save();
    } 
}

} 

    
// get discriminator user
    await client.createHome(message.guild.id, message.author.id, message.author.username, message.author.discriminator);
    await client.createProfile(message.guild.id, message.author.id);
    await client.createInv(message.guild.id, message.author.id);

    const profiles = await GProfile.findOne({ guild: message.guild.id, user: message.author.id });
    if(profiles.quest.length === 0) return;

}