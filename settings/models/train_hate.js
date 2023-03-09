const { Schema, model } = require('mongoose');

const train_hate_datas =  Schema({
    guild: String, 
    question: String,
    answer: String,
});

module.exports = model('train-hate-data', train_hate_datas);