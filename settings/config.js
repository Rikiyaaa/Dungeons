require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "MTAwMjExNzU0Mzc1NjA1MDUwMg.GzFUtD.vQlKprh217WtRf_RTm2SPmhZCxvcXrmEcG-x40",  // your bot token
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", //<= default is "#000001"
    OWNER_ID: ["850610077168566293",], //your owner discord id example: "515490955801919488"
    DEV_ID: [], // if you want to use command bot only, you can put your id here example: ["123456789", "123456789"]
    MONGO_URI: "mongodb+srv://Kitsakorn:20762newsa@cluster0.6zwvqim.mongodb.net/test4"
}




