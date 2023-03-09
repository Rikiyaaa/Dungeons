const { Schema, model } = require('mongoose');

const gachainventorys = Schema({
    guild: String,
    user: String,
    item: Array,
});

module.exports = model('gachainventorys', gachainventorys);

