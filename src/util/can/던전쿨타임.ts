import { GuildMember, TextChannel } from 'discord.js'
import ChannelIsNotDungeonChannel from '../../error/ChannelIsNotDungeonChannel'
import UserNotFoundError from '../../error/UserNotFoundError'
import { getDbData } from '../db/getDb'
import isDungeonChannel from '../db/isDungeonChannel'
import isUser from '../db/isUser'

export default async function can던전쿨타임(member: GuildMember, channel: TextChannel) {
  if (!(await isUser(member))) throw new UserNotFoundError()
  if (!(await isDungeonChannel(channel))) throw new ChannelIsNotDungeonChannel()

  const data = await getDbData('던전 쿨타임')
  const chanelsData = data[channel.id] // 존재함이 보장된다

  if (!(member.id in chanelsData)) return true

  const canTime = chanelsData[member.id] // 존재함이 보장된다

  return canTime <= new Date().getTime() // 시간이 지났을 때 true

  // if (result.can공격) {
  //   // db 수정
  //   this.coolTimeData[channelID][this.member.user.id] = new Date().getTime() + Data_CoolTime[channelID] * 1000
  //   await this.coolTimeDB.edit(JSON.stringify(this.coolTimeData))
  // }
}
