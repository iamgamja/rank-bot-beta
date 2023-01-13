import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import query from '../query'

export default async function set도박쿨타임(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const newcooltime = Date.now() + 60 * 1000

  await query(`
    insert into dd_cooltime values ("${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `)
}
