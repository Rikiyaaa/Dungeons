const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const GPet = require("../../settings/models/cradprofile.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
    name: ["profile", "edit"],
    description: "edit your profile.",
    category: "Profile",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply("Loading please wait...");

        const embed = new EmbedBuilder()
            .setDescription("อยู่ในระหว่างการพัฒนา...")
            .setColor(client.color)

        return msg.edit({ content: " ", embeds: [embed], files: [attac] });
    }
}
