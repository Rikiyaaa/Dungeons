const { Schema, model } = require('mongoose');

const train_love_datas =  Schema({
    guild: String, 
    question: String,
    answer: String,
});

module.exports = model('train-love-data', train_love_datas);