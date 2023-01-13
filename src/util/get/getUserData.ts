import { GuildMember } from 'discord.js'
import query from '../query'
import { userData } from '../../type/userData'
import UserNotFoundError from '../../error/UserNotFoundError'

export default async function getUserData(member: GuildMember) {
  const res = (await query(`select * from user_data where userid = "${member.id}"`)) as userData[]
  if (res.length === 0) throw new UserNotFoundError()

  return res[0]
}
