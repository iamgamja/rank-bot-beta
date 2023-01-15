import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import get도박쿨타임 from '../get/get도박쿨타임'

export default async function can도박쿨타임(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const cooltime = +(await get도박쿨타임(member))
  return cooltime < Date.now()
}
