import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashOption } from 'discordx'
import isUser from '../util/check/isUser'
import makeProfileString from '../util/makeProfileString'

@Discord()
export class 프로필 {
  @Slash({ description: '다른 사람(또는 자신)의 프로필을 확인합니다!', name: '프로필' })
  async 프로필(
    @SlashOption({
      description: '프로필을 확인할 유저입니다. 입력하지 않으면 자신의 프로필을 확인합니다.',
      name: '유저',
      required: false,
      type: ApplicationCommandOptionType.User,
    })
    유저: GuildMember | undefined,
    interaction: CommandInteraction
  ) {
    const member = 유저 ?? (interaction.member as GuildMember)

    if (!(await isUser(member))) return await interaction.reply('등록되지 않은 유저입니다.')

    await interaction.reply(await makeProfileString(member))
  }
}
