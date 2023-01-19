import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashOption } from 'discordx'
import { defer } from '../decorator/defer'
import { userData } from '../type/userData'
import block from '../util/block'
import isAdmin from '../util/check/isAdmin'
import isUser from '../util/check/isUser'
import query from '../util/query'
import { addUserData } from '../util/set/addUserData'

@Discord()
export class 등록 {
  async _등록(member: GuildMember) {
    const userCount = Object.keys(await query('select * from user_data')).length
    const newUserData: userData = {
      id: userCount + 1,
      userid: member.id,
      tear: 0,
      level: 1,
      exp: 0,
      atk: 1,
      hp: 1,
      r: 0,
      atkitem: '없음',
      defitem: '없음',
    }
    await addUserData(newUserData)
  }

  @Slash({ description: '등록합니다.', name: '등록' })
  @defer
  async 등록(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember
    if (await isUser(member)) return await block(interaction, '이미 등록됨', null)

    await this._등록(member)
    await interaction.editReply('✅')
  }

  @Slash({ description: '[관리자 전용] 다른 사람을 원격으로 등록합니다.', name: '원격등록' })
  @defer
  async 원격등록(
    @SlashOption({
      description: '등록할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,
    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (await isUser(대상)) return await block(interaction, '이미 등록됨', null)

    await this._등록(대상)
    await interaction.editReply('✅')
  }
}
