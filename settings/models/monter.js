const { Schema, model } = require('mongoose');

const monter = Schema({
    guild: String,
    user: String,
    name: String,
    type: String, 
    level: Number,
    image: String,
    location: String,
    location_image: String,
    damage_attack: Number,
    health: Number,
    health_max: Number,
    health_emoji: String,
    exp: Number,
    drop: Array,
});

module.exports = model('monters', monter);

