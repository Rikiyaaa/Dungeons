const { Schema, model } = require('mongoose');

const house_inv = Schema({
    guild: String,
    user: String,
    floor_left: Array,
    floor_right: Array,
    furniture_left: Array,
    furniture_right: Array,
    wall_left: Array,
    wall_right: Array,
    wallpaper_left: Array,
    wallpaper_right: Array,
});

module.exports = model('house_invs', house_inv);

