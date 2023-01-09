import DbChannelNotFoundError from '../../error/DbChannelNotFoundError'
import DbChannelIsNotTextChannelError from '../../error/DbChannelIsNotTextChannelError'
import { ChannelType, Snowflake } from 'discord.js'
import { bot } from '../../main'
import { 던전쿨타임db, 도박쿨타임db, 유저정보db, 출첵쿨타임db } from '../../type/db'

type dbName = '유저 정보' | '출첵 쿨타임' | '던전 쿨타임' | '도박 쿨타임'

const messageId: { [name in dbName]: Snowflake } = {
  '유저 정보': '1025653282254880829',
  '출첵 쿨타임': '1030671119797207040',
  '던전 쿨타임': '1028912965786796144',
  '도박 쿨타임': '1036179914367447041',
}

type dbData<name extends dbName> = name extends '유저 정보' ? 유저정보db : name extends '출첵 쿨타임' ? 출첵쿨타임db : name extends '던전 쿨타임' ? 던전쿨타임db : 도박쿨타임db

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
