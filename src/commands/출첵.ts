import { CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash } from 'discordx'
import add from '../util/add'
import { calculate누적레벨ByUser } from '../util/calculate누적레벨'
import can출첵쿨타임 from '../util/check/can출첵쿨타임'
import isUser from '../util/check/isUser'
import set출첵쿨타임 from '../util/set/set출첵쿨타임'

@Discord()
export class 출첵 {
  @Slash({ description: '출첵합니다.', name: '출첵' })
  async 출첵(interaction: CommandInteraction) {
    if (interaction.channelId !== '1001389058473345154') return await interaction.reply('```diff\n- 잘못된 채널입니다.\n```\n실행 가능한 채널: <#1001389058473345154>')
    const member = interaction.member as GuildMember
    if (!(await isUser(member))) return await interaction.reply('등록되지 않은 유저입니다.')
    if (!(await can출첵쿨타임(member))) return await interaction.reply('쿨타임을 기다려주세요.')

    const d = new Date()
    d.setHours(d.getHours() + 9)

    d.setMilliseconds(0)
    d.setSeconds(0)
    d.setMinutes(0)
    d.setHours(0)
    d.setDate(d.getDate() + 1)

    await set출첵쿨타임(member)

    const n = 2 ** ((await calculate누적레벨ByUser(member)) - 1) * 10
    await add(member, 'exp', n)
    await add(member, 'r', n)

    await interaction.reply('```diff\n출첵했습니다.\n' + `+ EXP ${n}\n+ R ${n}\n` + '```')
  }
}
