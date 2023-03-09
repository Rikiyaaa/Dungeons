const { Schema, model } = require('mongoose');

const guild_datas = new Schema({
    guild: String,
    talkRoom: String,
});

module.exports = model('guild-data', guild_datas);