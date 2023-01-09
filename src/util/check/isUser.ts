import { GuildMember } from 'discord.js'
import { getDbData } from '../db/getDb'

export default async function isUser(member: GuildMember) {
  const data = await getDbData('유저 정보')
  return member.id in data
}
