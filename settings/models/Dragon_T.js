const { Schema, model } = require('mongoose');

const dragon_tiger = Schema({
    guild: String,
    dragon_tiger: Boolean,
    history: Array,
    space: String,
    data: Array,
    tiger_s1: String,
    tiger_c1: String,
    dargon_s1: String,
    dargon_c1: String,
    time_remaining: Number,
    time: Number,
    time_limit: Number,
});

module.exports = model("dragon_tigers", dragon_tiger);