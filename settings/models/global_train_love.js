const { Schema, model } = require('mongoose');

const global_trains_love = new Schema({
    question: String,
    answer: String,
});

module.exports = model('global-train-love-data', global_trains_love);