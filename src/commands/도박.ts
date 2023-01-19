import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashOption } from 'discordx'
import { defer } from '../decorator/defer'
import add from '../util/add'
import block from '../util/block'
import can도박쿨타임 from '../util/check/can도박쿨타임'
import isUser from '../util/check/isUser'
import getUserData from '../util/get/getUserData'
import get도박쿨타임 from '../util/get/get도박쿨타임'
import set도박쿨타임 from '../util/set/set도박쿨타임'

@Discord()
export class 도박 {
  @Slash({ description: '도박을 진행합니다.', name: '도박' })
  @defer
  async 도박(
    @SlashOption({
      description: '배팅할 R입니다.',
      name: '배팅',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    배팅: number,
    interaction: CommandInteraction
  ) {
    if (interaction.channelId !== '1025359305689550869') return await block(interaction, '잘못된 채널', '1025359305689550869')
    const member = interaction.member as GuildMember
    if (!(await isUser(member))) return await block(interaction, '등록되지 않음', null)
    if (!(await can도박쿨타임(member))) return await block(interaction, '도박 쿨타임', await get도박쿨타임(member))
    if (배팅 % 10) return await block(interaction, '배팅 단위가 맞지 않음', null)
    if (배팅 < 0) return await block(interaction, '배팅 금액이 음수', null)
    const userData = await getUserData(member)
    if (배팅 > userData.r) return await block(interaction, '재화 부족', null)

    await set도박쿨타임(member)

    const 배율 = (() => {
      let x = Math.random() * 100
      if (x < 5) return 2 // 5%
      x -= 5
      if (x < 10) return 1.5 // 10%
      x -= 10
      if (x < 50) return 1 // 50%
      x -= 50
      if (x < 25) return 0.5 // 25%
      return 0 // 10%
    })()

    const res = -배팅 + 배율 * 배팅

    await add(member, 'r', res)

    await interaction.editReply('```diff\n' + `x${배율}\n` + '```')
  }
}
