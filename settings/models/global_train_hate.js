const { Schema, model } = require('mongoose');

const global_trains_hate = new Schema({
    question: String,
    answer: String,
});

module.exports = model('global-train-hate-data', global_trains_hate);