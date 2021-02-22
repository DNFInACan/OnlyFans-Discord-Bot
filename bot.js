// Set up constants \\

const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

const prefix = config.prefix

const links = [
    "https://cdn.discordapp.com/attachments/813446877550477332/813448036423303168/gray-lasko-pedestal-fans-2524-64_1000.png",
    "https://cdn.discordapp.com/attachments/813446877550477332/813448363822546974/Ventilatore_a_soffitto_28329.png",
    "https://cdn.discordapp.com/attachments/813446877550477332/813448438133424179/toughfan_01.png",
    "https://cdn.discordapp.com/attachments/813446877550477332/813448655738110002/MeacoFan-1056-Air-Circulator-Fan-MF1056_trans_NvBQzQNjv4BqsfOCuR7AN27npnm9MstSEAeJFq1ppjIoY_hVzJZxY3.png",
    "https://cdn.discordapp.com/attachments/813446877550477332/813449047150428261/FansComp_trans_NvBQzQNjv4Bqc3IxSbjMmXltPISQXxZkAAnfsHiDjoFXrn3j8cDz9dY.png",
    "https://cdn.discordapp.com/attachments/813446877550477332/813449482950672414/image0.jpg",
    "https://cdn.discordapp.com/attachments/813446877550477332/813501958107168857/A1tecTn9yiL._AC_SL1500_.jpg",
    "https://tenor.com/view/electric-fan-wind-turn-hot-fan-gif-4860088",
    "https://cdn.discordapp.com/attachments/813446877550477332/813509843050692638/1.jpg",
    "https://cdn.discordapp.com/attachments/813446877550477332/813509844061126677/2.jpg",
    "https://cdn.discordapp.com/attachments/813446877550477332/813509888939655218/3.jpg",
    "https://cdn.discordapp.com/attachments/813446877550477332/813509941067251793/4.jpg",
    "https://cdn.discordapp.com/attachments/589920642086993921/813540824545099796/9k.png"
];

// Listen to when the bot is online \\


bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is online!`)
    console.log(`Bot currently has: ` + `${bot.channels.cache.size}` + ' channels of ' + `${bot.guilds.cache.size}` + ' servers.')
    bot.user.setStatus('online')
        bot.user.setActivity(`${bot.guilds.cache.size} servers. ${prefix}help.`, { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
});

function fanpictures() {
    let amountOfPics = links.length;
    let selectedPic = links[Math.floor(Math.random() * amountOfPics)];
    console.log(selectedPic);
    return selectedPic;
}

// Listen to when a message is sent. \\

bot.on('message', msg => {
    // switch statement so I don't have messy if statements.\
    let pictureEmbed = new Discord.MessageEmbed()
    .setColor('#6bdb4f') 
    switch(msg.content) {
        case `${prefix}fanpic`:
            let selectedPic = fanpictures();
            console.log(selectedPic);
            pictureEmbed
                .setAuthor(`Here's a fan picture, ${msg.author.username}!`)
                .setImage(selectedPic)
                .setFooter(`Made by ${config.developer}`);
            msg.channel.send(pictureEmbed);
        break;
        case `${prefix}help`:
            pictureEmbed
            .setDescription(`\`\`\`
            ${prefix}help: Sends a list of commands.
            ${prefix}fanpic: Sends a picture of a fan.
            ${prefix}stats: Sends statistics of the bot.
            ${prefix}invite: Invite to your own server.
            \`\`\``)
            .setFooter(`Made by ${config.developer}`);
            msg.channel.send(pictureEmbed);
        break;
        case `${prefix}stats`:
            pictureEmbed
            .setDescription(`Here is ${bot.user.username}'s statistics!`)
            .addFields(
                { name: 'Amount of Servers:', value: `${bot.guilds.cache.size}`},
            )
            .setFooter(`Made by ${config.developer}`);
            msg.channel.send(pictureEmbed);
        break;
        case `${prefix}invite`:
            msg.channel.send(
                `Invite ${bot.user.username} to your server here! ${config.invite_link}`
            );
        break;
        default:
            return;
    }
});

// Log in the bot. \\

bot.login(config.token);