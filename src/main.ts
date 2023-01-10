import 'dotenv/config'

import { dirname, importx } from '@discordx/importer'
import { ChannelType, Interaction } from 'discord.js'
import { IntentsBitField } from 'discord.js'
import { Client } from 'discordx'

export const bot = new Client({
  // To use only guild command
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  // simpleCommand: {
  //   prefix: '!',
  // },
})

bot.once('ready', async () => {
  // Make sure all guilds are cached
  await bot.guilds.fetch()

  // 항상 삭제 먼저 하기
  await bot.clearApplicationCommands(...bot.guilds.cache.map((g) => g.id))
  await bot.clearApplicationCommands()

  // 그 다음 추가하기
  await bot.initApplicationCommands()

  console.log('Bot started')

  const logchannel = bot.channels.cache.get('1061497104696098836') // log5
  if (!logchannel) {
    console.log('no log channel :thinking:')
    return
  }
  if (logchannel.type !== ChannelType.GuildText) {
    console.log('log channel is not text channel :thinking:')
    return
  }

  logchannel.send('start <@526889025894875158>')
})

bot.on('interactionCreate', (interaction: Interaction) => {
  bot.executeInteraction(interaction)
})

// bot.on('messageCreate', (message: Message) => {
//   bot.executeCommand(message)
// })

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`)

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error('Could not find BOT_TOKEN in your environment')
  }

  // Log in with your bot token
  await bot.login(process.env.BOT_TOKEN)
}

run()
