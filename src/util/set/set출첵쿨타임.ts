import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import query from '../query'

export default async function set출첵쿨타임(member: GuildMember, newcooltime: string) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  await query(`
    insert into cc_cooltime values ("${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `)
}
