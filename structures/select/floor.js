const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder, SelectMenuOptionBuilder } = require("discord.js");
const { editFloor } = require("../edit/floor.js")
const GInv = require("../../settings/models/inventory.js");

const selectFloor = async (client, interaction, pendingEditHouseCommands ) => {
    if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');

    const inv = await GInv.findOne({ guild: interaction.guild.id, user: interaction.user.id });

    const value = Object.values(inv.item);
    const object = value.filter(x => x.type === "floor");

    if(object.length === 0) {
        return interaction.editReply({ content: "You don't have any floor.", embeds: [], files: [], components: [], ephemeral: true  });
    }

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("*Please Select a Floor*")

    const select = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("floorselect")
                .setPlaceholder("Select a floor to placing.")
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(object.map(key => {
                    return new SelectMenuOptionBuilder()
                        .setLabel(`${toOppositeCase(key.name)}`)
                        .setValue(key.id)
                    }
                ))
            ])

    await interaction.editReply({ embeds: [embed], components: [select], files: [] , ephemeral: true });

    let filter = (m) => m.user.id === interaction.user.id;
    let collector = await interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

    collector.on('collect', async (menu) => {
        if(menu.isStringSelectMenu()) {
            // id select menus
            if(menu.customId === "floorselect") {
                await menu.deferUpdate();
                let [ directory ] = menu.values;

                const item = inv.item.find(x => x.id === directory);

                editFloor(client, interaction,  item.name, item.type, item.id, pendingEditHouseCommands);
                await collector.stop();
            }
        }
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'time') {
            const timed = new EmbedBuilder()
                .setDescription(`Time is Ended!`)
                .setColor(client.color)

            interaction.editReply({ embeds: [timed], components: [], ephemeral: true  });
        }
    });

   return;
}

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1);
}

module.exports = { selectFloor };