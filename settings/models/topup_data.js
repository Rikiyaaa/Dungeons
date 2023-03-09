const { Schema, model } = require('mongoose');

const Topup_data =  Schema({
    User_id: String,
    Username: String,
    เติมเงินไปทั้งหมด: Number,
    รายการเติมเงิน: Array,
});

module.exports = model("Topup", Topup_data);