import { GuildMember, TextChannel } from 'discord.js'
import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError'
import UserNotFoundError from '../../error/UserNotFoundError'
import isDungeonChannel from '../check/isDungeonChannel'
import isUser from '../check/isUser'
import query from '../query'

export default async function get던전쿨타임(member: GuildMember, channel: TextChannel) {
  if (!(await isUser(member))) throw new UserNotFoundError()
  if (!isDungeonChannel(channel)) throw new ChannelIsNotDungeonChannelError()

  const res = (await query(`select * from dungeon_cooltime where channelid="${channel.id}" and userid="${member.id}"`)) as unknown as string[]

  if (res.length === 0) return '0'

  const cooltime = res[0]
  return cooltime
}
