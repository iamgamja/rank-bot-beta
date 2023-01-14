import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import isUser from '../check/isUser'
import get출첵쿨타임 from '../get/get출첵쿨타임'

export default async function can출첵쿨타임(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const cooltime = +(await get출첵쿨타임(member))
  return cooltime < Date.now()
}
