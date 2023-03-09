const { Schema, model } = require('mongoose');

const coinflip = Schema({
    guild: String,
    coinflip: Boolean,
    history: Array,
    space: String,
    data: Array,
    time_remaining: Number,
    time: Number,
    time_limit: Number,
});

module.exports = model("Coinflip", coinflip);