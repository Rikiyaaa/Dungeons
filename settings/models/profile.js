const { Schema, model } = require('mongoose');

const profile = Schema({
  guild: String,
  user: String,
  status: String,
  location: String,
  nickname_request1: Boolean,
  bad_message: Number,
  happy_message: Number,
  flower: Number,
  flower_max: Number,
  relationship: String,
  level: Number,
  money: Number,
  fishhook: Array,
  inventory: {
      type: Number,
      default: 100
  },
  fishinventory: {
      type: Number,
      default: 2
  },
  gachainventory: {
    type: Number,
    default: 10
}, 
iteminventory: {
    type: Number,
    default: 100
},
  wallet_bg: String,
  quest_main1: Boolean,
  quest_main2: Boolean,
  quest_main3: Boolean,
  quest: Array,
  lucky_get: Boolean,
  work_cooldown_time: Number,
  work_cooldown: Number,
  work_multiple: Number, // all number 
  bank: Number,
  moneyAndBank: Number,
  rob: Boolean, // false, true
  rob_cooldown: Number,
  rob_cooldown_time: Number,
  fishs: Boolean,
  fishs_cooldown: Number,
  fishs_cooldown_time: Number,
  fishs_multiple: Number,
  fruit: Boolean,
  fruit_cooldown: Number,
  fruit_cooldown_time: Number,
  fruit_multiple: Number,
  crime_cooldown: Number,
  crime_cooldown_time: Number,
  crime_multiple: Number,
  sell_cooldown: Number,
  sell_cooldown_time: Number,
  sell_multiple: Number,
  vote_cooldown: Number,
  vote_cooldown_time: Number,
  married_to: String,
  married: Boolean,
  rank: String,
  select_class_success: Boolean,
  reputation: Number,
  facebook: String,
  instagram: String,
  twitter: String,
  battled_win: Number,
  battled_lose: Number,
  typeing: Number,
  fishing: Number,
});

module.exports = model('Member', profile);