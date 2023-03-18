const { EmbedBuilder,AttachmentBuilder  } = require("discord.js");
const GHome = require("../../settings/models/house.js")
const Canvas = require("@napi-rs/canvas");

module.exports = {
    name: ["house", "display"],
    description: "Display my home.",
    category: "House",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

      const msg = await interaction.editReply({ content: `<a:907824800192397392:1022032199836512330> | กำลังโหลดข้อมูล...` });

        const home = await GHome.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        const canvas = Canvas.createCanvas(300, 300);
        const ctx = canvas.getContext("2d");

        const home_img = home.house;

        const background = await Canvas.loadImage(`${home_img}`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const windows = await Canvas.loadImage("./assests/windows.png");
        ctx.drawImage(windows, 0, 0, canvas.width, canvas.height);

        if (home.six_clock === true) {
            const six_clock = await Canvas.loadImage("./assests/windows_mooning.png");
            ctx.drawImage(six_clock, 0, 0, canvas.width, canvas.height);
        } else if (home.nineteen_clock === true) {
            const nineteen_clock = await Canvas.loadImage("./assests/windows_night.png");
            ctx.drawImage(nineteen_clock, 0, 0, canvas.width, canvas.height);
        } 

        const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: `house.png` })

        return msg.edit({ content: `> Viewing Your House • [  ${interaction.user.username}#${interaction.user.discriminator} ]`, files: [attachment] });
    }
}
