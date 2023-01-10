import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import { getDbData } from './db/getDb'
import isUser from './check/isUser'

export default async function getUserData(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const data = await getDbData('유저 정보')
  const userData = data[member.id]
  return userData
}
