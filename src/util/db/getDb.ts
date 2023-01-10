import DbChannelNotFoundError from '../../error/DbChannelNotFoundError'
import DbChannelIsNotTextChannelError from '../../error/DbChannelIsNotTextChannelError'
import { ChannelType } from 'discord.js'
import { bot } from '../../main'
import { dbData } from '../../type/dbData'
import { dbName } from '../../type/dbName'
import { messageId } from '../../data/messageId'

export async function getDbMessage(name: dbName) {
  const dbChannel = bot.channels.cache.get('1025653116441464842')
  if (!dbChannel) throw new DbChannelNotFoundError()
  if (dbChannel.type !== ChannelType.GuildText) throw DbChannelIsNotTextChannelError

  const msg = await dbChannel.messages.fetch(messageId[name])
  return msg
}

export async function getDbData<name extends dbName>(name: name) {
  const msg = await getDbMessage(name)
  return <dbData<name>>JSON.parse(msg.content)
}
