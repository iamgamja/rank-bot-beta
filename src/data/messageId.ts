import { Snowflake } from 'discord.js'
import { dbName } from '../type/dbName'

export const messageId: {
  [name in dbName]: Snowflake
} = {
  '유저 정보': '1025653282254880829',
  '출첵 쿨타임': '1030671119797207040',
  '던전 쿨타임': '1028912965786796144',
  '도박 쿨타임': '1036179914367447041',
}
