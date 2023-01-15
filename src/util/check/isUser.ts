import { GuildMember } from 'discord.js'
import { userData } from '../../type/userData'
import query from '../query'

export default async function isUser(member: GuildMember) {
  const res = (await query(`select * from user_data where userid = "${member.id}"`)) as userData[]
  return res.length !== 0
}
