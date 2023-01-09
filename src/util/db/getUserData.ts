import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import { getDbData } from './getDb'
import isUser from './isUser'

export default async function getUserData(member: GuildMember) {
  if (!isUser(member)) throw new UserNotFoundError()

  const data = await getDbData('유저 정보')
  const userData = data[member.id]
  return userData
}
