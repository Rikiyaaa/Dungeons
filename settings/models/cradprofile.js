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
    stamina: Number,
    stamina_max: Number,
    hungry: Number,
    energy: Number,
    point: Number,
    point_max: Number,
    attack: Number,
    defense: Number,
    stamina_s: Number,
    speed: Number,
    luck: Number,
    attack_max: Number,
    defense_max: Number,
    stamina_s_max: Number,
    speed_max: Number,
    luck_max: Number,
    stamina_emoji: String,
    health_emoji: String,
    emoji_attack: String,
    emoji_defense: String,
    emoji_speed: String,
    emoji_luck: String,
});

module.exports = model('cradprofiles', cradprofile);

