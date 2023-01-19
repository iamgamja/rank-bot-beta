import 'dotenv/config';
import { dirname, importx } from '@discordx/importer';
import { ChannelType, WebhookClient } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
if (!process.env.webhookurl)
    throw new Error('웨푹불가');
const wb = new WebhookClient({ url: process.env.webhookurl });
process.on('uncaughtException', async (err) => {
    console.error(err);
    await wb.send(`\`\`\`\n${err.stack ?? err.toString()}\n\`\`\``);
    process.exit(1);
});
export const bot = new Client({
    // To use only guild command
    // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    botGuilds: [
        '762916201654386698',
        '953302487065034785', // rank server
    ],
    // Discord intents
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        // IntentsBitField.Flags.GuildMessages,
        // IntentsBitField.Flags.GuildMessageReactions,
        // IntentsBitField.Flags.GuildVoiceStates,
    ],
    // Debug logs are disabled in silent mode
    silent: false,
    // Configuration for @SimpleCommand
    // simpleCommand: {
    //   prefix: '!',
    // },
});
bot.once('ready', async () => {
    // Make sure all guilds are cached
    await bot.guilds.fetch();
    // 항상 삭제 먼저 하기
    await bot.clearApplicationCommands(...bot.guilds.cache.map((g) => g.id));
    await bot.clearApplicationCommands();
    // 그 다음 추가하기
    await bot.initApplicationCommands();
    console.log('Bot started');
    const logchannel = bot.channels.cache.get('1061497104696098836'); // log5
    if (!logchannel) {
        console.log('no log channel :thinking:');
        return;
    }
    if (logchannel.type !== ChannelType.GuildText) {
        console.log('log channel is not text channel :thinking:');
        return;
    }
    await logchannel.send('start <@526889025894875158>');
});
bot.on('interactionCreate', (interaction) => {
    bot.executeInteraction(interaction);
});
// bot.on('messageCreate', (message: Message) => {
//   bot.executeCommand(message)
// })
async function run() {
    // The following syntax should be used in the commonjs environment
    //
    // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");
    // The following syntax should be used in the ECMAScript environment
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    // Let's start the bot
    if (!process.env.BOT_TOKEN) {
        throw Error('Could not find BOT_TOKEN in your environment');
    }
    // Log in with your bot token
    await bot.login(process.env.BOT_TOKEN);
}
run();
