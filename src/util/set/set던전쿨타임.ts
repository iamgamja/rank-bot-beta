import { GuildMember, TextChannel } from 'discord.js'
import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError'
import UserNotFoundError from '../../error/UserNotFoundError'
import isDungeonChannel from '../check/isDungeonChannel'
import isUser from '../check/isUser'
import query from '../query'

export default async function set던전쿨타임(member: GuildMember, channel: TextChannel, newcooltime: string) {
  if (!(await isUser(member))) throw new UserNotFoundError()
  if (!isDungeonChannel(channel)) throw new ChannelIsNotDungeonChannelError()

  await query(`
    insert into dungeon_cooltime values ("${channel.id}", "${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `)
}
