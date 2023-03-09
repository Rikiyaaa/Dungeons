const { Schema, model } = require('mongoose');

const global_trains = new Schema({
    question: String,
    answer: String,
});

module.exports = model('global-train-data', global_trains);