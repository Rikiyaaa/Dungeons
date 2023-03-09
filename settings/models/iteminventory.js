const { Schema, model } = require('mongoose');

const iteminventorys = Schema({
    guild: String,
    user: String,
    item: Array,
});

module.exports = model('iteminventorys', iteminventorys);

