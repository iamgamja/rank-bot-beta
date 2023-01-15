import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import query from '../query'

export default async function set출첵쿨타임(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  // newcooltime 구하기
  const d = new Date()
  d.setHours(d.getHours() + 9)

  d.setMilliseconds(0)
  d.setSeconds(0)
  d.setMinutes(0)
  d.setHours(0)
  d.setDate(d.getDate() + 1)

  d.setHours(d.getHours() - 9)

  const newcooltime = d.getTime()

  await query(`
    insert into cc_cooltime values ("${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `)
}
