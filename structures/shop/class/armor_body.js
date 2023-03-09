const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const cprofile = require("../../../settings/models/cradprofile");
const { selectArmor_body_human } = require("./select_class/human/selectArmor_body_human.js");
const { selectArmor_body_sword } = require("./select_class/sword/selectArmor_body_sword.js");
const { selectArmor_body_warrior } = require("./select_class/warrior/selectArmor_body_warrior.js");
const { selectArmor_body_magic } = require("./select_class/magic/selectArmor_body_magic.js");

const shopArmorBody = async (client, interaction, msg, item) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const pet = await cprofile.findOne({ id: interaction.user.id });

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("human_id")
            .setLabel("Human")
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("sword_id")
            .setLabel("Swordman")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("warrior_id")
            .setLabel("Warrior")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("magic_id")
            .setLabel("Magic")
            .setStyle(ButtonStyle.Secondary),
        )

        const back_main = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("back_main_id")
                .setLabel("Back")
                .setStyle(ButtonStyle.Danger),
            )
        if(pet.type[0].type == "Human") {
            button.components[0].setDisabled(false);
            button.components[1].setDisabled(true);
            button.components[2].setDisabled(true);
            button.components[3].setDisabled(true);
        } else if(pet.type[0].type == "Swordman") {
            button.components[0].setDisabled(true);
            button.components[1].setDisabled(false);
            button.components[2].setDisabled(true);
            button.components[3].setDisabled(true);
        } else if(pet.type[0].type == "Warrior") {
            button.components[0].setDisabled(true);
            button.components[1].setDisabled(true);
            button.components[2].setDisabled(false);
            button.components[3].setDisabled(true);
        } else if(pet.type[0].type == "Magic") {
            button.components[0].setDisabled(true);
            button.components[1].setDisabled(true);
            button.components[2].setDisabled(true);
            button.components[3].setDisabled(false);
        }

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext("2d");

    const shop = await Canvas.loadImage("./assests/shop/two.png");
    ctx.drawImage(shop, 0, 0, canvas.width, canvas.height);

    const attc = new AttachmentBuilder(await canvas.encode("png"), { name: `two.png` })

    const embed = new EmbedBuilder()
        .setImage("attachment://two.png")
        .setColor(client.color)

    await interaction.editReply({ content: "Please Select Side furniture To Place.", embeds: [embed], components: [button, back_main], files: [attc] , ephemeral: true  });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if (menu.isButton()) {

            if(menu.customId === "human_id") {
                await menu.deferUpdate();

            selectArmor_body_human(client, interaction, msg, item);
            collector.stop();
            } else if (menu.customId === "sword_id") {
                await menu.deferUpdate();

            selectArmor_body_sword(client, interaction, msg, item);
            collector.stop();
            } else if (menu.customId === "warrior_id") {
                await menu.deferUpdate();

            selectArmor_body_warrior(client, interaction, msg, item);
            collector.stop();
            } else if (menu.customId === "magic_id") {

                await menu.deferUpdate();
            selectArmor_body_magic(client, interaction, msg, item);
            collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [], files: [] , ephemeral: true });
        }
    });

    return;

}

function Commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
};

const crypto = require('crypto');
function generateID() {
    return crypto.randomBytes(16).toString('base64');
};

module.exports = { shopArmorBody };