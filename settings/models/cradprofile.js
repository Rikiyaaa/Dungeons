const { Schema, model } = require('mongoose');

const cradprofile = Schema({
    user: String,
    username: String,
    type: Array,
    exp: Number,
    level: Number,
    nextexp: Number,
    health: Number,
    health_max: Number,
    hungry: Number,
    energy: Number,
    point: Number,
    point_max: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    luck: Number,
    attack_max: Number,
    defense_max: Number,
    speed_max: Number,
    luck_max: Number,
    health_emoji: String,
    emoji_attack: String,
    emoji_defense: String,
    emoji_speed: String,
    emoji_luck: String,
});

module.exports = model('cradprofiles', cradprofile);

