import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx'
import { addByUser } from '../util/add'
import isAdmin from '../util/check/isAdmin'
import isUser from '../util/check/isUser'
import { setUserData } from '../util/db/set/setUserData'

@Discord()
@SlashGroup({ description: '[관리자 전용] 스탯을 설정합니다.', name: '설정' })
@SlashGroup('설정')
export class 설정 {
  @Slash({ description: '[관리자 전용] 공격력을 설정합니다.', name: '공격력' })
  async 공격력(
    @SlashOption({
      description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
      name: '수치',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    수치: number,
    @SlashOption({
      description: '설정할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await interaction.reply('관리자 전용 명령어입니다.')
    if (!(await isUser(대상))) return await interaction.reply('등록되지 않은 유저입니다.')

    await setUserData(대상, await addByUser('공격력', 수치, 대상))

    await interaction.reply('✅') // todo 캐시된
  }
}
