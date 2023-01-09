import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './db/getUserData'
import isUser from './db/isUser'

export default async function get누적레벨(member: GuildMember) {
  if (!isUser(member)) throw new UserNotFoundError()

  const userData = await getUserData(member)
  let tear = userData.티어
  let level = userData.레벨
  while (tear) {
    tear -= 1
    level += (tear + 1) * 5
  }

  return level
}
