const { Schema, model } = require('mongoose');

const train_datas =  Schema({
    guild: String, 
    question: String,
    answer: String,
});

module.exports = model('train-data', train_datas);