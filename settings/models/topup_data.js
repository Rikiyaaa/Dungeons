const { Schema, model } = require('mongoose');

const Topup_data =  Schema({
    guild : String,
    user: String,
    Username: String,
    all: Number,
    list: Array,
});

module.exports = model("Topup", Topup_data);