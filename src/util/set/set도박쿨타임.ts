import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import query from '../query'

export default async function set도박쿨타임(member: GuildMember, newcooltime: string) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  await query(`
    insert into dd_cooltime values ("${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `)
}
