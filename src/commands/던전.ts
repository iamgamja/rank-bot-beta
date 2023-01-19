import { ApplicationCommandOptionType, CommandInteraction, GuildMember, TextChannel } from 'discord.js'
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx'
import DUNGEON from '../data/dungeon'
import { defer } from '../decorator/defer'
import add from '../util/add'
import block from '../util/block'
import can던전쿨타임 from '../util/check/can던전쿨타임'
import isUser from '../util/check/isUser'
import getUserData from '../util/get/getUserData'
import get던전쿨타임 from '../util/get/get던전쿨타임'

@Discord()
export class 던전 {
  @Slash({ description: '몬스터를 처치합니다.', name: '처치' })
  @defer
  async 처치(
    @SlashChoice(...Object.keys(DUNGEON).map((name) => ({ name: name, value: name })))
    @SlashOption({
      description: '처치할 몬스터의 이름입니다.',
      name: '몬스터',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    몬스터: keyof typeof DUNGEON,
    interaction: CommandInteraction
  ) {
    const target = DUNGEON[몬스터]
    if (interaction.channelId !== target.channelId) return await block(interaction, '잘못된 채널', target.channelId)
    const member = interaction.member as GuildMember
    if (!(await isUser(member))) return await block(interaction, '등록되지 않음', null)
    const channel = interaction.channel as TextChannel
    if (!(await can던전쿨타임(member, channel))) return await block(interaction, '던전 쿨타임', await get던전쿨타임(member, channel))

    const userData = await getUserData(member)
    const can공격 = (() => {
      if (target.공격력 === 0) return true
      else return Math.ceil(target.체력 / userData.atk) < Math.ceil(userData.hp / target.공격력)
    })()
    if (!can공격) return await block(interaction, '약함', null)

    // 처치
    const items: string[] = []
    // 아이템 획득
    for (const item of Object.entries(target.드롭아이템)) {
      const [itemName, percentage] = item
      if (Math.random() < percentage / 100) {
        items.push(itemName)
      }
    }

    const items_str = items.map((s) => `+ ${s}`).join('\n')

    await add(member, 'exp', target.획득경험치)
    await add(member, 'r', target.획득R)

    await interaction.editReply({ content: '```diff\n처치했습니다.\n' + `+ EXP ${target.획득경험치}\n+ R ${target.획득R}\n${items_str}` + '```' })
  }
}
