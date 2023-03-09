const { Schema, model } = require('mongoose');

const market = Schema({
    guild: String,
    market: Array,
});

module.exports = model('market', market);

