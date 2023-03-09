const { Schema, model } = require('mongoose');

const bacarat = Schema({
    guild: String,
    bacarat: Boolean,
    history: Array,
    space: String,
    ไพ่ป๊อก: String,
    ไพ่คู่: String,
    data: Array,
    data_pair : Array,
    player_s1: String,
    player_s2: String,
    player_s3: String,
    player_c1: String,
    player_c2: String,
    player_c3: String,
    banker_s1: String,
    banker_s2: String,
    banker_s3: String,
    banker_c1: String,
    banker_c2: String,
    banker_c3: String,
    time_remaining: Number,
    time: Number,
    time_limit: Number,
});

module.exports = model("Bacarat", bacarat);