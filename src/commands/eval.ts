import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js'
import { Discord, Slash, SlashOption } from 'discordx'
import { defer } from '../decorator/defer'
import query from '../util/query'

query

@Discord()
export class Eval {
  @Slash({ description: 'eval', name: 'eval' })
  @defer
  async eval(
    @SlashOption({
      description: 'code',
      name: 'code',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    code: string,
    interaction: CommandInteraction
  ) {
    if (interaction.user.id !== '526889025894875158') return

    const result = (() => {
      try {
        return eval(code).toString()
      } catch (e) {
        return e instanceof Error ? `\`\`\`\n${e.stack}\n\`\`\`` : String(e)
      }
    })()

    await interaction.editReply(result.toString())
  }
}
