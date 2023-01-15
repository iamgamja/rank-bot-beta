import { ApplicationCommandOptionType, CommandInteraction, GuildMember, Role } from 'discord.js'
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx'
import SHOP_ITEM from '../data/shopItem'
import add from '../util/add'
import block from '../util/block'
import isUser from '../util/check/isUser'
import getUserData from '../util/get/getUserData'

@Discord()
export class 구매 {
  @Slash({ description: '아이템을 구매합니다.', name: '구매' })
  async 구매(
    @SlashChoice(...Object.keys(SHOP_ITEM).map((name) => ({ name: name, value: name }))) // 모든 아이템 선택지에 넣기
    @SlashOption({
      description: '구매할 아이템의 이름입니다.',
      name: '아이템',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    아이템: keyof typeof SHOP_ITEM,
    interaction: CommandInteraction
  ) {
    if (interaction.channelId !== '1025359390544502814') return await block(interaction, '잘못된 채널', '1025359390544502814')
    const member = interaction.member as GuildMember
    if (!(await isUser(member))) return await block(interaction, '등록되지 않음', null)
    const userData = await getUserData(member)
    const target = SHOP_ITEM[아이템]
    if (userData.r < target.cost) return await block(interaction, '재화 부족', null)

    if ('limit' in target) {
      const [targettear, targetlevel, targetexp] = target.limit
      const can구매 = (() => {
        if (targettear < userData.tear) return true
        if (targettear > userData.tear) return false
        if (targetlevel < userData.level) return true
        if (targetlevel > userData.level) return false
        if (targetexp <= userData.exp) return true
        return false
      })()
      if (!can구매) return await block(interaction, '경험치 부족', null)
    }

    if ('role' in target.get) {
      if (member.roles.cache.get(target.get.role)) return await block(interaction, '이미 구매함', null)
    }

    // 구매
    await interaction.deferReply()

    await add(member, 'r', -target.cost)

    if ('role' in target.get) {
      const role = interaction.guild?.roles.cache.get(target.get.role) as Role
      await member.roles.add(role, '아이템 구매')
    }

    if ('exp' in target.get) {
      await add(member, 'exp', target.get.exp)
    }

    await interaction.editReply('```diff\n' + `+ ${아이템}을(를) 구매했습니다.\n` + '```')
  }
}
