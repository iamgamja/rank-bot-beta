import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx'
import { defer } from '../decorator/defer'
import block from '../util/block'
import isAdmin from '../util/check/isAdmin'
import isUser from '../util/check/isUser'
import query from '../util/query'

@Discord()
export class 장착 {
  @Slash({ description: '[관리자 전용] 무기/방어구를 장착시킵니다.', name: '장착' })
  @defer
  async 장착(
    @SlashChoice({ name: '무기', value: 'atkitem' })
    @SlashChoice({ name: '방어구', value: 'defitem' })
    @SlashOption({
      description: '장착할 아이템의 종류입니다.',
      name: '종류',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    종류: 'atkitem' | 'defitem',
    @SlashOption({
      description: '장착할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,
    @SlashOption({
      description: '장착할 아이템의 이름입니다.',
      name: '이름',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    이름: string,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (!(await isUser(대상))) return await block(interaction, '등록되지 않음', null)

    // await add(대상, 'atk', 수치)
    await query(`update user_data set ${종류} = "${이름}" where userid = "${대상.id}"`)

    // await editUserInfoMsg()
    /** @todo 완성되면 이거 주석 해제 */

    await interaction.editReply('✅')
  }
}
