import { GuildMember, TextChannel } from 'discord.js'
import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError'
import UserNotFoundError from '../../error/UserNotFoundError'
import isDungeonChannel from '../check/isDungeonChannel'
import isUser from '../check/isUser'
import get던전쿨타임 from '../get/get던전쿨타임'

export default async function can던전쿨타임(member: GuildMember, channel: TextChannel) {
  if (!(await isUser(member))) throw new UserNotFoundError()
  if (!isDungeonChannel(channel)) throw new ChannelIsNotDungeonChannelError()

  const cooltime = +(await get던전쿨타임(member, channel))
  return cooltime < Date.now()
}
