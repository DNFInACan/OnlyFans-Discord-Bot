const { Client, Intents, MessageEmbed } = require('discord.js')
const config = require("./config.json");
const bot = new Client({
    allowedMentions: { repliedUser: false },
    restTimeOffset: 0,
    shards: 'auto',
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS
    ]
})

const RedditImageFetcher = require("reddit-image-fetcher");

const prefix = config.prefix

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is online!`)
    console.log(`Bot currently has: ` + `${bot.channels.cache.size}` + ' channels of ' + `${bot.guilds.cache.size}` + ' servers.')
    bot.user.setPresence({
        activities: [{ name: `${bot.guilds.cache.size} servers. ${prefix}help.` }],
        status: 'online',
        type: 'WATCHING'
    })
});

bot.on('messageCreate', msg => {
    let embed = new MessageEmbed().setAuthor("OnlyFans: A bot for fan enthusiasts").setFooter(`Bot made by ${config.developer}.`).setColor('#6bdb4f');
    switch (msg.content) {
        case `${prefix}fanpic`:
            (async () => {
                await RedditImageFetcher.fetch({ type: 'custom', total: 1, subreddit: ['fans'] }).then(result => {
                  console.log(result)
                  if (result[0].NSFW) {
                      return;
                  }
                  embed.setImage(result[0].image).setTitle(result[0].title);
                  msg.channel.send({embeds: [embed]})
                })
            })()
        break;
        case `${prefix}help`:
            embed.setTitle("OnlyFans Commands").setDescription(`${prefix}help: Shows a list of commands.\n${prefix}fanpic: Fetches an image from r/fans.\n${prefix}invite: Gives an invite link to the bot to add to your own server!`)
            msg.channel.send({embeds: [embed]})
        break;
        case `${prefix}invite`:
            embed.setDescription(`${config.invite_link}`);
            msg.channel.send({embeds: [embed]})
        break;
        default:
            return;
    }
});

bot.login(config.token);
