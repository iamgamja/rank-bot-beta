import { CommandInteraction } from 'discord.js'
import { Discord, Slash } from 'discordx'

@Discord()
export class Haee {
  @Slash({ description: '인사한대요', name: 'haee' })
  async haee(interaction: CommandInteraction) {
    console.log('와 안녕!')
    await interaction.reply('h')
  }
}
