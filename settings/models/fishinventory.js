const { Schema, model } = require('mongoose');

const fishinventorys = Schema({
    guild: String,
    user: String,
    item: Array,
});

module.exports = model('fishinventorys', fishinventorys);

