const  figlet = require('figlet');

module.exports = async (client, message) => {
    console.log(`[INFO] ${client.user.tag} is Ready!`);

    figlet(`Ready!`, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    const guilds = client.guilds.cache.size;
    const members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    const channels = client.channels.cache.size; 

    const activities = [
        `/help | ${guilds} servers`,
        `/simple <input> | ${members} users`,
        `/nanohandler | ${channels} channels`,
    ]

    setInterval(() => {
        client.user.setPresence({ 
            activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }], 
            status: 'online', 
        });
    }, 15000)

};
