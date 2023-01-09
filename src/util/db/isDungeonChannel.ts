import { TextChannel } from 'discord.js'
import { getDbData } from './getDb'

export default async function isDungeonChannel(channel: TextChannel) {
  const data = await getDbData('던전 쿨타임')
  return channel.id in data
  /** @todo 던전 쿨타임 데이터가 추가되면, 그 데이터에서도 체크하기 */
}
