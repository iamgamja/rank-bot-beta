import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './get/getUserData'
import isUser from './check/isUser'
import { userData } from '../type/userData'

export async function calculate누적레벨ByUserData(userData: userData) {
  let tear = userData.tear
  let level = userData.level

  while (tear) {
    tear -= 1
    level += (tear + 1) * 5
  }

  return level
}

export async function calculate누적레벨ByUser(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)
  return await calculate누적레벨ByUserData(userData)
}
