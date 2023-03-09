const Member = require("../../settings/models/profile.js");
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const lucky = require("../../settings/lucky.js");
const delay = require("delay");

module.exports = { 
    name: ["ดูดวง"],
    description: "มาเช็คดวงของมึงกันครับ",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const user = await Member.findOne({ guild: interaction.guild.id, user: interaction.user.id });

        if (user.lucky_get === true) {
            const embed = new EmbedBuilder()
                .setColor("#bdc6e9")
                .setDescription("`<a:907824800192397392:1022032199836512330> |คุณควรดูดวงเเค่ 1 ครั้งต่อวันนะครับ")

            return interaction.editReply({ embeds: [embed], ephemeral: true });
        } else {
        const loading = new EmbedBuilder()
            .setColor("#bdc6e9")  
            .setImage("https://i.imgur.com/sG7m1GE.gif")
            .setFooter({ text: 'Kitsakorn Bot | Beta Version 0.0.1'})
        const msg = await interaction.editReply({ embeds: [loading], components: [] }); 

        const card = lucky.card[Math.floor(Math.random() * lucky.card.length)];
        
        const name = card.name;
        const image = card.image;
        const color = card.color;
        const description = card.description;
        const keyword = card.keyword;
        const love = card.love;

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("home")
            .setLabel("Home ")   
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
            new ButtonBuilder()
                .setCustomId("love")
                .setLabel("เกี่ยวกับความรัก")
                .setStyle(ButtonStyle.Secondary),
           
        );
        
        const embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: "ไพ่ใบที่คุณได้คือ", iconURL: "https://i.imgur.com/BtZ53tT.png" })
            .setTitle(name)
            .setDescription((
                ` \`\`\`fix\n${description}\`\`\`
                `))
            .setImage(image)
            .setFooter({ text: `${keyword}` })

        await delay(3000);
        user.lucky_get = true;
        user.save();
       msg.edit({ embeds: [embed], components: [button] });


       const filter = (button) => button.user.id === interaction.user.id;  
        const collector = interaction.channel.createMessageComponentCollector({ filter, time : 60000 * 30});
        collector.on('collect', async (menu) => {
            if (menu.isButton()) {
            if (menu.customId === 'love') {
                menu.deferUpdate();
                button.components[1].setDisabled(true);
                button.components[0].setDisabled(false);
                const embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: "ความหมายในเรื่องความรัก", iconURL: "https://i.imgur.com/BtZ53tT.png" })
                .setTitle(name)
                .setDescription((
                    ` \`\`\`fix\n${love}\`\`\`
                    `))
                .setImage(image)
                .setFooter({ text: `${keyword}` })
                msg.edit({ embeds: [embed], components: [button] });


                

            } else if (menu.customId === 'home') {
                menu.deferUpdate();
                button.components[0].setDisabled(true);
                button.components[1].setDisabled(false);
                const embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: "ไพ่ใบที่คุณได้คือ", iconURL: "https://i.imgur.com/BtZ53tT.png" })
                .setTitle(name)
                .setDescription((
                    ` \`\`\`fix\n${description}\`\`\`
                    `))
                .setImage(image)
                .setFooter({ text: `${keyword}` })
                 msg.edit({ embeds: [embed], components: [button] });

            }
        }});
        collector.on('end', async (menu) => {
            // edit embed to say that the collector has ended
            const embed = new EmbedBuilder()
            .setColor("#bdc6e9")
            .setDescription("หมดเวลาดูดวงแล้วครับ")
            await msg.edit({ embeds: [embed], components: [] });
            // delete the message after 5 seconds
            await delay(5000);
            await msg.delete();
        });
    }
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
