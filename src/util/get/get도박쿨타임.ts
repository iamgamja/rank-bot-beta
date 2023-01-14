import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import query from '../query'

export default async function get도박쿨타임(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const res = (await query(`select * from dd_cooltime where userid="${member.id}"`)) as unknown as string[]

  if (res.length === 0) return '0'

  const cooltime = res[0]
  return cooltime
}
